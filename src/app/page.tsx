"use client";

import { ArrowRight, Atom, CheckCircle2, FlaskConical, Play, Shield, Sparkles, Timer, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { value: "10k+", label: "Simulations Run", icon: <Sparkles className="h-5 w-5" /> },
    { value: "99.9%", label: "Uptime", icon: <Shield className="h-5 w-5" /> },
    { value: "50x", label: "Faster Results", icon: <Zap className="h-5 w-5" /> },
    { value: "24/7", label: "Expert Support", icon: <Users className="h-5 w-5" /> },
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Flash Speed",
      description: "Leverage our distributed GPU cloud to run simulations in minutes, not days.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Your data is encrypted end-to-end with industry-standard protocols.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: "High Accuracy",
      description: "Validated force fields and algorithms ensure publication-quality results.",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const visualizations = [
    "Interactive 3D viewer with multiple rendering modes",
    "Automatic trajectory analysis and plotting",
    "One-click export for publication figures",
    "Seamless collaboration with team members",
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32"
      >
        {/* Animated background elements - subtle */}
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.12), transparent 40%)`,
          }}
        />

        {/* Floating orbs - subtle */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float opacity-30 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-300 opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse opacity-20 pointer-events-none" />

        <div className="container relative mx-auto px-4 text-center">
          {/* Badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 font-medium text-primary text-sm backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Next Generation Molecular Dynamics
            <Sparkles className="h-4 w-4 text-primary/70" />
          </div>

          {/* Main heading */}
          <h1
            className={`mb-8 font-bold text-5xl leading-tight tracking-tight md:text-7xl lg:text-8xl transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Simulate Molecules{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                At Scale
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path
                  d="M2 10C50 4 100 2 150 6C200 10 250 4 298 2"
                  stroke="url(#underline-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-fade-in delay-500"
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mx-auto mb-12 max-w-2xl text-muted-foreground text-xl md:text-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Run complex molecular simulations in the cloud with unprecedented speed and accuracy.
            <span className="text-foreground font-medium"> No expensive hardware required.</span>
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <NavLink href="/auth">
              <Button
                size="lg"
                className="group h-14 w-full min-w-[200px] bg-gradient-primary text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </NavLink>
            <NavLink href="/features">
              <Button
                size="lg"
                variant="outline"
                className="group h-14 w-full min-w-[200px] text-lg font-semibold border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 sm:w-auto"
              >
                <div className="relative">
                  <Play className="mr-2 h-5 w-5 fill-current transition-transform group-hover:scale-110" />
                </div>
                Watch Demo
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Decorative 3D molecule */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 pointer-events-none hidden xl:block">
          <div className="relative w-full h-full animate-spin-slow">
            <Atom className="w-full h-full text-primary" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-border/40 bg-muted/30 py-16 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group relative text-center p-6 rounded-2xl transition-all duration-500 hover:bg-card/50 hover:shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-3 mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                    {stat.icon}
                  </div>
                  <h3 className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container relative mx-auto px-4">
          <div className="mb-20 text-center">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium animate-fade-in">
              Why Choose Us
            </span>
            <h2 className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl animate-fade-in delay-100">
              Why Choose <span className="text-gradient">Phage</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl animate-fade-in delay-200">
              Built for researchers, by researchers. We understand what you need to accelerate your drug discovery pipeline.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group interactive-card rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 lg:p-10"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  {feature.icon}
                </div>
                <h3 className="mb-4 font-bold text-2xl group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-10 animate-fade-in-left">
              <div>
                <span className="inline-block mb-4 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  Visualization
                </span>
                <h2 className="font-bold text-4xl leading-tight md:text-5xl lg:text-6xl">
                  Visualize Your Molecules in{" "}
                  <span className="text-gradient-secondary">Real-Time</span>
                </h2>
              </div>

              <div className="space-y-5">
                {visualizations.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-secondary/5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <NavLink href="/features">
                <Button
                  size="lg"
                  className="group h-14 bg-gradient-secondary text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Explore Features
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </NavLink>
            </div>

            {/* 3D Viewer Preview */}
            <div className="relative animate-fade-in-right">
              <div className="relative aspect-square lg:aspect-[4/3]">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/30 via-secondary/20 to-accent/30 blur-3xl opacity-50 animate-pulse" />

                {/* Main container */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  {/* Header bar */}
                  <div className="absolute left-0 right-0 top-0 h-12 bg-black/20 backdrop-blur-sm flex items-center px-4 gap-2">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
                      <div className="h-3 w-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
                    </div>
                    <div className="flex-1 text-center text-xs text-white/50 font-mono">
                      Protein Structure Viewer
                    </div>
                  </div>

                  {/* Molecule visualization */}
                  <div className="absolute inset-0 flex items-center justify-center pt-8">
                    <div className="relative">
                      {/* Outer ring animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border border-secondary/30 animate-counter-rotate" />
                      </div>

                      {/* Molecule icon */}
                      <Atom className="h-24 w-24 md:h-32 md:w-32 text-primary animate-float" />

                      {/* Particles */}
                      <div className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-secondary animate-bounce-slow" />
                      <div className="absolute -bottom-2 -left-6 w-2 h-2 rounded-full bg-primary animate-bounce-slow delay-200" />
                      <div className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-accent animate-bounce-slow delay-400" />
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 backdrop-blur-sm px-4 py-3 text-xs font-mono text-green-400 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <Timer className="h-3 w-3" />
                      <span>EST: 2m 15s</span>
                    </div>
                  </div>

                  {/* Side panel hint */}
                  <div className="absolute left-4 bottom-4 rounded-lg bg-black/40 backdrop-blur-sm px-3 py-2 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                        <FlaskConical className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-white/90">4 Ligands</div>
                        <div className="text-white/50">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-pulse" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl animate-fade-in">
              Ready to Accelerate Your{" "}
              <span className="text-gradient">Research</span>?
            </h2>
            <p className="text-muted-foreground text-xl animate-fade-in delay-100">
              Join thousands of researchers using Phage to power their discoveries.
              Start with 5 free credits today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
              <NavLink href="/auth">
                <Button
                  size="lg"
                  className="group h-14 px-10 bg-gradient-primary text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </NavLink>
              <NavLink href="/contact">
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-14 px-8 text-lg font-medium hover:bg-primary/5"
                >
                  Talk to Sales
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
