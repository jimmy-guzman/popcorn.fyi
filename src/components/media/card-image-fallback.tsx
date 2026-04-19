import { ImageOffIcon } from "lucide-react";

export const CardImageFallback = () => {
  return (
    <div
      aria-label="Image unavailable"
      className="flex h-full w-full items-center justify-center rounded-t-lg bg-muted py-4 text-muted-foreground"
      role="img"
    >
      <ImageOffIcon aria-hidden className="h-10 w-10" />
    </div>
  );
};
