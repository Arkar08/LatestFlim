import { useSearch } from "@/hooks/useMovies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState("");

  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedText(searchText);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const { data, isLoading, isError, error } = useSearch(debouncedText);
  const fetchedMovies = data?.results || [];

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleClearInput = () => {
    inputRef.current?.clear();
    setSearchText("");
    setDebouncedText("");
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    handleClearInput();
    router.back();
  };

  const handleTextChange = (text: string) => {
    const englishOnly = text.replace(/[^A-Za-z0-9\s.,:\-()'!&]/g, "");
    setSearchText(englishOnly);
  };

  const formatRuntime = (minutes: number | undefined): string => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours === 0
      ? `${remainingMinutes}m`
      : `${hours}h ${remainingMinutes}m`;
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="flex-row justify-between items-center mt-2 px-1">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back-outline" size={24} color="#838383" />
        </Pressable>
        <Text className="text-[#ffffff] text-3xl font-bold pr-4">Search</Text>
        <View className="w-6" />
      </View>

      <View className="flex-row items-center gap-3 w-full mt-5 px-1">
        <View className="flex-row items-center border-2 border-[#838383] rounded-lg p-3 flex-1 bg-[#121212] gap-2 ">
          <Ionicons name="search" size={20} color="#838383" />
          <TextInput
            ref={inputRef}
            autoFocus={true}
            value={searchText}
            showSoftInputOnFocus={true}
            placeholder="Search Movies..."
            placeholderTextColor={"#838383"}
            className="flex-1 p-0 text-base text-white"
            underlineColorAndroid="transparent"
            onChangeText={handleTextChange}
            keyboardType="ascii-capable"
          />
          {searchText.length > 0 && (
            <Pressable onPress={handleClearInput} hitSlop={10}>
              <Ionicons name="close-circle-outline" size={20} color="#838383" />
            </Pressable>
          )}
        </View>

        <Pressable onPress={handleCancel} hitSlop={10}>
          <Text className="text-[#838383] text-center pr-1 font-medium">
            Cancel
          </Text>
        </Pressable>
      </View>

      {/* Results / Feedback Container */}
      <View className="flex-1 mt-6 px-1">
        <Text className="text-white text-lg font-bold mb-2">
          {searchText.length > 0 ? "Search Results" : "Discover"}
        </Text>

        {isLoading ? (
          <View className="flex-1 justify-center items-center mt-20">
            <ActivityIndicator size="large" color="#E50914" />
          </View>
        ) : isError ? (
          <View className="flex-1 justify-center items-center mt-20 p-4">
            <Text className="text-red-600 text-center text-base">
              {error?.message || "Something went wrong fetching data."}
            </Text>
          </View>
        ) : (
          <FlatList
            data={fetchedMovies}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center mt-20">
                <Ionicons name="film-outline" size={48} color="#444" />
                <Text className="text-gray-500 mt-2 text-base">
                  {searchText.trim().length > 0
                    ? "No movies match your search."
                    : "Type above to explore millions of movies."}
                </Text>
              </View>
            )}
            renderItem={({ item }) => {
              const imageUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";

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
                    className="w-[90px] h-[130px] rounded-lg bg-[#232528]"
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
                        {item.vote_average
                          ? item.vote_average.toFixed(1)
                          : "0.0"}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
