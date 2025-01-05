export const MediaType = ({ mediaType }: { mediaType?: string }) => {
  return mediaType ? (
    <span className="dsy-badge dsy-badge-outline text-nowrap capitalize">
      {mediaType === "tv" ? "TV Show" : mediaType}
    </span>
  ) : null;
};
