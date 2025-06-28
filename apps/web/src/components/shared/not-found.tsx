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
            <button
              className="dsy-btn dsy-btn-outline"
              onClick={() => {
                router.history.back();
              }}
              type="button"
            >
              Go back
            </button>
          </div>
        </HeroContent>
      </Hero>
    </main>
  );
};
