import type { ErrorComponentProps } from "@tanstack/react-router";

import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

function isErrorWithStatus(e: unknown): e is { status?: unknown } {
  return e !== null && typeof e === "object" && "status" in e;
}

function safeErrorMessage(error: unknown) {
  if (!isErrorWithStatus(error)) return "Something went wrong";

  if (typeof error.status === "number") {
    if (error.status === 404) return "Not found";

    if (error.status >= 500) return "Something went wrong";
  }

  return "Something went wrong";
}

export const Error = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof globalThis.reportError === "function") {
      globalThis.reportError(error);
    }
  }, [error]);

  return (
    <main className="grid min-h-screen place-content-center bg-background">
      <div className="flex w-full flex-col items-center gap-5 px-6 text-center text-foreground">
        <h1 className="text-5xl font-bold text-pretty lg:text-7xl">Error</h1>
        <p className="text-destructive">{safeErrorMessage(error)}</p>
        <Button
          onClick={() => {
            router.history.back();
          }}
          type="button"
          variant="outline"
        >
          Go back
        </Button>
      </div>
    </main>
  );
};
