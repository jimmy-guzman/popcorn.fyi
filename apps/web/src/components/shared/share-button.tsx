import { Button } from "@popcorn.fyi/ui/button";
import { toast } from "sonner";

interface ShareButtonProps {
  /** The title of the content being shared */
  title: string;
  /** The URL path of the content */
  url: string;
}

/**
 * A button component that enables users to share content via the Web Share API.
 * Falls back to copying the URL to the clipboard if the Web Share API is unavailable.
 *
 * @example
 * <ShareButton title="Inception" url="/movies/123" />
 */
export const ShareButton = ({ title, url }: ShareButtonProps) => {
  const handleShare = async () => {
    if (typeof navigator.share === "function") {
      await navigator.share({
        title,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Button color="neutral" onClick={handleShare}>
      <span className="sr-only md:not-sr-only">Share</span>{" "}
      <span className="icon-[lucide--share]" />
    </Button>
  );
};
