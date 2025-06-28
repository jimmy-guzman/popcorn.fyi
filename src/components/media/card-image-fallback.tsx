export const CardImageFallback = () => {
  return (
    <div
      aria-label="Image unavailable"
      className="bg-base-200 text-base-content/50 rounded-t-box flex h-full w-full items-center justify-center py-4"
      role="img"
    >
      <span aria-hidden="true" className="icon-[lucide--image-off] h-10 w-10" />
    </div>
  );
};
