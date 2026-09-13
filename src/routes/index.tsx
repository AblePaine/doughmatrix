import { createFileRoute } from "@tanstack/react-router";
import { Engine } from "@/components/engine/engine";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Engine />;
}
