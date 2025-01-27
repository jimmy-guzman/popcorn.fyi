import type { ErrorComponentProps } from "@tanstack/react-router";

import { SignIn } from "@clerk/tanstack-start";
import { Button } from "@popcorn.fyi/ui/button";
import { useRouter } from "@tanstack/react-router";

export const Error = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  if (error.message === "Not authenticated") {
    return (
      <div className="flex h-[calc(100vh-68px)] items-center justify-center">
        <SignIn forceRedirectUrl={globalThis.location.href} routing="hash" />
      </div>
    );
  }

  return (
    <main className="grid min-h-screen place-content-center">
      <div className="dsy-hero">
        <div className="dsy-hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold lg:text-7xl xl:text-9xl">
              Error
            </h1>
            <p className="text-error mb-5">{error.message}</p>
            <Button
              onClick={() => {
                router.history.back();
              }}
              variant="outline"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
