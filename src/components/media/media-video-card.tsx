import { PlayIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { youtubeThumbnailUrl, youtubeWatchUrl } from "@/lib/tmdb-youtube";

interface MediaVideoCardProps {
  video: {
    key?: string;
    name?: string;
    published_at?: string;
    type?: string;
  };
}

export const MediaVideoCard = ({ video }: MediaVideoCardProps) => {
  const name = video.name ?? "Untitled";

  if (!video.key) {
    return null;
  }

  return (
    <a
      aria-label={`${name} on YouTube`}
      href={youtubeWatchUrl(video.key)}
      rel="noreferrer"
      target="_blank"
    >
      <Card className="relative h-full pt-0 shadow-lg" size="sm">
        <img
          alt={name}
          className="aspect-video w-full shrink-0 object-cover"
          decoding="async"
          loading="lazy"
          src={youtubeThumbnailUrl(video.key)}
        />
        <span className="pointer-events-none absolute inset-x-0 top-0 flex aspect-video items-center justify-center">
          <PlayIcon
            aria-hidden
            className="size-10 rounded-full bg-background/70 p-2"
          />
        </span>
        <CardHeader className="gap-2">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          {video.type ? <CardDescription>{video.type}</CardDescription> : null}
        </CardHeader>
      </Card>
    </a>
  );
};
