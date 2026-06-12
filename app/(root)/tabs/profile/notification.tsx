import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New Movie Release!",
    description:
      "Inception 2 is now available to stream on your watchlist platform.",
    time: "2 hours ago",
    isUnread: true,
    icon: "film",
    iconColor: "#E50914",
  },
  {
    id: "2",
    title: "Subscription Renewed",
    description:
      "Thank you! Your Premium Membership has successfully processed.",
    time: "1 day ago",
    isUnread: false,
    icon: "card-outline",
    iconColor: "#10B981",
  },
  {
    id: "3",
    title: "Account Security Alert",
    description:
      "Your account credentials were accessed from a new device terminal.",
    time: "3 days ago",
    isUnread: false,
    icon: "shield-checkmark-outline",
    iconColor: "#3B82F6",
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#121315]">
      <View className="px-4 py-3 flex-row justify-between items-center border-b border-[#1E2022]">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">
            Notifications
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="text-xs font-semibold text-[#E50914]">
            Mark all read
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-4"
      >
        {NOTIFICATIONS.map((item) => (
          <TouchableOpacity
            key={item.id}
            className={`flex-row items-start p-4 mb-3 rounded-2xl ${item.isUnread ? "bg-[#1E1E1E] border-l-4 border-[#E50914]" : "bg-[#1A1B1D]"}`}
          >
            <View className="p-2.5 rounded-xl bg-neutral-800/60 justify-center items-center">
              <Ionicons
                name={item.icon as any}
                size={20}
                color={item.iconColor}
              />
            </View>

            <View className="flex-1 ml-4 mr-2">
              <Text
                className={`text-base font-semibold ${item.isUnread ? "text-white" : "text-gray-300"}`}
              >
                {item.title}
              </Text>
              <Text className="text-gray-400 text-sm mt-1 leading-5">
                {item.description}
              </Text>
              <Text className="text-xs text-slate-500 mt-2">{item.time}</Text>
            </View>

            {item.isUnread && (
              <View className="w-2.5 h-2.5 bg-[#E50914] rounded-full self-center" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
