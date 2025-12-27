import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    credits: v.number(),
    passwordHash: v.string(),
    createdAt: v.number(),
    authId: v.optional(v.string()),
    dodoCustomerId: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_auth_id", ["authId"]),
  simulations: defineTable({
    userId: v.id("users"),
    name: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("completed"),
      v.literal("failed")
    ),
    progress: v.number(),
    pdbFile: v.optional(v.string()),
    sdfFile: v.optional(v.string()),
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
    creditsUsed: v.number(),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
    results: v.optional(
      v.object({
        energyData: v.array(v.number()),
        trajectoryUrl: v.optional(v.string()),
      })
    ),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("failed")
    ),
  }).index("by_status", ["status"]),
  auditLogs: defineTable({
    userId: v.optional(v.id("users")),
    action: v.string(),
    resource: v.string(),
    resourceId: v.optional(v.string()),
    status: v.union(v.literal("success"), v.literal("failure")),
    details: v.optional(v.any()),
    timestamp: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),
  paymentEvents: defineTable({
    eventId: v.string(),
    paymentId: v.optional(v.string()),
    type: v.string(),
    userId: v.optional(v.id("users")),
    credits: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_event_id", ["eventId"])
    .index("by_payment_id", ["paymentId"]),
  paymentTransactions: defineTable({
    userId: v.id("users"),
    paymentId: v.string(),
    credits: v.number(),
    amountInCents: v.number(),
    status: v.string(),
    paymentMethod: v.optional(v.string()),
    transactionId: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_payment_id", ["paymentId"])
    .index("by_status", ["status"]),
  rateLimits: defineTable({
    identifier: v.string(),
    action: v.string(),
    timestamp: v.number(),
  })
    .index("by_identifier_timestamp", ["identifier", "timestamp"])
    .index("by_timestamp", ["timestamp"]),
  securityLogs: defineTable({
    eventType: v.string(),
    userId: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    details: v.optional(v.string()),
    severity: v.union(
      v.literal("info"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("critical")
    ),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_severity", ["severity"])
    .index("by_user", ["userId"]),
});
