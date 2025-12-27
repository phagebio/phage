"use client";

import { Activity, ArrowRight, BarChart3, Cloud, Cpu, Database, Globe, Lock, Share2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Native",
      description: "Run simulations on our scalable cloud infrastructure. No local hardware needed.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "GPU Acceleration",
      description: "Powered by latest NVIDIA H100 GPUs for maximum throughput.",
      gradient: "from-purple-500 to-pink-500",
      delay: 50,
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Automated Parametrization",
      description: "Auto-generate force field parameters for small molecules using GAFF2/OpenFF.",
      gradient: "from-amber-500 to-orange-500",
      delay: 100,
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Watch your simulation progress with live energetic plots and trajectory streaming.",
      gradient: "from-emerald-500 to-teal-500",
      delay: 150,
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analysis",
      description: "Built-in tools for RMSD, RMSF, Hydrogen bonding, and free energy calculations.",
      gradient: "from-rose-500 to-pink-500",
      delay: 200,
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Storage",
      description: "Your data is encrypted at rest and in transit. Compliant with industry standards.",
      gradient: "from-slate-500 to-zinc-500",
      delay: 250,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global CDN",
      description: "Access your data from anywhere in the world with low latency.",
      gradient: "from-indigo-500 to-blue-500",
      delay: 300,
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Collaboration",
      description: "Share projects with your team or collaborators with granular permission controls.",
      gradient: "from-fuchsia-500 to-purple-500",
      delay: 350,
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "API Access",
      description: "Integrate Phage into your automated workflows with our comprehensive REST API.",
      gradient: "from-yellow-500 to-amber-500",
      delay: 400,
    },
  ];

  const highlights = [
    { value: "5x", label: "Faster than local", description: "Average speed improvement" },
    { value: "99.9%", label: "Uptime", description: "Enterprise reliability" },
    { value: "500+", label: "Research papers", description: "Powered by Phage" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float delay-300 opacity-40 pointer-events-none" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span
              className={`inline-block mb-6 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Platform Features
            </span>
            <h1
              className={`mb-8 font-bold text-5xl md:text-6xl lg:text-7xl leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Powerful Features for{" "}
              <span className="relative inline-block">
                <span className="text-gradient-secondary">Modern Research</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path
                    d="M2 10C50 4 100 2 150 6C200 10 250 4 298 2"
                    stroke="url(#feature-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="feature-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--secondary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p
              className={`text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Everything you need to accelerate your computational biology research, all in one platform.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl transition-all duration-500 hover:bg-card/50"
              >
                <h3 className="text-gradient text-5xl font-bold mb-2">{item.value}</h3>
                <p className="font-semibold text-lg mb-1">{item.label}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group interactive-card border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                How It Works
              </span>
              <h2 className="font-bold text-4xl md:text-5xl mb-6">
                Simple <span className="text-gradient">Workflow</span>
              </h2>
              <p className="text-muted-foreground text-xl">
                Get from structure to insights in three simple steps
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Upload Your Structure",
                  description: "Drop your PDB files for proteins and SDF files for ligands. We handle the rest.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  step: "02",
                  title: "Configure Parameters",
                  description: "Choose simulation length, temperature, and other parameters. Use our presets or customize.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  step: "03",
                  title: "Analyze Results",
                  description: "View trajectories, plots, and export publication-ready figures automatically.",
                  gradient: "from-emerald-500 to-teal-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-card/50"
                >
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform group-hover:scale-110`}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-gradient transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl">
              Ready to Get <span className="text-gradient">Started</span>?
            </h2>
            <p className="text-muted-foreground text-xl">
              Join researchers worldwide who trust Phage for their simulations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink href="/auth">
                <Button
                  size="lg"
                  className="group h-14 px-10 bg-gradient-primary text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </NavLink>
              <NavLink href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg font-medium border-2 hover:bg-primary/5"
                >
                  View Pricing
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

export default Features;
