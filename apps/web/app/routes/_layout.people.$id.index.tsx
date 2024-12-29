import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CastCreditsTable } from "@/components/cast-credits-table";
import { CrewCreditsTable } from "@/components/crew-credits-table";
import { personCreditsOptions } from "@/lib/people";

export const Route = createFileRoute("/_layout/people/$id/")({
  component: RouteComponent,

  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(personCreditsOptions(params.id));
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: credits } = useSuspenseQuery(personCreditsOptions(params.id));

  return (
    <div className="flex w-full flex-col gap-4 p-4 md:p-0">
      <div className="prose dsy-prose">
        <h2 id="credits">Credits</h2>
      </div>
      <div className="prose dsy-prose">
        <h3 id="acting">Cast</h3>
      </div>
      <CastCreditsTable credits={credits?.cast ?? []} />
      <div className="prose dsy-prose">
        <h3 id="acting">Crew</h3>
      </div>
      <CrewCreditsTable credits={credits?.crew ?? []} />
    </div>
  );
}
