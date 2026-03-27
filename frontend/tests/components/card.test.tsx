/// <reference types="vitest" />
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

describe("Card Components", () => {
  it("deve renderizar Card com children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("deve renderizar CardHeader", () => {
    render(<CardHeader><p>Header</p></CardHeader>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("deve renderizar CardTitle", () => {
    render(<CardTitle>Título</CardTitle>);
    expect(screen.getByText("Título")).toBeInTheDocument();
  });

  it("deve renderizar CardDescription", () => {
    render(<CardDescription>Descrição</CardDescription>);
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("deve renderizar CardContent", () => {
    render(<CardContent><p>Content</p></CardContent>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("deve renderizar CardFooter", () => {
    render(<CardFooter><p>Footer</p></CardFooter>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("deve renderizar composição completa", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título do Card</CardTitle>
          <CardDescription>Descrição do Card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo principal</p>
        </CardContent>
        <CardFooter>
          <p>Rodapé</p>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText("Título do Card")).toBeInTheDocument();
    expect(screen.getByText("Descrição do Card")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument();
    expect(screen.getByText("Rodapé")).toBeInTheDocument();
  });
});
