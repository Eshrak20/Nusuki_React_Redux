"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Sparkles } from "lucide-react";

interface CourseMajorsProps {
  description: string;
}

const CourseMajors = ({ description }: CourseMajorsProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const majors = [
    "Accounting",
    "Economics",
    "Finance",
    "Marketing",
    "Management",
  ];

  // Typing Effect Logic
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < description.length) {
        setDisplayedText(description.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Speed of typing
    return () => clearInterval(typingInterval);
  }, [description]);

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 shadow-lg dark:shadow-primary/5">
      {/* Decorative Gradient Glow for "AI" feel */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span>Course Majors</span>
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Animated Description */}
        <div className="min-h-[3rem]">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            {displayedText}
            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-primary" />
          </p>
        </div>

        <Separator className="bg-primary/10" />

        {/* Modern Badge Grid */}
        <div className="flex flex-wrap gap-2">
          {majors.map((major, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1 text-xs font-medium transition-all hover:bg-primary hover:text-primary-foreground cursor-default border border-transparent hover:border-primary/20"
            >
              {major}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseMajors;