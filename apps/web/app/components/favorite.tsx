import { useUser } from "@clerk/tanstack-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import type { MediaType } from "@/lib/types";

import { addToFavoritesFn, removeFromFavoritesFn } from "@/lib/favorites";
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

      toast.success("Removed from Favorites.", {
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

  return isSignedIn ? (
    favorite ? (
      <div className="dsy-tooltip" data-tip="Remove from favorites">
        <button
          className="dsy-btn dsy-btn-neutral"
          disabled={removeFromFavorites.isPending}
          onClick={() => {
            removeFromFavorites.mutate({ data: tmdbId });
          }}
          type="button"
        >
          <span className="icon-[lucide--star-off] h-5 w-5" />
        </button>
      </div>
    ) : (
      <div className="dsy-tooltip" data-tip="Add to favorites">
        <button
          className="dsy-btn dsy-btn-neutral"
          disabled={addToFavorites.isPending}
          onClick={() => {
            addToFavorites.mutate({
              data: { mediaType, tmdbId, userId: user.id },
            });
          }}
          type="button"
        >
          <span className="icon-[lucide--star] h-5 w-5" />
        </button>
      </div>
    )
  ) : null;
};
