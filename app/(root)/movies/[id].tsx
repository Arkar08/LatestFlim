import { useMovieById } from "@/hooks/useMovies";
import { useWishlist } from "@/hooks/useWishlist";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";

import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MovieDetailsScreen = () => {
  const insets = useSafeAreaInsets();

  const [book, setBook] = useState<boolean>(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: movie, isLoading, isError, error } = useMovieById(id);

  const { toggleWishlist, isMovieWishlisted } = useWishlist();

  const isBookmarked = isMovieWishlisted(id);

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    });
  };

  if (isLoading) {
    return (
      <View className="bg-[#121212] flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="bg-[#121212] flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-center">
          {error?.message || "Error loading movie details"}
        </Text>
      </View>
    );
  }

  const formatRuntime = (minutes: number | undefined): string => {
    if (!minutes) return "N/A";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}m`;
    }

    return `${hours}h ${remainingMinutes}m`;
  };

  const postedUrl = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;

  return (
    <View className="bg-[#121212] flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ImageBackground
          source={{ uri: postedUrl }}
          className="w-full h-[380px] justify-between"
          resizeMode="cover"
        >
          <SafeAreaView
            edges={["top"]}
            className="flex-row justify-between items-center px-4 mt-2"
          >
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md"
            >
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
            </Pressable>
            <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
              <Ionicons name="share-social-outline" size={22} color="#ffffff" />
            </Pressable>
          </SafeAreaView>

          <View className="px-4 pb-6 pt-20 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent flex-row justify-between items-end">
            <Pressable className="w-14 h-14 bg-[#E50914] rounded-full items-center justify-center shadow-lg shadow-black/50 active:scale-95 transition-transform">
              <Ionicons
                name="play"
                size={28}
                color="#ffffff"
                className="ml-1"
              />
            </Pressable>

            <Pressable
              className={`w-11 h-11 border rounded-xl items-center justify-center ${
                book
                  ? "bg-yellow-500 border-yellow-600"
                  : "bg-[#1a1a1a]/80 border-gray-700/30"
              }`}
              onPress={() => setBook(!book)}
            >
              <Ionicons
                name={book ? "bookmark" : "bookmark-outline"}
                size={20}
                color={book ? "yellow" : "#ffffff"}
              />
            </Pressable>
          </View>
        </ImageBackground>

        <View className="px-4 mt-2">
          <Text className="text-white text-3xl font-bold tracking-wide">
            {movie?.title}
          </Text>

          <View className="flex-row items-center gap-4 mt-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="text-white font-bold text-sm">
                {movie?.vote_average.toFixed(1)}
              </Text>
            </View>
            <Text className="text-gray-400 font-medium text-sm">
              {movie?.release_date}
            </Text>
            <Text className="text-gray-400 font-medium text-sm">
              {formatRuntime(movie?.runtime)}
            </Text>
            {movie?.adult === true && (
              <View className="bg-[#1a1a1a] border border-gray-700/50 rounded-md px-1.5 py-0.5">
                <Text className="text-gray-400 text-xs font-bold">18+</Text>
              </View>
            )}
          </View>

          <View className="flex-row flex-wrap gap-2 mt-4">
            {movie?.genres.map((genre: any) => (
              <View
                key={genre.id}
                className="bg-[#1a1a1a] rounded-full px-4 py-1.5 border border-gray-800/60"
              >
                <Text className="text-gray-400 text-xs font-medium">
                  {genre.name}
                </Text>
              </View>
            ))}
          </View>

          <Text className="text-gray-400 text-base leading-6 mt-6 tracking-wide">
            {movie?.overview}
          </Text>

          <View className="mt-6 gap-1">
            <Text className="text-white text-sm font-bold tracking-wider uppercase opacity-40">
              Language
            </Text>
            <View className="flex-1">
              <Text
                className="text-gray-300 text-base font-semibold"
                numberOfLines={2}
              >
                {movie?.spoken_languages?.map((c: any) => c.name).join(" , ")}
              </Text>
            </View>
          </View>

          <View className="mt-6 gap-1">
            <Text className="text-white text-sm font-bold tracking-wider uppercase opacity-40">
              Production Countries
            </Text>
            <View className="flex-1">
              <Text
                className="text-gray-300 text-base font-semibold"
                numberOfLines={2}
              >
                {movie?.production_countries
                  ?.map((c: any) => c.name)
                  .join(" , ")}
              </Text>
            </View>
          </View>

          <View className="mt-6 px-1">
            <Text className="text-white text-sm font-bold tracking-wider uppercase opacity-40 mb-3">
              Production Companies
            </Text>

            <View className="flex-row items-center flex-wrap gap-y-3">
              <View className="flex-row items-center mr-4">
                {movie?.production_companies?.map(
                  (company: any, index: number) => {
                    const imageUrl = company?.logo_path
                      ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
                      : null;

                    return (
                      <View
                        key={company.id}
                        className="w-12 h-12 rounded-full border-2 border-[#121212] bg-neutral-800 justify-center items-center overflow-hidden"
                        style={{
                          marginLeft: index === 0 ? 0 : -14,
                          zIndex: 100 - index,
                        }}
                      >
                        {imageUrl ? (
                          <Image
                            source={{ uri: imageUrl }}
                            className="w-full h-full bg-white"
                            resizeMode="contain"
                          />
                        ) : (
                          <Text className="text-white text-xs font-bold uppercase">
                            {company.name.charAt(0)}
                          </Text>
                        )}
                      </View>
                    );
                  },
                )}
              </View>

              <View className="flex-1">
                <Text
                  className="text-gray-400 text-xs font-medium leading-4"
                  numberOfLines={4}
                >
                  {movie?.production_companies
                    ?.map((c: any) => c.name)
                    .join(" • ")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] via-[#121212]/95 to-transparent px-4 pt-6"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Pressable
          className="bg-[#E50914] flex-row items-center justify-center py-4 rounded-xl shadow-lg active:opacity-90"
          onPress={handleToggleWishlist}
        >
          <Ionicons
            name={isBookmarked ? "checkmark" : "add"}
            size={22}
            color="#ffffff"
            className="mr-1"
          />
          <Text className="text-white text-base font-bold">
            {isBookmarked ? "In Watchlist" : "Add to Watchlist"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MovieDetailsScreen;
