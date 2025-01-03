import { selectYoutubeTrailer } from "@popcorn.fyi/tmdb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { movieVideosOptions } from "@/lib/movies";

export const Route = createFileRoute("/_layout/movies/$id/trailer")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      movieVideosOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: trailer } = useSuspenseQuery({
    ...movieVideosOptions(Number.parseInt(id)),
    select: selectYoutubeTrailer,
  });

  return (
    <MediaTrailerDialog
      handleClose={() => {
        void navigate({ to: "/movies/$id" });
      }}
      trailer={trailer}
    />
  );
}
