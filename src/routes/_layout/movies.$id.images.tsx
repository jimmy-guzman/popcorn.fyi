import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";

import { MediaImageGrid } from "@/components/media/media-image-grid";
import { Prose } from "@/components/shared/prose";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { movieImagesOptions } from "@/data/movie/details.images";
import { orEmpty } from "@/lib/array";

export const Route = createFileRoute("/_layout/movies/$id/images")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(movieImagesOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: images } = useSuspenseQuery(movieImagesOptions(id));
  const backdrops = orEmpty(images.backdrops);
  const posters = orEmpty(images.posters);

  if (backdrops.length === 0 && posters.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ImageIcon />
          </EmptyMedia>
          <EmptyTitle>No images yet</EmptyTitle>
          <EmptyDescription>
            TMDB has no backdrops or posters for this movie.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {backdrops.length > 0 ? (
        <section className="flex w-full flex-col gap-8">
          <Prose>
            <h2>Backdrops</h2>
          </Prose>
          <MediaImageGrid alt="Backdrop" aspect="wide" images={backdrops} />
        </section>
      ) : null}
      {posters.length > 0 ? (
        <section className="flex w-full flex-col gap-8">
          <Prose>
            <h2>Posters</h2>
          </Prose>
          <MediaImageGrid alt="Poster" aspect="poster" images={posters} />
        </section>
      ) : null}
    </div>
  );
}
