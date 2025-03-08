import type { ErrorComponentProps } from "@tanstack/react-router";

import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent, HeroTitle } from "@popcorn.fyi/ui/hero";
import { useRouter } from "@tanstack/react-router";

export const Error = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-content-center">
      <Hero>
        <HeroContent className="text-neutral-content text-center">
          <div className="flex flex-col items-center gap-5">
            <HeroTitle>Error</HeroTitle>
            <p className="text-error">{error.message}</p>
            <Button
              onClick={() => {
                router.history.back();
              }}
              variant="outline"
            >
              Go back
            </Button>
          </div>
        </HeroContent>
      </Hero>
    </main>
  );
};
