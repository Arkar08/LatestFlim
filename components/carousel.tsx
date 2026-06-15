/* eslint-disable react-hooks/set-state-in-effect */
import { useMovie } from "@/hooks/useMovies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const { width: screenWidth } = Dimensions.get("window");
const CAROUSEL_WIDTH = screenWidth - 8;

interface TMDBMovie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}

interface CarouselProps {
  data: {
    results?: TMDBMovie[];
  };
}

const Carousel = ({ data }: CarouselProps) => {
  const [choiceMovie, setChoiceMovie] = useState<TMDBMovie[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<TMDBMovie>>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const { toggleTrailer } = useMovie();

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      setChoiceMovie(data.results.slice(0, 6));
    }
  }, [data]);

  useEffect(() => {
    if (choiceMovie.length === 0 || modalVisible) return;

    const interval = setInterval(() => {
      if (activeIndex < choiceMovie.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, choiceMovie, modalVisible]);

  const handlePlayTrailer = async (movieId: number) => {
    setLoadingTrailer(true);
    setModalVisible(true);
    try {
      const list = await toggleTrailer(movieId);
      const trailer = list?.results?.find(
        (vid: any) => vid.type === "Trailer" && vid.site === "YouTube",
      );

      if (trailer?.key) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerKey(null);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setTrailerKey(null);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CAROUSEL_WIDTH);
    setActiveIndex(index);
  };

  if (choiceMovie.length === 0) return null;

  return (
    <View className="mt-2 px-1">
      <FlatList
        ref={flatListRef}
        data={choiceMovie}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToAlignment="center"
        snapToInterval={CAROUSEL_WIDTH}
        decelerationRate="fast"
        renderItem={({ item }) => {
          const imageUrl = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;

          return (
            <View
              style={{ width: CAROUSEL_WIDTH }}
              className="relative h-[220px] pr-2"
            >
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-full rounded-2xl"
                resizeMode="cover"
              />

              <View className="absolute bottom-0 left-0 right-2 top-0 bg-black/50 rounded-2xl p-4 justify-between">
                <View className="flex-row justify-between items-center">
                  <View className="bg-[#E50914] px-2.5 py-1 rounded-md">
                    <Text className="text-white text-[10px] font-bold tracking-wider">
                      NOW PLAYING
                    </Text>
                  </View>
                  <View className="bg-black/60 px-2 py-0.5 rounded-md flex-row items-center gap-1">
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text className="text-white text-xs font-bold">
                      {item.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-end">
                  <View className="flex-1 mr-2">
                    <Text
                      className="text-white text-xl font-bold mb-0.5"
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className="text-gray-300 text-xs font-medium"
                      numberOfLines={5}
                    >
                      {item.overview || "No description available."}
                    </Text>
                  </View>

                  <TouchableOpacity
                    className="bg-[#E50914] flex-row items-center gap-1 px-3 py-2 rounded-xl active:opacity-80"
                    onPress={() => handlePlayTrailer(item.id)}
                  >
                    <Ionicons name="play" size={14} color="white" />
                    <Text className="text-white text-xs font-bold">
                      Trailer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <View className="flex-row justify-center items-center mt-3 gap-2">
        {choiceMovie.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-6 bg-[#E50914]" : "w-2 bg-gray-600"
            }`}
          />
        ))}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 bg-black/80 justify-center items-center">
          <View className="w-full bg-[#1c1c1e] rounded-2xl overflow-hidden aspect-video relative">
            <TouchableOpacity
              className="absolute top-3 right-3 z-50 bg-black/50 p-2 rounded-full"
              onPress={closeModal}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>

            {loadingTrailer ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#E50914" />
              </View>
            ) : trailerKey ? (
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo={true}
                style={{ flex: 1, backgroundColor: "black" }}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                originWhitelist={["*"]}
                source={{
                  uri: `https://www.youtube.com/watch?v=${trailerKey}?autoplay=1&mute=0&playsinline=1&enablejsapi=1`,
                }}
              />
            ) : (
              <View className="flex-1 justify-center items-center p-6">
                <Ionicons name="alert-circle-outline" size={40} color="gray" />
                <Text className="text-white text-center mt-2 font-medium">
                  Trailer not available for this movie.
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Carousel;
