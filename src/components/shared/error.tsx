import type { ErrorComponentProps } from "@tanstack/react-router";

import { useRouter } from "@tanstack/react-router";

export const Error = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-content-center">
      <div className="dsy-hero w-full">
        <div className="dsy-hero-content text-neutral-content text-center">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
              Error
            </h1>
            <p className="text-error">{error.message}</p>
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
        </div>
      </div>
    </main>
  );
};
