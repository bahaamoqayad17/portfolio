"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      toast({
        title: "Message sent.",
        description:
          "I will respond within 24 hours. If it is urgent, DM me on LinkedIn.",
      });

      setFormData({ name: "", email: "", message: "" });
      formRef.current?.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error
            ? error.message
            : "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tell me about your product</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {[
          {
            id: "name",
            label: "Your name",
            type: "text",
            placeholder: "Your name",
          },
          {
            id: "email",
            label: "Your email",
            type: "email",
            placeholder: "you@example.com",
          },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            <motion.div
              animate={{
                scale: focusedField === field.id ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                required
                className="h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </motion.div>
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            What are you building? Or what problem are you trying to solve?
          </label>
          <motion.div
            animate={{
              scale: focusedField === "message" ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project, challenge, or idea..."
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
              rows={6}
              className="resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Send className="ml-2 h-4 w-4" />
              </motion.div>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
