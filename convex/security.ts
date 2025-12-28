import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const SECURITY_CONFIG = {
  allowedOrigins: ["*"],
  signatureValidityWindow: 5 * 60 * 1000,
  maxRequestsPerMinute: 60,
  maxRequestsPerHour: 1000,
};
export function validateOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (process.env.NODE_ENV === "development") {
    return origin.includes("localhost") || origin.includes("127.0.0.1");
  }
  return SECURITY_CONFIG.allowedOrigins.some(
    (allowed) => origin === allowed || origin.startsWith(allowed),
  );
}
export function generateNonce(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
}
export function validateTimestamp(timestamp: number): boolean {
  const now = Date.now();
  const diff = Math.abs(now - timestamp);
  return diff < SECURITY_CONFIG.signatureValidityWindow;
}
export function getSecurityHeaders() {
  return {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Content-Security-Policy": [
      "default-src 'self'",
      `connect-src 'self' ${process.env.VITE_CONVEX_URL || ""} https://*.convex.cloud`,
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "frame-ancestors 'none'",
    ].join("; "),
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  };
}
export const checkRateLimit = mutation({
  args: {
    identifier: v.string(),
    action: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneHourAgo = now - 60 * 60 * 1000;
    const recentRequests = await ctx.db
      .query("rateLimits")
      .withIndex("by_identifier_timestamp", (q) =>
        q.eq("identifier", args.identifier).gt("timestamp", oneHourAgo),
      )
      .collect();
    const requestsLastMinute = recentRequests.filter(
      (r) => r.timestamp > oneMinuteAgo,
    ).length;
    const requestsLastHour = recentRequests.length;
    if (requestsLastMinute >= SECURITY_CONFIG.maxRequestsPerMinute) {
      throw new Error("Rate limit exceeded: too many requests per minute");
    }
    if (requestsLastHour >= SECURITY_CONFIG.maxRequestsPerHour) {
      throw new Error("Rate limit exceeded: too many requests per hour");
    }
    await ctx.db.insert("rateLimits", {
      identifier: args.identifier,
      action: args.action,
      timestamp: now,
    });
    return { allowed: true };
  },
});
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
}
/**
 * Email validation regex (defined at module level for performance)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
/**
 * Get client IP from request headers
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0] ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
export const logSecurityEvent = mutation({
  args: {
    eventType: v.string(),
    userId: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    details: v.optional(v.string()),
    severity: v.union(
      v.literal("info"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("critical"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("securityLogs", {
      eventType: args.eventType,
      userId: args.userId,
      ipAddress: args.ipAddress,
      details: args.details,
      severity: args.severity,
      timestamp: Date.now(),
    });
  },
});
export const getSecurityLogs = query({
  args: {
    limit: v.optional(v.number()),
    severity: v.optional(
      v.union(
        v.literal("info"),
        v.literal("warning"),
        v.literal("error"),
        v.literal("critical"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 100;
    let logsQuery = ctx.db.query("securityLogs").order("desc");
    if (args.severity) {
      logsQuery = logsQuery.filter((q) =>
        q.eq(q.field("severity"), args.severity),
      );
    }
    return await logsQuery.take(limit);
  },
});
