import { youtubeVideoUrl } from "@popcorn.fyi/api-clients/utils";
import { useEffect, useRef } from "react";

interface MediaTrailerDialogProps {
  handleClose: () => void;
  trailer?: {
    key?: string;
    name?: string;
  };
}

export const MediaTrailerDialog = ({
  handleClose,
  trailer,
}: MediaTrailerDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    globalThis.addEventListener("keydown", handleEsc);

    return () => {
      globalThis.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  return (
    <dialog
      className="dsy-modal dsy-modal-bottom sm:dsy-modal-middle"
      id="my_modal_2"
      ref={ref}
    >
      <div className="dsy-modal-box !max-w-screen-lg">
        <h3 className="text-lg font-bold">{trailer ? trailer.name : "N/A"}</h3>
        <p className="py-4">Press ESC key or click outside to close.</p>
        {trailer?.key ? (
          // eslint-disable-next-line react/iframe-missing-sandbox -- TODO
          <iframe
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="aspect-square size-full rounded-md sm:aspect-video"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            src={youtubeVideoUrl(trailer.key, { autoplay: true })}
            title={trailer.name}
          />
        ) : (
          <p>No trailer found.</p>
        )}
      </div>
      <form
        className="dsy-modal-backdrop"
        method="dialog"
        onSubmit={(event) => {
          event.preventDefault();
          handleClose();
        }}
      >
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};
