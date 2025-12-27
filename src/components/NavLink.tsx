"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<typeof Link> {
  activeClassName?: string;
}

export function NavLink({ className, activeClassName, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href.toString();

  return (
    <Link
      className={cn(className, isActive && activeClassName)}
      {...props}
    />
  );
}
