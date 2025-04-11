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
import type { FavoriteId } from "@/schemas/id";

import {
  addToFavoritesFn,
  findFavoriteFn,
  removeFromFavoritesFn,
} from "@/api/favorites";
import { pluralMediaType } from "@/lib/plural-media-type";

interface FavoriteProps {
  mediaType: MediaType;
  tmdbId: number;
}

export const Favorite = ({ mediaType, tmdbId }: FavoriteProps) => {
  const { userId } = useAuth();
  const getFavorite = useServerFn(findFavoriteFn);
  const { data: favorite } = useSuspenseQuery({
    queryFn: async () => getFavorite({ data: { tmdbId, userId } }),
    queryKey: ["favorites", "details", { tmdbId, userId }],
  });
  const queryClient = useQueryClient();
  const addToFavorites = useMutation({
    mutationFn: async (data: unknown) => addToFavoritesFn({ data }),
    mutationKey: [mediaType, "favorites", "add", tmdbId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favorites", "details", { tmdbId, userId }],
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
    mutationFn: async (id: FavoriteId) => removeFromFavoritesFn({ data: id }),
    mutationKey: [mediaType, "favorites", "remove", tmdbId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favorites", "details", { tmdbId, userId }],
      });

      toast.success("Removed from Favorites.");
    },
  });

  return favorite?.id ? (
    <Tooltip content="Remove From Favorites">
      <Button
        color="neutral"
        disabled={removeFromFavorites.isPending}
        onClick={() => {
          removeFromFavorites.mutate(favorite.id);
        }}
      >
        <span className="sr-only md:not-sr-only">Favorite</span>{" "}
        <span className="icon-[lucide--star-off] h-5 w-5" />
      </Button>
    </Tooltip>
  ) : (
    <Tooltip content="Add to favorites">
      <Button
        color="neutral"
        disabled={addToFavorites.isPending}
        onClick={() => {
          addToFavorites.mutate({ mediaType, tmdbId, userId });
        }}
      >
        <span className="sr-only md:not-sr-only">Favorite</span>{" "}
        <span className="icon-[lucide--star] h-5 w-5" />
      </Button>
    </Tooltip>
  );
};
