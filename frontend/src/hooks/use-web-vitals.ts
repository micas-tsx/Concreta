import { useEffect, useCallback, useRef } from "react";

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

type ReportHandler = (metric: WebVitalsMetric) => void;

export function useWebVitals(onReport?: ReportHandler) {
  const metricsRef = useRef<WebVitalsMetric[]>([]);
  const reportHandlerRef = useRef(onReport);

  useEffect(() => {
    reportHandlerRef.current = onReport;
  }, [onReport]);

  const report = useCallback((metric: WebVitalsMetric) => {
    metricsRef.current.push(metric);
    if (reportHandlerRef.current) {
      reportHandlerRef.current(metric);
    }
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }, []);

  useEffect(() => {
    const getNavigationEntry = () => {
      const navEntries = performance.getEntriesByType("navigation");
      return navEntries.length > 0 ? navEntries[0] as PerformanceNavigationTiming : null;
    };

    const getLCP = () => {
      return new Promise<void>((resolve) => {
        const entries = performance.getEntriesByType("largest-contentful-paint");
        if (entries.length > 0) {
          const lcp = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
          const navEntry = getNavigationEntry();
          const ttfb = navEntry?.responseStart || 0;
          report({
            name: "LCP",
            value: lcp.startTime,
            rating: lcp.startTime < 2500 ? "good" : lcp.startTime < 4000 ? "needs-improvement" : "poor",
            delta: lcp.startTime - ttfb,
            id: "lcp",
            entries: [lcp],
          });
        }
        resolve();
      });
    };

    const getFID = () => {
      const entries = performance.getEntriesByType("first-input");
      if (entries.length > 0) {
        const fid = entries[0] as PerformanceEntry & { processingStart: number; startTime: number };
        report({
          name: "FID",
          value: fid.processingStart - fid.startTime,
          rating: fid.processingStart - fid.startTime < 100 ? "good" : "needs-improvement",
          delta: fid.processingStart - fid.startTime,
          id: "fid",
          entries: [fid],
        });
      }
    };

    const getCLS = () => {
      let clsValue = 0;
      const clsEntries: PerformanceEntry[] = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i] as PerformanceEntry & { hadRecentInput?: boolean; value: number };
          if (entry.hadRecentInput === false || entry.hadRecentInput === undefined) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        }
      });

        observer.observe({ type: "layout-shift", buffered: true });

      setTimeout(() => {
        observer.disconnect();
        report({
          name: "CLS",
          value: clsValue,
          rating: clsValue < 0.1 ? "good" : clsValue < 0.25 ? "needs-improvement" : "poor",
          delta: clsValue,
          id: "cls",
          entries: clsEntries,
        });
      }, 1000);
    };

    getLCP();
    getFID();
    getCLS();

    const navEntry = getNavigationEntry();
    if (navEntry) {
      const ttfb = navEntry.responseStart || 0;
      report({
        name: "TTFB",
        value: ttfb,
        rating: ttfb < 800 ? "good" : ttfb < 1800 ? "needs-improvement" : "poor",
        delta: ttfb,
        id: "ttfb",
        entries: [navEntry],
      });
    }

    const handleLoad = () => {
      const paintEntries = performance.getEntriesByType("paint");
      const fcp = paintEntries.find((e) => e.name === "first-contentful-paint");
      if (fcp) {
        report({
          name: "FCP",
          value: fcp.startTime,
          rating: fcp.startTime < 1800 ? "good" : fcp.startTime < 3000 ? "needs-improvement" : "poor",
          delta: fcp.startTime,
          id: "fcp",
          entries: [fcp],
        });
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [report]);

  return {
    metrics: metricsRef.current,
  };
}

export function useReportWebVitals(onReport?: ReportHandler) {
  useWebVitals(onReport);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
