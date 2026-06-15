/* eslint-disable react-hooks/set-state-in-effect */
import { useGenre } from "@/hooks/useGenre";
import { useMovie } from "@/hooks/useMovies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GenreItem {
  id: string | number;
  name: string;
}

const PopularScreen = () => {
  const [activeGenre, setActiveGenre] = useState<string>("All");

  const { topMovie } = useMovie();
  const { queryGenre } = useGenre();

  const {
    data: movieTop,
    isLoading: isPopularLoading,
    isError: isPopularError,
    error: popularError,
    isSuccess: isPopularSuccess,
  } = topMovie;

  const {
    data: genre,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError,
    isSuccess: isGenreSuccess,
  } = queryGenre;

  const [movieList, setMovieList] = useState<any[]>([]);

  const [genreList, setGenreList] = useState<GenreItem[]>([
    { id: "all", name: "All" },
  ]);

  const filteredMovies = movieList.filter((movie) => {
    if (activeGenre === "All") return true;

    const targetGenre = genreList.find(
      (g) => g.name.toLowerCase() === activeGenre.toLowerCase(),
    );

    if (!targetGenre) return false;

    return movie.genre_ids?.includes(targetGenre.id);
  });

  useEffect(() => {
    if (movieTop?.results && movieTop.results?.length > 0) {
      setMovieList(movieTop.results);
    }

    let incomingGenres: GenreItem[] = [];
    if (genre?.genres && genre.genres?.length > 0) {
      incomingGenres = genre.genres;
    } else if (genre?.results && genre.results?.length > 0) {
      incomingGenres = genre.results;
    }

    if (incomingGenres.length > 0) {
      setGenreList([{ id: "all", name: "All" }, ...incomingGenres]);
    }
  }, [movieTop, genre]);

  if (isPopularLoading || isGenreLoading) {
    return (
      <View className="bg-[#121212] flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (isPopularError || isGenreError) {
    return (
      <View className="bg-[#121212] flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-center">
          {popularError?.message ||
            genreError?.message ||
            "Error loading movie details"}
        </Text>
      </View>
    );
  }

  const formatRuntime = (minutes: number | undefined): string => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours === 0
      ? `${remainingMinutes}m`
      : `${hours}h ${remainingMinutes}m`;
  };

  const getGenreCount = (currentGenre: GenreItem) => {
    if (currentGenre.name === "All") return movieList.length;
    return movieList.filter((movie) =>
      movie.genre_ids?.includes(currentGenre.id),
    ).length;
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="flex-row justify-between items-center mt-2 px-4">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back-outline" size={24} color="#838383" />
        </Pressable>
        <Text className="text-[#ffffff] text-3xl font-bold">Top Rated</Text>
        <Pressable onPress={() => router.push("/tabs/search")}>
          <Ionicons name="search" size={24} color="#838383" />
        </Pressable>
      </View>

      <View className="my-8">
        {isGenreSuccess && genreList && (
          <FlatList
            data={genreList}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 gap-x-2"
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isActive = activeGenre === item.name;
              const count = getGenreCount(item);
              return (
                <TouchableOpacity
                  onPress={() => setActiveGenre(item.name)}
                  className={`px-5 py-2.5 rounded-xl items-center justify-center ${
                    isActive ? "bg-[#EF4444]" : "bg-[#1E2022]"
                  }`}
                >
                  <Text
                    className={`font-semibold text-base ${
                      isActive ? "text-white" : "text-[#9CA3AF]"
                    }`}
                  >
                    {item.name} ({count})
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View className="flex-1 mt-6 px-1">
        {isPopularSuccess && movieList && (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center mt-20">
                <Ionicons name="film-outline" size={48} color="#444" />
                <Text className="text-gray-500 mt-2 text-base">
                  No movies match this category.
                </Text>
              </View>
            )}
            renderItem={({ item }) => {
              const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
              return (
                <Pressable
                  className="flex-row items-center mb-4 gap-4 bg-[#1a1a1a]/40 p-2 rounded-xl"
                  onPress={() =>
                    router.navigate({
                      pathname: "/movies/[id]",
                      params: { id: item.id },
                    })
                  }
                >
                  <Image
                    source={{ uri: imageUrl }}
                    className="w-[90px] h-[130px] rounded-lg"
                    resizeMode="cover"
                  />

                  <View className="flex-1 justify-center">
                    <Text
                      className="text-white text-base font-bold mb-1"
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>

                    <View className="flex-row items-center gap-3 mt-1">
                      <Text className="text-gray-400 text-sm">
                        {item.release_date
                          ? item.release_date.split("-")[0]
                          : "N/A"}
                      </Text>
                      <Text className="text-gray-600 text-xs">|</Text>
                      <Text className="text-gray-400 text-sm">
                        {formatRuntime(item?.runtime)}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-1 mt-3">
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text className="text-white text-sm font-semibold">
                        {item?.vote_average
                          ? item.vote_average.toFixed(1)
                          : "0.0"}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity className="p-2">
                    <Ionicons
                      name="ellipsis-vertical-outline"
                      size={24}
                      color="#838383"
                    />
                  </TouchableOpacity>
                </Pressable>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PopularScreen;
