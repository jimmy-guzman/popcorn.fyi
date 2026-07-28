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
import { personImagesOptions } from "@/data/people/details.images";
import { orEmpty } from "@/lib/array";

export const Route = createFileRoute("/_layout/people/$id/images")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(personImagesOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: images } = useSuspenseQuery(personImagesOptions(id));
  const profiles = orEmpty(images.profiles);

  if (profiles.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ImageIcon />
          </EmptyMedia>
          <EmptyTitle>No images yet</EmptyTitle>
          <EmptyDescription>
            TMDB has no images for this person.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Images</h2>
      </Prose>
      <MediaImageGrid alt="Profile" aspect="poster" images={profiles} />
    </section>
  );
}
