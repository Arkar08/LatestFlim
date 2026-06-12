import { useWishlist } from "@/hooks/useWishlist";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WatchlistScreen() {
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");

  const { wishlist, toggleWishlist } = useWishlist();

  const displayedItems = activeTab === "movies" ? wishlist : [];

  return (
    <SafeAreaView className="flex-1 bg-[#121315]">
      <StatusBar barStyle="light-content" />

      <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
        <Text className="text-white text-3xl font-bold tracking-tight">
          Watchlist
        </Text>
        <TouchableOpacity>
          <Text className="text-[#EF4444] text-lg font-medium">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#1E2022] mx-4 my-3 p-1 rounded-xl">
        <TouchableOpacity
          onPress={() => setActiveTab("movies")}
          className={`flex-1 py-3 rounded-lg items-center justify-center ${
            activeTab === "movies" ? "bg-[#EF4444]" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-semibold text-base ${activeTab === "movies" ? "text-white" : "text-[#9CA3AF]"}`}
          >
            Movies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("tv")}
          className={`flex-1 py-3 rounded-lg items-center justify-center ${
            activeTab === "tv" ? "bg-[#EF4444]" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-semibold text-base ${activeTab === "tv" ? "text-white" : "text-[#9CA3AF]"}`}
          >
            TV Shows
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4 mt-2"
        showsVerticalScrollIndicator={false}
      >
        {displayedItems.length === 0 ? (
          <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="film-outline" size={64} color="#4B5563" />
            <Text className="text-gray-400 text-lg font-medium mt-4">
              Your watchlist is empty
            </Text>
            <Text className="text-gray-500 text-sm text-center mt-1 px-8">
              Tap the bookmark icon on movie details to save items for later.
            </Text>
          </View>
        ) : (
          displayedItems.map((item: any) => {
            const imageUrl = `https://image.tmdb.org/t/p/w300${item.poster_path}`;

            return (
              <View key={item.id} className="flex-row items-center mb-6">
                <Image
                  source={{ uri: imageUrl }}
                  className="w-20 h-28 rounded-xl bg-[#232528]"
                  resizeMode="cover"
                ></Image>

                <View className="flex-1 ml-4 justify-center">
                  <Text
                    className="text-white text-lg font-bold mb-1"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <Text className="text-[#9CA3AF] text-sm mb-2">Movie</Text>

                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text className="text-white ml-1.5 font-bold text-sm">
                      {item.vote_average?.toFixed(1) || "N/A"}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  className="p-2 hit-slop"
                  onPress={() => toggleWishlist(item)}
                >
                  <Ionicons name="trash-outline" size={22} color="#EF4444" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
