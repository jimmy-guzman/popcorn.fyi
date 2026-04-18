import { Badge } from "@/components/ui/badge";

export const MediaType = ({ mediaType }: { mediaType?: string }) => {
  return mediaType ? (
    <Badge className="text-nowrap capitalize" variant="secondary">
      {mediaType === "tv" ? "TV Show" : mediaType}
    </Badge>
  ) : null;
};
