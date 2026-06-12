import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonalInformationScreen() {
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [phone, setPhone] = useState("+1 (555) 019-2834");

  return (
    <SafeAreaView className="flex-1 bg-[#121315]">
      <View className="px-4 py-3 flex-row items-center border-b border-[#1E2022]">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Personal Info</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-6"
      >
        <div className="items-center mb-8">
          <div className="relative">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
              }}
              className="w-24 h-24 rounded-full border-2 border-[#E50914]"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#E50914] p-2 rounded-full border border-[#121315]">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </div>
          <Text className="text-xs text-slate-400 mt-2">
            Tap icon to update image
          </Text>
        </div>

        <View className="space-y-5">
          <View>
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
              Full Name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholderTextColor="#6B7280"
              className="bg-[#1E1E1E] text-white p-4 rounded-xl text-base border border-transparent focus:border-[#E50914]"
            />
          </View>

          <View>
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#6B7280"
              className="bg-[#1E1E1E] text-white p-4 rounded-xl text-base border border-transparent focus:border-[#E50914]"
            />
          </View>

          <View>
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
              Phone Number
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#6B7280"
              className="bg-[#1E1E1E] text-white p-4 rounded-xl text-base border border-transparent focus:border-[#E50914]"
            />
          </View>
        </View>

        <TouchableOpacity className="bg-[#E50914] mt-10 py-4 rounded-xl items-center active:opacity-90 shadow-md">
          <Text className="text-white font-bold text-base">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
