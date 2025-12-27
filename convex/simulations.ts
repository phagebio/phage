import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
export const createSimulation = mutation({
  args: {
    name: v.string(),
    parameters: v.object({
      temperature: v.number(),
      duration: v.number(),
      timestep: v.number(),
      ensemble: v.string(),
    }),
    equilibration: v.optional(
      v.object({
        enabled: v.boolean(),
        time: v.optional(v.number()),
        temperature: v.optional(v.number()),
        pressure: v.optional(v.number()),
        timestep: v.optional(v.number()),
      })
    ),
    pdbFile: v.optional(v.string()),
    sdfFile: v.optional(v.string()),
    creditsUsed: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized - please sign in");
    }
    const userId = identity.subject as Id<"users">;
    if (!args.name || args.name.length > 255) {
      throw new Error("Invalid simulation name");
    }
    if (args.creditsUsed <= 0 || !Number.isFinite(args.creditsUsed)) {
      throw new Error("Invalid credits amount");
    }
    const { temperature, duration, timestep, ensemble } = args.parameters;
    if (temperature < 0 || temperature > 10_000) {
      throw new Error("Temperature out of valid range (0-10000)");
    }
    if (duration < 1 || duration > 1_000_000) {
      throw new Error("Duration out of valid range (1-1000000)");
    }
    if (timestep <= 0 || timestep > 10) {
      throw new Error("Timestep out of valid range (0-10)");
    }
    if (!["NPT", "NVT", "NVE"].includes(ensemble)) {
      throw new Error("Invalid ensemble type");
    }
    if (args.pdbFile && args.pdbFile.length > 5 * 1024 * 1024) {
      throw new Error("PDB file too large (max 5MB)");
    }
    if (args.sdfFile && args.sdfFile.length > 5 * 1024 * 1024) {
      throw new Error("SDF file too large (max 5MB)");
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.credits < args.creditsUsed) {
      throw new Error("Insufficient credits");
    }
    await ctx.db.patch(userId, {
      credits: user.credits - args.creditsUsed,
    });
    const simulationId = await ctx.db.insert("simulations", {
      userId,
      name: args.name,
      status: "pending",
      progress: 0,
      parameters: args.parameters,
      equilibration: args.equilibration,
      pdbFile: args.pdbFile,
      sdfFile: args.sdfFile,
      creditsUsed: args.creditsUsed,
      createdAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      userId,
      action: "createSimulation",
      resource: "simulations",
      resourceId: simulationId,
      status: "success",
      timestamp: Date.now(),
      details: { creditsUsed: args.creditsUsed, simulationName: args.name },
    });
    return simulationId;
  },
});
export const getUserSimulations = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized - please sign in");
    }
    const userId = identity.subject as Id<"users">;
    const simulations = await ctx.db
      .query("simulations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return simulations;
  },
});
export const getSimulation = query({
  args: { simulationId: v.id("simulations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized - please sign in");
    }
    const userId = identity.subject as Id<"users">;
    const simulation = await ctx.db.get(args.simulationId);
    if (!simulation) {
      throw new Error("Simulation not found");
    }
    if (simulation.userId !== userId) {
      throw new Error("Unauthorized - you don't own this simulation");
    }
    return simulation;
  },
});
export const updateSimulationStatus = mutation({
  args: {
    simulationId: v.id("simulations"),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("completed"),
      v.literal("failed")
    ),
    progress: v.optional(v.number()),
    results: v.optional(
      v.object({
        energyData: v.array(v.number()),
        trajectoryUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    if (
      args.progress !== undefined &&
      (args.progress < 0 || args.progress > 100)
    ) {
      throw new Error("Progress must be between 0 and 100");
    }
    const simulation = await ctx.db.get(args.simulationId);
    if (!simulation) {
      throw new Error("Simulation not found");
    }
    const updates: any = {
      status: args.status,
    };
    if (args.progress !== undefined) {
      updates.progress = args.progress;
    }
    if (args.results) {
      updates.results = args.results;
    }
    if (args.status === "completed" || args.status === "failed") {
      updates.completedAt = Date.now();
    }
    await ctx.db.patch(args.simulationId, updates);
    await ctx.db.insert("auditLogs", {
      userId: simulation.userId,
      action: "updateSimulationStatus",
      resource: "simulations",
      resourceId: args.simulationId,
      status: "success",
      timestamp: Date.now(),
      details: { newStatus: args.status, progress: args.progress },
    });
  },
});
export const deleteSimulation = mutation({
  args: { simulationId: v.id("simulations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized - please sign in");
    }
    const userId = identity.subject as Id<"users">;
    const simulation = await ctx.db.get(args.simulationId);
    if (!simulation) {
      throw new Error("Simulation not found");
    }
    if (simulation.userId !== userId) {
      throw new Error("Unauthorized - you don't own this simulation");
    }
    await ctx.db.delete(args.simulationId);
    await ctx.db.insert("auditLogs", {
      userId: simulation.userId,
      action: "deleteSimulation",
      resource: "simulations",
      resourceId: args.simulationId,
      status: "success",
      timestamp: Date.now(),
    });
  },
});
