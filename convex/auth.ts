import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
export const authComponent = createClient<DataModel>(components.betterAuth);
import { dodopayments, checkout, portal, webhooks, usage } from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  const dodoClient = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY || "dummy",
    environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as "live_mode" | "test_mode") || "test_mode",
  });

  return betterAuth({
    logger: {
      disabled: optionsOnly,
    },
    trustedOrigins: ["*"],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 12,
    },
    plugins: [
      crossDomain({ siteUrl: siteUrl as string }),
      //convex(),
      dodopayments({
        client: dodoClient,
        createCustomerOnSignUp: false, // Set to false to avoid failure during dev if keys are missing
        use: [
          checkout({
            products: [], // Products can be defined here
            successUrl: "/dashboard/success",
            authenticatedUsersOnly: true,
          }),
          portal(),
          webhooks({
            webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET || "dummy",
            onPayload: async (payload) => {
              console.log("Received webhook in better-auth:", payload.type);
            },
          }),
          usage(),
        ],
      }),
    ],
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 10,
    },
    user: {
      additionalFields: {
        credits: {
          type: "number",
          defaultValue: 0,
        },
      },
    },
  });
};
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    try {
      return await authComponent.getAuthUser(ctx);
    } catch (_error) {
      return null;
    }
  },
});
export const getAuthUserId = async (
  ctx: GenericCtx<DataModel>
): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity.subject;
};
