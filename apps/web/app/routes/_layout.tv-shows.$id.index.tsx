import { date } from "@popcorn.fyi/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { MediaOverviewList } from "@/components/media-overview-list";
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
              <>
                <Link
                  className="dsy-link"
                  key={creator.id}
                  params={{ id: creator.id.toString() }}
                  to="/people/$id"
                >
                  {creator.name}
                </Link>
                {array.length - 1 === index ? " " : ", "}
              </>
            );
          })
        : "N/A",
    },
    {
      title: "Status",
      value: tvShow.status,
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
      title: "Networks",
      value: tvShow.networks
        ?.map((network) => {
          return network.name;
        })
        .join(", "),
    },
  ];

  return (
    <section className="mx-auto mt-8 max-w-7xl p-4 md:p-0">
      <div className="prose dsy-prose">
        <h2 id="overview">Overview</h2>
      </div>
      <MediaOverviewList items={overview} />
    </section>
  );
}
