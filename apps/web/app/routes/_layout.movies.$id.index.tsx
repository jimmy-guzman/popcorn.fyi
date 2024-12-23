import { currency, date, time } from "@popcorn.fyi/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaOverviewList } from "@/components/media-overview-list";
import { movieDetailsOptions } from "@/lib/movies";

export const Route = createFileRoute("/_layout/movies/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: movie } = useSuspenseQuery(
    movieDetailsOptions(Number.parseInt(id)),
  );

  const overview = [
    {
      title: "Release Date",
      value: movie.release_date ? date(movie.release_date) : "N/A",
    },
    {
      title: "Status",
      value: movie.status,
    },
    {
      title: "Original Title",
      value: movie.original_title,
    },
    {
      title: "Runtime",
      value: time(movie.runtime * 60 * 1000),
    },
    {
      title: "Budget",
      value: currency(movie.budget),
    },
    {
      title: "Revenue",
      value: currency(movie.revenue),
    },
    {
      title: "Language",
      value: movie.original_language,
    },

    {
      title: "Production Companies",
      value: movie.production_companies
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
