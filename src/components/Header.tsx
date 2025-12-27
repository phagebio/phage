"use client";

import { LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/jobs", label: "Jobs" },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <NavLink className="group flex items-center gap-3" href="/">
            <div className="relative h-12 w-12 transition-all duration-300 group-hover:scale-110">
              <Image
                alt="Phage Logo"
                src="/phagedesign.png"
                fill
                className="object-contain scale-200"
                priority
              />
            </div>
            <span className="text-gradient font-bold text-2xl tracking-tight">
              Phage
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                activeClassName="text-foreground bg-primary/10"
                className="relative px-4 py-2 rounded-lg text-muted-foreground text-sm font-medium transition-all duration-300 hover:text-foreground hover:bg-muted/50"
                href={link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <>
                {/* Credits display */}
                <div className="hidden items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm lg:flex">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground">Credits:</span>
                  <span className="text-gradient font-bold">
                    {user.credits}
                  </span>
                </div>

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="gap-2 rounded-full hover:bg-muted/50 transition-colors"
                      size="sm"
                      variant="ghost"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium text-sm">
                        {user.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                      </div>
                      <span className="hidden font-medium md:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-60 p-2 glass-strong rounded-xl border-border/50"
                  >
                    <DropdownMenuLabel className="p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-muted-foreground text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem asChild>
                      <NavLink
                        className="flex items-center gap-2 cursor-pointer p-3 rounded-lg transition-colors hover:bg-muted/50"
                        href="/jobs"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          📊
                        </div>
                        My Simulations
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        className="flex items-center gap-2 cursor-pointer p-3 rounded-lg transition-colors hover:bg-muted/50"
                        href="/pricing"
                      >
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                          💳
                        </div>
                        Buy Credits
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer p-3 rounded-lg text-destructive transition-colors hover:bg-destructive/10"
                      onClick={signOut}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Start Simulation button */}
                <NavLink href="/simulate" className="hidden sm:block">
                  <Button
                    className="bg-gradient-primary shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:scale-105 font-semibold"
                    size="sm"
                  >
                    Start Simulation
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink href="/auth" className="hidden sm:block">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="font-medium hover:bg-muted/50"
                  >
                    Sign In
                  </Button>
                </NavLink>
                <NavLink href="/auth">
                  <Button
                    className="bg-gradient-primary shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:scale-105 font-semibold"
                    size="sm"
                  >
                    Get Started
                  </Button>
                </NavLink>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <nav
          className={`absolute top-20 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/40 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
            }`}
        >
          <div className="container mx-auto px-4 py-6 space-y-2">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.href}
                activeClassName="text-foreground bg-primary/10"
                className="block px-4 py-3 rounded-xl text-lg font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-muted/50"
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </NavLink>
            ))}

            {user && (
              <>
                <div className="h-px bg-border/50 my-4" />
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.credits} credits</p>
                  </div>
                </div>
                <NavLink
                  className="block px-4 py-3 rounded-xl text-lg font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                  href="/simulate"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Simulation
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
