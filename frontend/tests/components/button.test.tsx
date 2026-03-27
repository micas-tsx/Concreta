/// <reference types="vitest" />
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("deve renderizar children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("deve ser desabilitado quando disabled=true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("deve renderizar com variant outline", () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve renderizar com variant default", () => {
    const { container } = render(<Button variant="default">Default</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve renderizar com variant secondary", () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve renderizar com variant ghost", () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve renderizar com variant destructive", () => {
    const { container } = render(<Button variant="destructive">Destructive</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve renderizar com variant link", () => {
    const { container } = render(<Button variant="link">Link</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve chamar onClick quando clicado", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar com diferentes sizes", () => {
    const sizes = ["default", "sm", "lg", "icon"] as const;
    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>Size {size}</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
