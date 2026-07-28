import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { MediaOverviewList } from "@/components/media/media-overview-list";
import { Prose } from "@/components/shared/prose";
import { movieDetailsOptions } from "@/data/movie/details";
import { orEmpty } from "@/lib/array";
import { currency } from "@/lib/currency";
import { date } from "@/lib/date";
import { hasId } from "@/lib/predicates";
import { time } from "@/lib/time";

export const Route = createFileRoute("/_layout/movies/$id/")({
  component: RouteComponent,
});

const ONE_MINUTE_MS = 60_000;

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieDetailsOptions(id));

  const productionCompanies = orEmpty(movie.production_companies).filter(hasId);

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
      value:
        productionCompanies.length > 0
          ? productionCompanies.map((productionCompany, index, array) => {
              return (
                <Fragment key={productionCompany.id}>
                  <Link
                    className="text-primary underline-offset-4 hover:underline"
                    search={{ with_companies: String(productionCompany.id) }}
                    to="/movies/discover"
                  >
                    {productionCompany.name}
                  </Link>
                  {array.length - 1 === index ? " " : ", "}
                </Fragment>
              );
            })
          : "N/A",
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
        <h2>Overview</h2>
      </Prose>
      <MediaOverviewList items={overview} />
    </section>
  );
}
