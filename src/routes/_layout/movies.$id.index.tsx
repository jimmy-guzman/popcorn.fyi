import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaOverviewList } from "@/components/media/media-overview-list";
import { Prose } from "@/components/shared/prose";
import { movieDetailsOptions } from "@/data/movie/details";
import { currency } from "@/lib/currency";
import { date } from "@/lib/date";
import { time } from "@/lib/time";

export const Route = createFileRoute("/_layout/movies/$id/")({
  component: RouteComponent,
});

const ONE_MINUTE_MS = 60_000;

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieDetailsOptions(id));

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
      value: movie.runtime ? time(movie.runtime * ONE_MINUTE_MS) : "N/A",
    },
    {
      title: "Budget",
      value: movie.budget ? currency(movie.budget) : "N/A",
    },
    {
      title: "Revenue",
      value: movie.revenue ? currency(movie.revenue) : "N/A",
    },
    {
      title: "Language",
      value: movie.original_language,
    },
    {
      title: "Production Companies",
      value: movie.production_companies
        ?.map((productionCompany) => productionCompany.name)
        .join(", "),
    },
    {
      title: "Production Countries",
      value: movie.production_countries
        ?.map((country) => country.name)
        .join(", "),
    },
  ];

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Overview</h2>
      </Prose>
      <MediaOverviewList items={overview} />
    </section>
  );
}
