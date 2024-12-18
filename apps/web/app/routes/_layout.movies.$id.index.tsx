import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MediaOverviewList } from "@/components/media-overview-list";
import { movieDetailsFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/movies/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const getMovieDetails = useServerFn(movieDetailsFn);

  const { data: movie } = useQuery({
    queryFn: () => {
      return getMovieDetails({ data: Number.parseInt(id) });
    },
    queryKey: ["movies", id],
  });

  const overview = [
    {
      title: "Release Date",
      value: movie?.release_date,
    },
    {
      title: "Status",
      value: movie?.status,
    },
    {
      title: "Original Title",
      value: movie?.original_title,
    },
    {
      title: "Runtime",
      value: movie?.runtime,
    },
    {
      title: "Budget",
      value: movie?.budget,
    },
    {
      title: "Revenue",
      value: movie?.revenue,
    },
    {
      title: "Language",
      value: movie?.original_language,
    },

    {
      title: "Production Companies",
      value: movie?.production_companies
        ?.map((productionCompany) => {
          return productionCompany.name;
        })
        .join(", "),
    },
  ];

  return (
    <section className="mx-auto mt-8 max-w-7xl">
      <MediaOverviewList items={overview} />
    </section>
  );
}
