/* eslint-disable react-hooks/set-state-in-effect */
import { useGenre } from "@/hooks/useGenre";
import { useMovie } from "@/hooks/useMovies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GenreItem {
  id: number;
  name: string;
}

const UpComingScreen = () => {
  const [remindedMovieIds, setRemindedMovieIds] = useState<number[]>([]);
  const [movieList, setMovieList] = useState<any[]>([]);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  const { comingMovie } = useMovie();
  const { queryGenre } = useGenre();

  const {
    data: movieComing,
    isLoading: isMovieComingLoading,
    isError: isMovieComingError,
    error: movieComingError,
    isSuccess: isMovieComingSuccess,
  } = comingMovie;

  const {
    data: genre,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError,
  } = queryGenre;

  useEffect(() => {
    if (movieComing?.results && movieComing?.results.length > 0) {
      setMovieList(movieComing.results);
    }
  }, [movieComing]);

  useEffect(() => {
    const rawGenres: GenreItem[] = genre?.genres || genre?.results || [];
    if (rawGenres.length > 0) {
      const map: Record<number, string> = {};
      rawGenres.forEach((g) => {
        map[g.id] = g.name;
      });
      setGenreMap(map);
    }
  }, [genre]);

  if (isMovieComingLoading || isGenreLoading) {
    return (
      <View className="bg-[#121212] flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (isMovieComingError || isGenreError) {
    return (
      <View className="bg-[#121212] flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-center">
          {movieComingError?.message ||
            genreError?.message ||
            "Error loading movie details"}
        </Text>
      </View>
    );
  }

  const toggleReminder = (id: number) => {
    setRemindedMovieIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id],
    );
  };

  const parseReleaseDate = (dateString: string) => {
    if (!dateString) return { month: "N/A", day: "--" };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { month: "N/A", day: "--" };

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return {
      month: months[date.getMonth()],
      day: date.getDate().toString(),
    };
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="flex-row justify-between items-center mt-2 px-4">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back-outline" size={24} color="#838383" />
        </Pressable>
        <Text className="text-[#ffffff] text-3xl font-bold">UpComing</Text>
        <Pressable onPress={() => router.push("/tabs/search")}>
          <Ionicons name="search" size={24} color="#838383" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {isMovieComingSuccess &&
          movieList &&
          movieList.map((item) => {
            const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            const isReminded = remindedMovieIds.includes(item.id);

            const { month, day } = parseReleaseDate(item.release_date);

            const firstGenreId = item.genre_ids?.[0];
            const genreName = firstGenreId ? genreMap[firstGenreId] : "Movie";

            return (
              <Pressable
                key={item.id}
                onPress={() =>
                  router.navigate({
                    pathname: "/movies/[id]",
                    params: { id: item.id },
                  })
                }
                className="flex-row mb-6 items-center bg-[#1c1c1e]/40 p-2 rounded-2xl"
              >
                <View className="w-[60px] h-[60px] border border-gray-700 items-center justify-center bg-[#1e2022] rounded-xl mr-2">
                  <Text className="text-gray-400 font-medium text-xs uppercase">
                    {month}
                  </Text>
                  <Text className="text-white font-bold text-lg leading-5">
                    {day}
                  </Text>
                </View>

                <Image
                  source={{ uri: imageUrl }}
                  className="w-20 h-28 rounded-xl bg-[#232528]"
                  resizeMode="cover"
                />

                <View className="flex-1 ml-4 justify-center">
                  <Text
                    className="text-white text-lg font-bold mb-1"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <Text
                    className="text-[#9CA3AF] text-sm mb-2"
                    numberOfLines={1}
                  >
                    {genreName}
                  </Text>

                  <Pressable
                    className="flex-row items-center"
                    onPress={() => toggleReminder(item.id)}
                  >
                    <Ionicons
                      name={
                        isReminded ? "notifications" : "notifications-outline"
                      }
                      size={18}
                      color="#E50914"
                    />
                    <Text className="text-[#E50914] ml-1 font-bold">
                      {isReminded ? "Reminder Set" : "Reminder"}
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpComingScreen;
