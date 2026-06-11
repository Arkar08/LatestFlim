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

const MOVIES_DATA = [
  {
    id: "1",
    title: "Interstellar",
    year: "2014",
    duration: "2h 49m",
    rating: "8.6",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Inception",
    year: "2010",
    duration: "2h 28m",
    rating: "8.8",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "The Prestige",
    year: "2006",
    duration: "2h 10m",
    rating: "8.5",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "The Matrix",
    year: "1999",
    duration: "2h 16m",
    rating: "8.7",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300&auto=format&fit=crop",
  },
];

export default function WatchlistScreen() {
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");

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
        {MOVIES_DATA.map((item) => (
          <View key={item.id} className="flex-row items-center mb-6">
            <Image
              source={{ uri: item.image }}
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
              <Text className="text-[#9CA3AF] text-sm mb-2">
                {item.year} • {item.duration}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-white ml-1.5 font-bold text-sm">
                  ⭐{item.rating}
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
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
