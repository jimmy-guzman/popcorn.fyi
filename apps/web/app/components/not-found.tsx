import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent, HeroTitle } from "@popcorn.fyi/ui/hero";
import { useRouter } from "@tanstack/react-router";

export const NotFound = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-content-center">
      <Hero>
        <HeroContent className="text-neutral-content text-center">
          <div className="flex flex-col items-center gap-5">
            <HeroTitle>Error</HeroTitle>
            <p className="text-error">Not Found</p>
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
