import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("contactMessages", {
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
      status: "pending",
      createdAt: Date.now(),
    });
    console.log("Contact message saved:", messageId);
    return messageId;
  },
});
export const getContactMessages = query({
  args: {},
  handler: async (_ctx) => {
    throw new Error("Unauthorized access");
  },
});
