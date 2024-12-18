import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { TVShowDetails } from "@/components/tv-show-details";
import { tvDetailsFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/tv-shows/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const getTVDetails = useServerFn(tvDetailsFn);

  const { data: tvShow } = useQuery({
    queryFn: () => {
      return getTVDetails({ data: Number.parseInt(id) });
    },
    queryKey: ["tv", id],
  });

  return <div>{tvShow ? <TVShowDetails tvShow={tvShow} /> : null}</div>;
}
