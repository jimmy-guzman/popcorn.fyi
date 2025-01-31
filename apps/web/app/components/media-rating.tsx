import { Badge } from "@popcorn.fyi/ui/badge";

interface MediaRatingProps {
  average?: number;
}

export const MediaRating = ({ average }: MediaRatingProps) => {
  return <Badge color="accent">{average ? average.toFixed(1) : "N/A"}</Badge>;
};
