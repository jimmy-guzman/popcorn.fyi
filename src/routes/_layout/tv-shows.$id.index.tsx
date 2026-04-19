import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { MediaOverviewList } from "@/components/media/media-overview-list";
import { Prose } from "@/components/shared/prose";
import { tvDetailsOptions } from "@/data/tv/details";
import { orEmpty } from "@/lib/array";
import { date } from "@/lib/date";
import { hasId } from "@/lib/predicates";

export const Route = createFileRoute("/_layout/tv-shows/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: tvShow } = useSuspenseQuery(tvDetailsOptions(id));

  const createdBy = orEmpty(tvShow.created_by).filter(hasId);

  const overview = [
    {
      title: "Created By",
      value:
        createdBy.length > 0
          ? createdBy.map((creator, index, array) => {
              return (
                <Fragment key={creator.id}>
                  <Link
                    className="text-primary underline-offset-4 hover:underline"
                    params={{ id: creator.id }}
                    to="/people/$id"
                  >
                    {creator.name}
                  </Link>
                  {array.length - 1 === index ? " " : ", "}
                </Fragment>
              );
            })
          : "N/A",
    },
    {
      title: "Original Name",
      value: tvShow.original_name,
    },
    {
      title: "First Air Date",
      value: tvShow.first_air_date ? date(tvShow.first_air_date) : "N/A",
    },
    {
      title: "Last Air Date",
      value: tvShow.last_air_date ? date(tvShow.last_air_date) : "N/A",
    },
    {
      title: "Seasons",
      value: tvShow.seasons?.length,
    },
    {
      title: "Episodes",
      value: tvShow.number_of_episodes,
    },
    {
      title: "Language",
      value: tvShow.languages?.join(", "),
    },
    {
      title: "Production Companies",
      value: tvShow.production_companies
        ?.map((productionCompany) => productionCompany.name)
        .join(", "),
    },
    {
      title: "Production Countries",
      value: tvShow.production_countries
        ?.map((country) => country.name)
        .join(", "),
    },
    {
      title: "Networks",
      value: tvShow.networks?.map((network) => network.name).join(", "),
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
