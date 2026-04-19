import type { ErrorComponentProps } from "@tanstack/react-router";

import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

function safeErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "status" in error) {
    const { status } = error as { status?: number };

    if (status === 404) return "Not found";

    if (typeof status === "number" && status >= 500) {
      return "Something went wrong";
    }
  }

  return "Something went wrong";
}

export const Error = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  useEffect(() => {
    // Full error for debugging; UI shows only `safeErrorMessage(error)`.
    // eslint-disable-next-line no-console -- intentional error logging
    console.error(error);
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
