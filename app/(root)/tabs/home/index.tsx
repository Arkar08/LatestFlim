import Carousel from "@/components/carousel";
import { useMovie } from "@/hooks/useMovies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Movie {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export const RenderListData = ({ data }: { data: Movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  return (
    <Pressable
      className="rounded-lg shadow-sm shadow-white/10 w-[180px] mr-2 pl-2"
      onPress={() =>
        router.navigate({
          pathname: "/movies/[id]",
          params: { id: data.id },
        })
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-[180px] rounded-lg"
        resizeMode="cover"
      />
      <View className="mt-2 p-3">
        <Text className="text-white">{data.title}</Text>
        <Text className="text-white">
          ⭐ {data.vote_average.toFixed(1) || "0.0"}
        </Text>
      </View>
    </Pressable>
  );
};

const HomeScreen = () => {
  const { queryMovie, popularMovie, topMovie, comingMovie } = useMovie();
  const {
    data: movie,
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
    error: nowPlayingError,
    isSuccess: isNowPlayingSuccess,
  } = queryMovie;

  const {
    data: moviePopular,
    isLoading: isPopularLoading,
    isError: isPopularError,
    error: popularError,
    isSuccess: isPopularSuccess,
  } = popularMovie;

  const {
    data: movieTop,
    isLoading: isMovieTopLoading,
    isError: isMovieTopError,
    error: movieTopError,
    isSuccess: isMovieTopSuccess,
  } = topMovie;

  const {
    data: movieComing,
    isLoading: isMovieComingLoading,
    isError: isMovieComingError,
    error: movieComingError,
    isSuccess: isMovieComingSuccess,
  } = comingMovie;

  const [movieListPopular, setMovieListPopular] = useState<Movie[]>([]);
  const [movieListTop, setMovieListTop] = useState<Movie[]>([]);
  const [movieListComing, setMovieListComing] = useState<Movie[]>([]);

  useEffect(() => {
    if (moviePopular?.results && moviePopular.results.length > 0) {
      setMovieListPopular(moviePopular.results.slice(0, 10));
    }

    if (movieTop?.results && movieTop.results.length > 0) {
      setMovieListTop(movieTop.results.slice(0, 10));
    }

    if (movieComing?.results && movieComing.results.length > 0) {
      setMovieListComing(movieComing.results.slice(0, 10));
    }
  }, [moviePopular, movieTop, movieComing]);

  if (
    isNowPlayingLoading ||
    isPopularLoading ||
    isMovieTopLoading ||
    isMovieComingLoading
  ) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="flex-1 justify-center items-center"
      />
    );
  }
  if (
    isNowPlayingError ||
    isPopularError ||
    isMovieTopError ||
    isMovieComingError
  ) {
    return (
      <Text className="text-red-600 text-center mt-4">
        Error:{" "}
        {nowPlayingError?.message ||
          popularError?.message ||
          movieTopError?.message ||
          movieComingError?.message ||
          "An error occurred"}
      </Text>
    );
  }

  return (
    <SafeAreaView className="bg-[#121212] flex-1 p-1">
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Text className="font-bold text-3xl text-[#ffffff]">Latest</Text>
          <Text className="text-[#E50914] font-bold text-3xl">Flim</Text>
        </View>
        <Pressable onPress={() => router.push("/tabs/profile/notification")}>
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </Pressable>
      </View>
      <View className="flex-row items-center gap-3 w-full mt-4">
        <Pressable
          onPress={() => router.push("/tabs/search")}
          className="flex-row items-center border-2 border-[#838383] rounded-lg p-3 flex-1 bg-[#121212] gap-2 active:opacity-70"
        >
          <Ionicons name="search" size={20} color="#838383" />
          <Text className="flex-1 text-[#838383] text-base">
            Search Movies...
          </Text>
        </Pressable>

        <Pressable
          className="p-2 border-2 border-[#838383] rounded-lg"
          onPress={() => router.push("/tabs/profile/notification")}
        >
          <Ionicons name="list-outline" size={24} color="#ffffff" />
        </Pressable>
      </View>
      <ScrollView className="flex-1 mt-2" showsVerticalScrollIndicator={false}>
        <View>{isNowPlayingSuccess && movie && <Carousel data={movie} />}</View>
        <View>
          <View className="flex-row justify-between items-center mt-4 px-1">
            <Text className="text-[#ffffff] text-xl font-semibold">
              🔥 Trending Now
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/tabs/home/topRated")}
            >
              <Text className="text-[#838383] font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          {isMovieTopSuccess && movieListTop && (
            <FlatList
              data={movieListTop}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={{ paddingVertical: 12 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <RenderListData data={item} />}
            />
          )}
        </View>
        <View>
          <View className="flex-row justify-between items-center mt-4 px-1">
            <Text className="text-[#ffffff] text-xl font-semibold">
              ⭐ Popular
            </Text>
            <TouchableOpacity onPress={() => router.push("/tabs/home/popular")}>
              <Text className="text-[#838383] font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          {isPopularSuccess && movieListPopular && (
            <FlatList
              data={movieListPopular}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={{ paddingVertical: 12 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <RenderListData data={item} />}
            />
          )}
        </View>
        <View>
          <View className="flex-row justify-between items-center mt-4 px-1">
            <Text className="text-[#ffffff] text-xl font-semibold">
              🆕 UpComing
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/tabs/home/upComing")}
            >
              <Text className="text-[#838383]  font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          {isMovieComingSuccess && movieListComing && (
            <FlatList
              data={movieListComing}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={{ paddingVertical: 12 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <RenderListData data={item} />}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
