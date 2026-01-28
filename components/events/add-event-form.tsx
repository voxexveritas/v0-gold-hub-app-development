"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Assuming a textarea component exists

export function AddEventForm() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      if (eventName && eventDate && eventLocation && eventDescription) {
        setMessage("Event submitted for review! Thank you.");
        setEventName("");
        setEventDate("");
        setEventLocation("");
        setEventDescription("");
      } else {
        setMessage("Please fill in all fields.");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground">
          Suggest a New Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-muted-foreground mb-1">
              Event Name
            </label>
            <Input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., Spring Coin Show"
              className="bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-muted-foreground mb-1">
              Date
            </label>
            <Input
              id="eventDate"
              type="text" // Could be type="date" but string for flexibility in mock data
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="e.g., April 15-17, 2026"
              className="bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="eventLocation" className="block text-sm font-medium text-muted-foreground mb-1">
              Location
            </label>
            <Input
              id="eventLocation"
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="e.g., Dallas, TX"n              className="bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="eventDescription" className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <Textarea // Assuming Textarea component exists for larger text input
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Provide a brief description of the event..."
              rows={4}
              className="bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </Button>
          {message && (
            <p className={`text-center text-sm mt-3 ${message.includes("Error") ? "text-destructive" : "text-success"}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}