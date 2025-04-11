import { useAuth } from "@clerk/tanstack-react-start";
import { Button } from "@popcorn.fyi/ui/button";
import { Tooltip } from "@popcorn.fyi/ui/tooltip";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import type { MediaType } from "@/lib/types";
import type { WatchlistId } from "@/schemas/id";

import {
  addToWatchlistFn,
  findWatchlistFn,
  removeFromWatchlistFn,
} from "@/api/watchlist";

interface WatchProps {
  mediaType: MediaType;
  tmdbId: number;
}

export const Watch = ({ mediaType, tmdbId }: WatchProps) => {
  const { userId } = useAuth();
  const getWatchlistItem = useServerFn(findWatchlistFn);
  const { data: watchlistItem } = useSuspenseQuery({
    queryFn: async () => getWatchlistItem({ data: { tmdbId, userId } }),
    queryKey: ["watchlist", "details", { tmdbId, userId }],
  });
  const queryClient = useQueryClient();
  const addToWatchlist = useMutation({
    mutationFn: async (data: unknown) => addToWatchlistFn({ data }),
    mutationKey: [mediaType, "watchlist", "add", tmdbId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["watchlist", "details", { tmdbId, userId }],
      });

      toast.success("Added to Watchlist.", {
        action: (
          <Link
            className="dsy-link"
            to={`/watch/${mediaType === "movie" ? ("movies" as const) : ("tv-shows" as const)}`}
          >
            View
          </Link>
        ),
      });
    },
  });
  const removeFromWatchlist = useMutation({
    mutationFn: async (id: WatchlistId) => removeFromWatchlistFn({ data: id }),
    mutationKey: [mediaType, "watchlist", "remove", tmdbId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["watchlist", "details", { tmdbId, userId }],
      });

      toast.success("Removed from Watchlist.");
    },
  });

  return watchlistItem?.id ? (
    <Tooltip content="Remove From Watchlist">
      <Button
        color="neutral"
        disabled={removeFromWatchlist.isPending}
        onClick={() => {
          removeFromWatchlist.mutate(watchlistItem.id);
        }}
      >
        <span className="sr-only md:not-sr-only">Watchlist</span>{" "}
        <span className="icon-[lucide--eye-off] h-5 w-5" />
      </Button>
    </Tooltip>
  ) : (
    <Tooltip content="Add to Watchlist">
      <Button
        color="neutral"
        disabled={addToWatchlist.isPending}
        onClick={() => {
          addToWatchlist.mutate({ mediaType, tmdbId, userId });
        }}
      >
        <span className="sr-only md:not-sr-only">Watchlist</span>{" "}
        <span className="icon-[lucide--eye] h-5 w-5" />
      </Button>
    </Tooltip>
  );
};
