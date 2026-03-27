import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-2xl font-bold mb-2">Obra não encontrada</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        A obra que você está procurando não existe ou foi removida. Verifique o
        ID e tente novamente.
      </p>
      <Link href="/">
        <Button>Voltar ao Mapa</Button>
      </Link>
    </main>
  );
}
