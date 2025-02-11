import { useUser } from "@clerk/tanstack-start";
import { Button } from "@popcorn.fyi/ui/button";
import { Tooltip } from "@popcorn.fyi/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import type { MediaType } from "@/lib/types";

import { addToFavoritesFn, removeFromFavoritesFn } from "@/api/favorites";
import { pluralMediaType } from "@/lib/plural-media-type";

interface FavoriteProps {
  favorite: boolean;
  mediaType: MediaType;
  tmdbId: number;
}

export const Favorite = ({ favorite, mediaType, tmdbId }: FavoriteProps) => {
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const addToFavorites = useMutation({
    mutationFn: addToFavoritesFn,
    mutationKey: [mediaType, "favorites", "add", tmdbId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [mediaType, "details", tmdbId],
      });

      toast.success("Added to Favorites.", {
        action: (
          <Link
            className="dsy-link"
            to={`/favorites/${pluralMediaType(mediaType)}`}
          >
            View
          </Link>
        ),
      });
    },
  });
  const removeFromFavorites = useMutation({
    mutationFn: removeFromFavoritesFn,
    mutationKey: [mediaType, "favorites", "remove", tmdbId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [mediaType, "details", tmdbId],
      });

      toast.success("Removed from Favorites.");
    },
  });

  return isSignedIn ? (
    favorite ? (
      <Tooltip content="Remove From Favorites">
        <Button
          color="neutral"
          disabled={removeFromFavorites.isPending}
          onClick={() => {
            removeFromFavorites.mutate({ data: tmdbId });
          }}
        >
          <span className="icon-[lucide--star-off] h-5 w-5" />
        </Button>
      </Tooltip>
    ) : (
      <Tooltip content="Add to favorites">
        <Button
          color="neutral"
          disabled={addToFavorites.isPending}
          onClick={() => {
            addToFavorites.mutate({
              data: { mediaType, tmdbId, userId: user.id },
            });
          }}
        >
          <span className="icon-[lucide--star] h-5 w-5" />
        </Button>
      </Tooltip>
    )
  ) : null;
};
