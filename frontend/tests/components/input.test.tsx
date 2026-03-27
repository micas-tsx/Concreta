/// <reference types="vitest" />
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("deve renderizar input", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("deve renderizar com placeholder", () => {
    render(<Input placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument();
  });

  it("deve renderizar com type", () => {
    render(<Input type="email" placeholder="email@example.com" />);
    expect(screen.getByPlaceholderText("email@example.com")).toBeInTheDocument();
  });

  it("deve ser desabilitado quando disabled", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("deve aceitar className", () => {
    const { container } = render(<Input className="custom-class" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve aceitar value e onChange", () => {
    const handleChange = vi.fn();
    render(<Input value="texto" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("texto");
  });
});
