import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Application from "expo-application";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    role: "Premium Member",
    joined: "Joined Jan 2024",
  };

  const appVersion = Application.nativeApplicationVersion || "1.0.0";
  const buildVersion = Application.nativeBuildVersion || 1;

  const personalClick = () => {
    router.push("/tabs/profile/personalInformation");
  };

  const bookmarksClick = () => {
    router.push("/tabs/profile/bookmarks");
  };

  const notiClick = () => {
    router.push("/tabs/profile/notification");
  };

  const settingClick = () => {
    router.push("/tabs/profile/settings");
  };
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("isAuthenticated");

      router.replace("/(auth)/signIn");
    } catch (error) {
      console.error("Failed to delete authentication key:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121315]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="items-center px-6 pt-8 pb-6 bg-[#121315] border-b border-[#360507]">
          <View className="relative">
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full border-4 border-[#E50914]"
            />
            <View className="absolute bottom-0 right-0 bg-[#E50914] p-1.5 rounded-full border-2 border-white ">
              <Feather name="award" size={14} color="white" />
            </View>
          </View>

          <Text className="text-xl font-bold text-[#ffffff] mt-4">
            {user.name}
          </Text>
          <Text className="text-sm text-[#ffffff] mt-1">{user.email}</Text>

          <View className="bg-[#ffffff] px-3 py-1 rounded-full mt-3">
            <Text className="text-xs font-semibold text-[#E50914]">
              {user.role}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-around bg-[#1E1E1E]  py-4 border-b border-[#360507]">
          <View className="items-center">
            <Text className="text-lg font-bold text-white">12</Text>
            <Text className="text-xs text-slate-400 mt-0.5">
              Favorite Movies
            </Text>
          </View>
          <View className="w-[1px] bg-[#1E1E1E] h-8 self-center" />
          <View className="items-center">
            <Text className="text-lg font-bold text-white">1.2k</Text>
            <Text className="text-xs text-slate-400 mt-0.5">
              BookMark Movies
            </Text>
          </View>
          <View className="w-[1px] bg-[#1E1E1E] h-8 self-center" />
          <View className="items-center">
            <Text className="text-lg font-bold text-white">4.8</Text>
            <Text className="text-xs text-slate-400 mt-0.5">Rating</Text>
          </View>
        </View>

        <View className="mt-6 px-4">
          <Text className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 pl-2">
            Account Settings
          </Text>

          <View className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm shadow-slate-100 dark:shadow-none">
            <ProfileMenuItem
              icon={<Ionicons name="person" size={20} color="blue" />}
              title="Personal Information"
              click={personalClick}
            />
            <ProfileMenuItem
              icon={<Ionicons name="bookmark" size={20} color="yellow" />}
              title="BookMark"
              click={bookmarksClick}
            />
            <ProfileMenuItem
              icon={<Ionicons name="notifications" size={20} color="#ffffff" />}
              title="Notifications"
              click={notiClick}
            />
            <ProfileMenuItem
              icon={<Ionicons name="settings" size={20} color="#838383" />}
              title="Settings"
              click={settingClick}
              isLast
            />
          </View>
        </View>

        <View className="mt-6 mb-12 px-4">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-red-50 active:bg-red-100 py-4 rounded-2xl border border-red-100"
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="#E50914" />
            <Text className="ml-2 text-base font-semibold text-[#E50914]">
              Log Out
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-xs text-slate-400 mt-4">
            Version {appVersion}({buildVersion}) • {user.joined}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  tag?: string;
  isLast?: boolean;
  click: () => void;
}

function ProfileMenuItem({
  icon,
  title,
  tag,
  isLast = false,
  click,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-700/50 ${
        !isLast ? "border-b border-slate-50 dark:border-slate-700/50" : ""
      }`}
      onPress={() => click()}
    >
      <View className="flex-row items-center space-x-3">
        {icon}
        <Text className=" ml-2 text-base font-medium text-white">{title}</Text>
      </View>

      <View className="flex-row items-center space-x-1">
        {tag && (
          <Text className="text-xs text-slate-400 dark:text-slate-500 mr-1 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
            {tag}
          </Text>
        )}
        <Ionicons name="chevron-forward-outline" size={24} color="#838383" />
      </View>
    </TouchableOpacity>
  );
}
