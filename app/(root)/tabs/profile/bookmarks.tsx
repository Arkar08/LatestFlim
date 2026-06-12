import { useWishlist } from "@/hooks/useWishlist";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 40) / 2;

export default function BookmarksScreen() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <SafeAreaView className="flex-1 bg-[#121315]">
      <StatusBar barStyle="light-content" />

      <View className="px-4 py-3 flex-row items-center justify-between border-b border-[#1E2022]">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">
            My Bookmarks
          </Text>
        </View>

        {wishlist.length > 0 && (
          <View className="bg-[#E50914]/20 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-[#E50914]">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {wishlist.length === 0 ? (
          <View className="items-center justify-center pt-32 px-8">
            <View className="w-20 h-20 bg-[#1E1E1E] rounded-full items-center justify-center mb-5">
              <Ionicons name="bookmark-outline" size={36} color="#E50914" />
            </View>
            <Text className="text-white text-xl font-bold text-center">
              No Bookmarks Saved Yet
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2 leading-5">
              Explore your movie library and hit the bookmark emblem on items to
              pin them to this page workspace.
            </Text>

            <TouchableOpacity
              onPress={() => router.replace("/")}
              className="mt-8 bg-[#1E1E1E] border border-gray-800 px-6 py-3 rounded-xl active:bg-neutral-800"
            >
              <Text className="text-white font-semibold text-sm">
                Discover Content
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {wishlist.map((movie) => {
              const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

              return (
                <View
                  key={movie.id}
                  className="mb-5 bg-[#1E1E1E] rounded-2xl overflow-hidden relative shadow-md"
                  style={{ width: COLUMN_WIDTH }}
                >
                  <TouchableOpacity activeOpacity={0.85}>
                    <Image
                      source={{ uri: imageUrl }}
                      className="w-full h-56 bg-neutral-800"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => toggleWishlist(movie)}
                    activeOpacity={0.7}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md items-center justify-center border border-white/10"
                  >
                    <Ionicons name="bookmark" size={16} color="#FFD700" />
                  </TouchableOpacity>

                  {/* Metadata Base Text Label Box */}
                  <View className="p-3">
                    <Text
                      className="text-white font-bold text-sm leading-4 mb-1"
                      numberOfLines={1}
                    >
                      {movie.title}
                    </Text>

                    <View className="flex-row items-center justify-between mt-1">
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text className="text-gray-300 font-semibold text-xs ml-1">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </Text>
                      </View>

                      <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-wider bg-neutral-800/80 px-1.5 py-0.5 rounded">
                        Movie
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
