"use client";

import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "../../../convex/_generated/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContactForm = useMutation(api.contact.submitContactForm);

  // @ts-ignore - api.emails might not exist yet
  const sendEmail = useAction(api.emails?.sendContactEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Save to database
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: `[${formData.category}] ${formData.subject}`,
        message: formData.message,
      });

      // Send email via Resend
      try {
        if (sendEmail) {
          await sendEmail({
            name: formData.name,
            email: formData.email,
            subject: `[${formData.category}] ${formData.subject}`,
            message: formData.message,
          });
          toast.success("Message sent successfully! We'll get back to you soon.");
        } else {
          // If email API is not ready, just log or skip
          console.warn("Email API not ready, skipped sending email.");
          toast.success("Message saved! We'll respond shortly.");
        }
      } catch (emailError) {
        // Email failed but form was saved
        console.error("Email sending failed:", emailError);
        toast.success("Message saved! We'll respond via email shortly.");
      }

      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickFaqs = [
    {
      question: "How do I upload files?",
      answer:
        "Go to the Simulate page and use the drag-and-drop interface to upload your PDB or SDF files. Files must be under 10MB.",
    },
    {
      question: "What happens if my simulation fails?",
      answer:
        "If a simulation fails due to a system error, your credits are automatically refunded. You can check the status in the Jobs page.",
    },
    {
      question: "Can I cancel a running simulation?",
      answer:
        "Yes, you can cancel a simulation from the Jobs page. Partially used credits may not be refunded depending on the stage of cancellation.",
    },
    {
      question: "How do I purchase more credits?",
      answer:
        "Visit the Pricing page to purchase credit packages or a custom amount. We accept major credit cards.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 animate-fade-in font-bold text-4xl md:text-5xl">
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              Have questions about your simulations? Our team of computational
              biologists is here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">

            {/* Contact Form */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        required
                        value={formData.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        required
                        type="email"
                        value={formData.email}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      value={formData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Credits</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="How can we help?"
                      required
                      value={formData.subject}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      className="min-h-[150px]"
                      id="message"
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us more about your inquiry..."
                      required
                      value={formData.message}
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-primary shadow-glow transition-opacity hover:opacity-90"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQs */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-bold text-2xl">Quick Answers</h2>
                <Accordion className="space-y-4" collapsible type="single">
                  {quickFaqs.map((faq, index) => (
                    <AccordionItem
                      className="rounded-lg border border-border/40 bg-card/30 px-6"
                      key={index}
                      value={`faq-${index}`}
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="rounded-xl border border-border/40 bg-muted/20 p-6">
                <h3 className="mb-2 font-semibold">Office Location</h3>
                <p className="mb-4 text-muted-foreground text-sm">
                  123 Innovation Drive<br />
                  Tech City, TC 94043<br />
                  United States
                </p>
                <h3 className="mb-2 font-semibold">Email</h3>
                <p className="text-muted-foreground text-sm">
                  support@phage.bio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
