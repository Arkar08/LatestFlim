import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [downloadWifi, setDownloadWifi] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#121315]">
      <View className="px-4 py-3 flex-row items-center border-b border-[#1E2022]">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-6"
      >
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-2">
          Preferences
        </Text>
        <View className="bg-[#1E1E1E] rounded-2xl overflow-hidden mb-6">
          <View className="flex-row items-center justify-between p-4 border-b border-neutral-800">
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={20} color="white" />
              <Text className="text-white text-base font-medium ml-3">
                Push Notifications
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#3E3E3E", true: "#E50914" }}
              thumbColor="white"
            />
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-neutral-800">
            <View className="flex-row items-center">
              <Ionicons name="wifi-outline" size={20} color="white" />
              <Text className="text-white text-base font-medium ml-3">
                Downloads on Wi-Fi only
              </Text>
            </View>
            <Switch
              value={downloadWifi}
              onValueChange={setDownloadWifi}
              trackColor={{ false: "#3E3E3E", true: "#E50914" }}
              thumbColor="white"
            />
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Ionicons name="moon-outline" size={20} color="white" />
              <Text className="text-white text-base font-medium ml-3">
                Dark Mode Always
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#3E3E3E", true: "#E50914" }}
              thumbColor="white"
            />
          </View>
        </View>

        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-2">
          Legal & Support
        </Text>
        <View className="bg-[#1E1E1E] rounded-2xl overflow-hidden mb-6">
          <SettingRowItem
            title="Terms of Service"
            icon="document-text-outline"
          />
          <SettingRowItem title="Privacy Policy" icon="lock-closed-outline" />
          <SettingRowItem
            title="Help Support Center"
            icon="help-circle-outline"
            isLast
          />
        </View>

        <Text className="text-xs font-bold text-red-500/80 uppercase tracking-wider mb-3 pl-2">
          Danger Zone
        </Text>
        <View className="bg-[#1E1E1E] rounded-2xl overflow-hidden mb-12">
          <TouchableOpacity className="flex-row items-center p-4 active:bg-red-950/20">
            <Ionicons name="trash-bin-outline" size={20} color="#EF4444" />
            <Text className="text-red-500 text-base font-semibold ml-3">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Inner Functional Helper Row Component
function SettingRowItem({
  title,
  icon,
  isLast = false,
}: {
  title: string;
  icon: string;
  isLast?: boolean;
}) {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-4 active:bg-neutral-800/40 ${!isLast ? "border-b border-neutral-800" : ""}`}
    >
      <View className="flex-row items-center">
        <Ionicons name={icon as any} size={20} color="white" />
        <Text className="text-white text-base font-medium ml-3">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#838383" />
    </TouchableOpacity>
  );
}
