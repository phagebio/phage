"use client";

import { Dna, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const footerLinks = {
  platform: [
    { href: "/simulate", label: "Simulate" },
    { href: "/jobs", label: "My Jobs" },
    { href: "/pricing", label: "Pricing" },
    { href: "/features", label: "Features" },
  ],
  company: [
    { href: "/features", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
  socials: [
    {
      href: "https://twitter.com",
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
    },
    {
      href: "https://github.com",
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
    },
    {
      href: "mailto:support@phage.bio",
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand section */}
          <div className="lg:col-span-4 space-y-6">
            <NavLink href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-primary p-2 shadow-lg transition-transform group-hover:scale-110">
                <Dna className="w-full h-full text-white" />
              </div>
              <span className="text-gradient font-bold text-2xl">Phage</span>
            </NavLink>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Accelerating molecular discovery through advanced cloud-based
              simulations and AI-powered analysis.
            </p>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {footerLinks.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-glow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {/* Platform links */}
              <div>
                <h3 className="font-semibold text-lg mb-5">Platform</h3>
                <ul className="space-y-3">
                  {footerLinks.platform.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company links */}
              <div>
                <h3 className="font-semibold text-lg mb-5">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter / Contact */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="font-semibold text-lg mb-5">Stay Updated</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get the latest updates on features and releases.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button className="px-4 py-2.5 rounded-lg bg-gradient-primary text-white text-sm font-medium hover:shadow-glow-sm transition-all duration-300 hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Phage. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <NavLink
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
