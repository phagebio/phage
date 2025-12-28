import {
  convexClient,
  crossDomainClient,
} from "@convex-dev/better-auth/client/plugins";
import { dodopaymentsClient } from "@dodopayments/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL || "http://localhost:3000",
  plugins: [convexClient(), crossDomainClient(), dodopaymentsClient()],
});
