import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { youtubeVideoUrl } from "@/lib/tmdb-youtube";

interface MediaTrailerDialogProps {
  handleClose: () => void;
  trailer?: {
    key?: string;
    name?: string;
  };
}

function trailerHeading(trailer: MediaTrailerDialogProps["trailer"]) {
  if (!trailer) return "N/A";

  const name = trailer.name?.trim();

  if (!name) return "N/A";

  return name;
}

export const MediaTrailerDialog = ({
  handleClose,
  trailer,
}: MediaTrailerDialogProps) => {
  const heading = trailerHeading(trailer);

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-5xl sm:max-w-5xl" showCloseButton>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription>
            Press ESC key or click outside to close.
          </DialogDescription>
        </DialogHeader>
        {trailer?.key ? (
          <iframe
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="aspect-square size-full rounded sm:aspect-video"
            // eslint-disable-next-line react-dom/no-unsafe-iframe-sandbox -- TODO: Remove this line when eslint config is fixed
            sandbox="allow-scripts allow-same-origin allow-presentation"
            src={youtubeVideoUrl(trailer.key, { autoplay: true })}
            title={heading}
          />
        ) : (
          <p>No trailer found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
