import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LayersIcon } from "lucide-react";
import * as v from "valibot";

import { MovieCard } from "@/components/movie/movie-card";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { site } from "@/config/site";
import { collectionOptions } from "@/data/collection";
import { orEmpty } from "@/lib/array";
import { seo } from "@/lib/seo";
import { tmdbImageUrl } from "@/lib/tmdb-images";
import { PathParamsSchema } from "@/schemas/path-params";

export const Route = createFileRoute("/_layout/collections/$id")({
  component: RouteComponent,
  params: {
    parse: (params) => {
      return v.parse(PathParamsSchema, params);
    },
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      collectionOptions(id),
    );

    return {
      seo: {
        description: data.overview,
        image: data.poster_path ? tmdbImageUrl(data.poster_path) : undefined,
        title: data.name
          ? `${data.name} | ${site.title}`
          : `Collection | ${site.title}`,
      },
    };
  },
  head: ({ loaderData }) => {
    return {
      meta: loaderData ? seo(loaderData.seo) : undefined,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: collection } = useSuspenseQuery(collectionOptions(id));
  const parts = orEmpty(collection.parts).toSorted((a, b) => {
    return (a.release_date ?? "").localeCompare(b.release_date ?? "");
  });

  return (
    <div className="flex flex-col gap-8">
      <Prose>
        <h1>{collection.name}</h1>
        {collection.overview ? <p>{collection.overview}</p> : null}
      </Prose>
      {parts.length > 0 ? (
        <ListContent>
          {parts.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </ListContent>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LayersIcon />
            </EmptyMedia>
            <EmptyTitle>No movies yet</EmptyTitle>
            <EmptyDescription>
              TMDB has no movies listed in this collection.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}
