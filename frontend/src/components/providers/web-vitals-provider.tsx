"use client";

import { useWebVitals } from "@/hooks/use-web-vitals";

export function WebVitalsProvider() {
  useWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Web Vitals]", metric.name, metric.value, metric.rating);
    }
  });

  return null;
}
