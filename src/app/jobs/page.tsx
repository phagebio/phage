"use client";

import { useQuery } from "convex/react";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Clock, Terminal } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth";
import { api } from "../../../convex/_generated/api";

const Jobs = () => {
  const { user } = useAuth();

  // Conditionally query only if user exists, otherwise skip
  const jobs = useQuery(api.simulations.getUserSimulations,
    user ? {} : "skip"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "running":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 animate-pulse";
      case "failed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "running":
        return <Clock className="h-4 w-4 animate-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 font-bold text-2xl">Sign In Required</h2>
            <p className="text-muted-foreground">
              Please sign in to view your simulation jobs.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 font-bold text-3xl md:text-4xl">
                Simulation <span className="text-primary">Jobs</span>
              </h1>
              <p className="text-muted-foreground">
                Manage and monitor your molecular dynamics simulations
              </p>
            </div>
            <Button
              onClick={() => window.location.href = '/simulate'}
              className="hidden bg-gradient-primary shadow-glow md:flex"
            >
              New Simulation
            </Button>
          </div>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                A list of your recent simulation jobs and their current status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!jobs ? (
                <div className="flex justify-center p-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Terminal className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mb-2 font-semibold text-lg">No jobs found</h3>
                  <p className="mb-6 max-w-sm text-muted-foreground">
                    You haven't run any simulations yet. Start your first job to see it here.
                  </p>
                  <Button onClick={() => window.location.href = '/simulate'}>Start Simulation</Button>
                </div>
              ) : (
                <div className="rounded-md border border-border/40">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="hidden md:table-cell">Duration</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job: any) => (
                        <TableRow key={job._id}>
                          <TableCell className="font-medium">
                            <div>
                              {job.name}
                              <div className="text-muted-foreground text-xs md:hidden">
                                {format(new Date(job.createdAt), "MMM d, yyyy")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`flex w-fit items-center gap-1 ${getStatusColor(
                                job.status
                              )}`}
                              variant="outline"
                            >
                              {getStatusIcon(job.status)}
                              <span className="capitalize">{job.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="w-[140px]">
                            {job.status === "running" ? (
                              <div className="space-y-1">
                                <Progress className="h-2" value={job.progress || 0} />
                                <p className="text-right text-muted-foreground text-xs">
                                  {job.progress || 0}%
                                </p>
                              </div>
                            ) : job.status === "completed" ? (
                              <Progress className="h-2" value={100} />
                            ) : (
                              <Progress className="h-2" value={0} />
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {job.parameters?.duration}ns
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {format(new Date(job.createdAt), "MMM d, HH:mm")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              {/* MoreHorizontal or Action menu would go here */}
                            </Button>
                            {job.status === "completed" && (
                              <Button
                                className="h-8"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  toast.info("Download started");
                                  // Logic to download
                                }}
                              >
                                Result
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Jobs;
