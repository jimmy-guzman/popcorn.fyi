import { Badge } from "@popcorn.fyi/ui/badge";

export const MediaType = ({ mediaType }: { mediaType?: string }) => {
  return mediaType ? (
    <Badge className="text-nowrap capitalize" variant="outline">
      {mediaType === "tv" ? "TV Show" : mediaType}
    </Badge>
  ) : null;
};
