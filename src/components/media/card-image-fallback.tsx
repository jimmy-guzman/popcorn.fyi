export const CardImageFallback = () => {
  return (
    <div
      aria-label="Image unavailable"
      className="flex h-full w-full items-center justify-center rounded-t-lg bg-muted py-4 text-muted-foreground"
      role="img"
    >
      <span aria-hidden="true" className="icon-[lucide--image-off] h-10 w-10" />
    </div>
  );
};
