interface MediaRatingProps {
  average?: number;
}

export const MediaRating = ({ average }: MediaRatingProps) => {
  return (
    <span className="dsy-badge dsy-badge-accent">
      {average ? average.toFixed(1) : "N/A"}
    </span>
  );
};
