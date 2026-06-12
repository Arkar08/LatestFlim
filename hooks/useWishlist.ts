import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const WISHLIST_KEY = "movie_wishlist";

interface WishlistMovie {
  id: string | number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const fetchWishlist = async (): Promise<WishlistMovie[]> => {
  const stored = await AsyncStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: async (movie: WishlistMovie) => {
      const currentList = await fetchWishlist();
      const exists = currentList.some(
        (item) => String(item.id) === String(movie.id),
      );

      let updatedList;
      if (exists) {
        updatedList = currentList.filter(
          (item) => String(item.id) !== String(movie.id),
        );
      } else {
        updatedList = [...currentList, movie];
      }

      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedList));
      return updatedList;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["wishlist"], data);
    },
  });

  const isMovieWishlisted = (id: string | number) => {
    return wishlist.some((item) => String(item.id) === String(id));
  };

  return {
    wishlist,
    toggleWishlist: toggleWishlistMutation.mutate,
    isMovieWishlisted,
  };
};
