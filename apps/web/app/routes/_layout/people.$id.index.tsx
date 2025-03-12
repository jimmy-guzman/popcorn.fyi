import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { personCreditsOptions } from "@/api/people/details.credits";
import { Prose } from "@/components/shared/prose";
import { CastCreditsTable } from "@/components/table/cast-credits-table";
import { CrewCreditsTable } from "@/components/table/crew-credits-table";

export const Route = createFileRoute("/_layout/people/$id/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      personCreditsOptions(Number.parseInt(params.id, 10)),
    );
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: credits } = useSuspenseQuery(
    personCreditsOptions(Number.parseInt(params.id, 10)),
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <Prose>
        <h2 id="credits">Credits</h2>
      </Prose>
      <Prose>
        <h3 id="acting">Cast</h3>
      </Prose>
      {credits.cast?.length ? (
        <CastCreditsTable credits={credits.cast} />
      ) : (
        <Prose>
          <p>No cast credits available.</p>
        </Prose>
      )}
      <Prose>
        <h3 id="acting">Crew</h3>
      </Prose>
      {credits.crew?.length ? (
        <CrewCreditsTable credits={credits.crew} />
      ) : (
        <Prose>
          <p>No crew credits available.</p>
        </Prose>
      )}
    </div>
  );
}
