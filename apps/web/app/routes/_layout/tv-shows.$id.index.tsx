import { date } from "@popcorn.fyi/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { MediaOverviewList } from "@/components/media-overview-list";
import { Prose } from "@/components/prose";
import { tvDetailsOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: tvShow } = useSuspenseQuery(
    tvDetailsOptions(Number.parseInt(id)),
  );

  const overview = [
    {
      title: "Created By",
      value: tvShow.created_by?.length
        ? tvShow.created_by.map((creator, index, array) => {
            return (
              <Fragment key={creator.id}>
                <Link
                  className="dsy-link"
                  params={{ id: creator.id.toString() }}
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
        ?.map((productionCompany) => {
          return productionCompany.name;
        })
        .join(", "),
    },
    {
      title: "Production Countries",
      value: tvShow.production_countries
        ?.map((country) => {
          return country.name;
        })
        .join(", "),
    },
    {
      title: "Networks",
      value: tvShow.networks
        ?.map((network) => {
          return network.name;
        })
        .join(", "),
    },
  ];

  return (
    <section>
      <Prose>
        <h2 id="overview">Overview</h2>
      </Prose>
      <MediaOverviewList items={overview} />
    </section>
  );
}
