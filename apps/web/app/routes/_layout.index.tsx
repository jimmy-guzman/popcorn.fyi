import { createFileRoute } from "@tanstack/react-router";

function Home() {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] place-content-center">
      <div className="dsy-hero">
        <div className="dsy-hero-content flex-col gap-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-3xl md:text-5xl">
            <span className="icon-[simple-icons--typescript]" />
            <span className="icon-[simple-icons--react]" />
            <span className="icon-[simple-icons--vite]" />
            <span className="icon-[simple-icons--tailwindcss]" />
            <span className="icon-[simple-icons--daisyui]" />
            <span className="icon-[simple-icons--drizzle]" />
            <span className="icon-[simple-icons--turso]" />
            <span className="icon-[simple-icons--clerk]" />
          </div>
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-7xl">
              <span className="font-bold">🍿 popcorn.fyi</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-3xl md:text-5xl">
            <span className="icon-[devicon-plain--playwright]" />
            <span className="icon-[simple-icons--vitest]" />
            <span className="icon-[simple-icons--testinglibrary]" />
            <span className="icon-[simple-icons--eslint]" />
            <span className="icon-[simple-icons--prettier]" />
            <span className="icon-[simple-icons--lefthook]" />
            <span className="icon-[simple-icons--githubactions]" />
            <span className="icon-[simple-icons--vercel]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_layout/")({
  component: Home,
});
