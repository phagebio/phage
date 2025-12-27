"use client";

import { useQuery } from "convex/react";
import { createContext, type ReactNode, useContext } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { authClient } from "./auth-client";

type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  credits: number; // Added credits as it's used in components
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateCredits: (amount: number) => void; // Added for Simulation flow
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // @ts-ignore - api.auth.getCurrentUser might not be typed yet if backend isn't ready
  const betterAuthUser = useQuery(api.auth.getCurrentUser);
  const isLoading = betterAuthUser === undefined;

  // getAuthUser returns the user record directly
  const userRecord = betterAuthUser as any;

  const user: User | null = userRecord
    ? {
      id: userRecord.id ?? userRecord._id,
      email: userRecord.email,
      name: userRecord.name,
      emailVerified: userRecord.emailVerified,
      image: userRecord.image || undefined,
      createdAt: new Date(userRecord.createdAt ?? userRecord._creationTime),
      updatedAt: new Date(userRecord.updatedAt ?? userRecord._creationTime),
      credits: userRecord.credits ?? 0,
    }
    : null;

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      if (result.error) {
        throw new Error(result.error.message || "Sign in failed");
      }
      toast.success("Welcome back!", {
        description: `Signed in as ${email}`,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Please check your credentials";
      toast.error("Sign in failed", {
        description: message,
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (result.error) {
        throw new Error(result.error.message || "Sign up failed");
      }
      toast.success("Account created!", {
        description: `Welcome ${name}`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please try again";
      toast.error("Sign up failed", {
        description: message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out", {
        description: "You have been successfully signed out",
      });
    } catch (error) {
      toast.error("Sign out failed", {
        description: "Please try again",
      });
      throw error;
    }
  };

  const updateCredits = (amount: number) => {
    // This is a client-side optimsitic update helper or similar?
    // In a real app, this should be handled by subscription to data.
    // Since useQuery updates automatically, we might not need this explicitly 
    // unless we want to trigger something.
    // For now leaving as no-op or placeholder if the components call it.
    console.log("Updating credits", amount);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateCredits
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
