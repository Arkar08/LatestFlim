import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const CAROUSEL_WIDTH = screenWidth - 8;

// 1. Defined TMDB Movie Types
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

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      setChoiceMovie(data.results.slice(0, 6));
    }
  }, [data]);

  useEffect(() => {
    if (choiceMovie.length === 0) return;

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
  }, [activeIndex, choiceMovie]);

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
                    onPress={() =>
                      console.log(`Play trailer for: ${item.title}`)
                    }
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

      {/* Pagination Dots */}
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
    </View>
  );
};

export default Carousel;
