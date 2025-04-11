import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { moviePlotOptions } from "@/api/movie/details.plot";
import { ExpandedPlot } from "@/components/movie/expanded-plot";
import { ExpandedPlotSkeleton } from "@/components/movie/expanded-plot.skeleton";
import { IdSchema } from "@/schemas/id";

export const Route = createFileRoute("/_layout/movies/$id/plot")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const movieId = v.parse(IdSchema, id);

    await context.queryClient.ensureQueryData(moviePlotOptions(movieId));
  },
  pendingComponent: ExpandedPlotSkeleton,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: summaries } = useSuspenseQuery(
    moviePlotOptions(v.parse(IdSchema, id)),
  );

  return <ExpandedPlot summaries={summaries} />;
}
