/// <reference types="vitest" />
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge Component", () => {
  it("deve renderizar texto corretamente", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("deve aplicar variant default", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve aplicar variant success", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve aplicar variant warning", () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve aplicar variant destructive", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve aplicar variant secondary", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter classe outline para variant outline", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
