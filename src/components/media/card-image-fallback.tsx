import { ImageOffIcon } from "lucide-react";

export const CardImageFallback = () => {
  return (
    <div
      aria-label="Image unavailable"
      className="flex aspect-2/3 w-full shrink-0 items-center justify-center bg-muted text-muted-foreground"
      role="img"
    >
      <ImageOffIcon aria-hidden className="h-10 w-10" />
    </div>
  );
};
