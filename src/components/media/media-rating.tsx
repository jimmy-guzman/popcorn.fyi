import { Badge } from "@/components/ui/badge";

interface MediaRatingProps {
  average?: number;
}

export const MediaRating = ({ average }: MediaRatingProps) => {
  return (
    <Badge variant="default">{average ? average.toFixed(1) : "N/A"}</Badge>
  );
};
