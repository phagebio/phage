# Convex Backend Structure

This directory contains the Convex backend functions and schema for the Phage application.

## Setup Instructions

1. **Install Convex CLI**
   ```bash
   npm install -g convex
   ```

2. **Initialize Convex Project**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project or connect to an existing one
   - Generate the `_generated` folder with TypeScript types
   - Start the development server

3. **Set Environment Variables**
   Create a `.env.local` file in the project root:
   ```
   VITE_CONVEX_URL=<your-convex-deployment-url>
   ```

4. **Deploy to Production**
   ```bash
   npx convex deploy
   ```

## File Structure

- `schema.ts` - Database schema definitions
- `auth.ts` - Authentication functions (sign up, sign in, user management)
- `simulations.ts` - Simulation CRUD operations
- `contact.ts` - Contact form handling
- `_generated/` - Auto-generated TypeScript types (created after running `npx convex dev`)

## Resend Integration (TODO)

To add email functionality via Resend:

1. Sign up at https://resend.com
2. Create an API key at https://resend.com/api-keys
3. Verify your domain at https://resend.com/domains
4. Add `RESEND_API_KEY` to your Convex environment variables
5. Implement email sending in the contact form mutation

## Security Notes

⚠️ **IMPORTANT**: The current password hashing uses base64 encoding which is NOT SECURE.
Before deploying to production:
- Install a proper password hashing library (bcrypt, argon2, etc.)
- Update the `hashPassword` function in `auth.ts`
- Consider implementing proper session management
- Add rate limiting for auth endpoints
- Implement email verification for new accounts
