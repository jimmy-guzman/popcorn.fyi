import { Button } from "@popcorn.fyi/ui/button";
import { useRouter } from "@tanstack/react-router";

export const NotFound = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-content-center">
      <div className="dsy-hero">
        <div className="dsy-hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold lg:text-7xl xl:text-9xl">
              Error
            </h1>
            <p className="text-error mb-5">Not Found</p>
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
