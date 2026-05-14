"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServeInterestButton({ roleId, roleTitle }: { roleId: string; roleTitle: string }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submit/serve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId, roleTitle }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
        <Check className="h-4 w-4" />
        We&apos;ll be in touch
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onClick} variant="accent" className="w-full" disabled={loading}>
        {loading ? "Sending…" : "I'm interested"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </Button>
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
