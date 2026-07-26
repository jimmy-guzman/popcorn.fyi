import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { VideoIcon } from "lucide-react";

import { MediaVideoCard } from "@/components/media/media-video-card";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { tvVideosOptions } from "@/data/tv/details.videos";
import { orEmpty } from "@/lib/array";

export const Route = createFileRoute("/_layout/tv-shows/$id/videos")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(tvVideosOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: videos } = useSuspenseQuery(tvVideosOptions(id));
  const results = orEmpty(videos.results).filter((video) => {
    return video.site === "YouTube" && Boolean(video.key);
  });

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Videos</h2>
      </Prose>
      {results.length > 0 ? (
        <ListContent>
          {results.map((video) => {
            return <MediaVideoCard key={video.id} video={video} />;
          })}
        </ListContent>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <VideoIcon />
            </EmptyMedia>
            <EmptyTitle>No videos yet</EmptyTitle>
            <EmptyDescription>
              TMDB has no trailers or clips for this TV show.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
