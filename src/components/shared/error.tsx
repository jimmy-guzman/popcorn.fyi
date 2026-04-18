import type { ErrorComponentProps } from "@tanstack/react-router";

import { useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Error = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-content-center bg-background">
      <div className="flex w-full flex-col items-center gap-5 px-6 text-center text-foreground">
        <h1 className="text-5xl font-bold text-pretty lg:text-7xl">Error</h1>
        <p className="text-destructive">{error.message}</p>
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
