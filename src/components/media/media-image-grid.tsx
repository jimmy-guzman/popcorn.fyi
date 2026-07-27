import { tmdbImageUrl } from "@/lib/tmdb-images";

interface MediaImageGridProps {
  alt: string;
  aspect: "poster" | "wide";
  images: {
    filePath?: string;
    height?: number;
    width?: number;
  }[];
}

export const MediaImageGrid = ({
  alt,
  aspect,
  images,
}: MediaImageGridProps) => {
  return (
    <ul
      className={
        aspect === "wide"
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          : "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
      }
    >
      {images.map((image) => {
        if (!image.filePath) {
          return null;
        }

        return (
          <li key={image.filePath}>
            <a
              href={tmdbImageUrl(image.filePath)}
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt={alt}
                className={
                  aspect === "wide"
                    ? "aspect-video w-full object-cover"
                    : "aspect-2/3 w-full object-cover"
                }
                decoding="async"
                height={image.height}
                loading="lazy"
                src={tmdbImageUrl(image.filePath, "w500")}
                width={image.width}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};
