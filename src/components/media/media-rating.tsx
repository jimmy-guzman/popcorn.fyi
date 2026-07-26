import { Badge } from "@/components/ui/badge";

interface MediaRatingProps {
  average?: number;
}

export const MediaRating = ({ average }: MediaRatingProps) => {
  return (
    <Badge className="tabular-nums" variant="default">
      {typeof average === "number" ? average.toFixed(1) : "N/A"}
    </Badge>
  );
};
