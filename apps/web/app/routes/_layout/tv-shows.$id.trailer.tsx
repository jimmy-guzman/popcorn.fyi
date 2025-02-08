import { selectYoutubeTrailer } from "@popcorn.fyi/tmdb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvVideosOptions } from "@/api/tv/details.videos";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";

export const Route = createFileRoute("/_layout/tv-shows/$id/trailer")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      tvVideosOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: trailer } = useSuspenseQuery({
    ...tvVideosOptions(Number.parseInt(id)),
    select: selectYoutubeTrailer,
  });

  return (
    <MediaTrailerDialog
      handleClose={() => {
        void navigate({ to: "/tv-shows/$id" });
      }}
      trailer={trailer}
    />
  );
}
