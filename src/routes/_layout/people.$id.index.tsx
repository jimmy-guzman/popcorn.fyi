import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { personDetailsOptions } from "@/api/people/details";
import { personCreditsOptions } from "@/api/people/details.credits";
import { MovieCard } from "@/components/movie/movie-card";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import { TVShowCard } from "@/components/tv/tv-show-card";
import { getKnownForHighlights } from "@/lib/tmdb-person";

export const Route = createFileRoute("/_layout/people/$id/")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const [person] = await Promise.all([
      context.queryClient.ensureQueryData(personDetailsOptions(id)),
      context.queryClient.ensureQueryData(personCreditsOptions(id)),
    ]);

    return { department: person.known_for_department };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { department } = Route.useLoaderData();
  const { data: credits } = useSuspenseQuery(personCreditsOptions(id));
  const knownForHighlights = getKnownForHighlights(credits, department);

  return (
    <div className="grid grid-cols-1 gap-8">
      <Prose>
        <h2 id="known-for">Known For</h2>
      </Prose>

      <ListContent>
        {knownForHighlights.map((result) => {
          if (result.media_type === "movie") {
            return <MovieCard key={result.id} movie={result} />;
          }

          return <TVShowCard key={result.id} tvShow={result} />;
        })}
      </ListContent>
    </div>
  );
}
