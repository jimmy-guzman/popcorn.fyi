import { selectYoutubeTrailer } from "@popcorn.fyi/api-clients/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { movieVideosOptions } from "@/api/movie/details.videos";
import { MediaTrailerDialog } from "@/components/media/media-trailer-dialog";

export const Route = createFileRoute("/_layout/movies/$id/trailer")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      movieVideosOptions(Number.parseInt(id, 10)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: trailer } = useSuspenseQuery({
    ...movieVideosOptions(Number.parseInt(id, 10)),
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
