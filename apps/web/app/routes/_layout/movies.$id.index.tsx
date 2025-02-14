import { currency, date, time } from "@popcorn.fyi/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { movieDetailsOptions } from "@/api/movie/details";
import { MediaOverviewList } from "@/components/media/media-overview-list";
import { Prose } from "@/components/shared/prose";

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
    {
      title: "Production Countries",
      value: movie.production_countries
        ?.map((country) => {
          return country.name;
        })
        .join(", "),
    },
  ];

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2 id="overview">Overview</h2>
      </Prose>
      <MediaOverviewList items={overview} />
    </section>
  );
}
