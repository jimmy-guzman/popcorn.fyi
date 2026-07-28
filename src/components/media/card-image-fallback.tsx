import { ImageOffIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface CardImageFallbackProps {
  className?: string;
}

export const CardImageFallback = ({ className }: CardImageFallbackProps) => {
  return (
    <div
      aria-label="Image unavailable"
      className={cn(
        "flex aspect-2/3 w-full shrink-0 items-center justify-center bg-muted text-muted-foreground",
        className,
      )}
      role="img"
    >
      <ImageOffIcon aria-hidden className="h-10 w-10" />
    </div>
  );
};
