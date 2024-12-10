import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

const latestMovieFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/movie/latest");

  return data?.original_title;
});

function Home() {
  const getTime = useServerFn(latestMovieFn);

  const { data } = useQuery({
    queryFn: () => {
      return getTime();
    },
    queryKey: ["movie/latest"],
  });

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
            <p>
              <strong>{data}</strong> is the latest movie.
            </p>
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
