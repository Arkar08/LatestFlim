import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthAction = async () => {
    if (isSignIn) {
      console.log("Authenticating login:", { email, password });
      if (!email || !password) {
        Alert.alert("⚠️ Please enter your email and password");
      } else {
        await SecureStore.setItemAsync("isAuthenticated", "true");
        router.replace("/tabs/home");
      }
    } else {
      console.log("Registering user profile:", { name, email, password });
      if (!email || !password || !name) {
        Alert.alert("⚠️ Please fill out all name and credential fields");
      } else {
        await SecureStore.setItemAsync("isAuthenticated", "true");
        router.replace("/tabs/home");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950 relative">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          className="px-6 py-8"
        >
          <View className="items-center mb-10">
            <Text className="text-4xl font-extrabold tracking-widest text-white">
              Latest<Text className="text-rose-600">Film</Text>
            </Text>
            <Text className="text-sm text-slate-400 mt-2 text-center tracking-wide">
              {isSignIn
                ? "Welcome back, stream unlimited movies."
                : "Create an account to start your trial."}
            </Text>
          </View>

          <View className="space-y-5">
            {!isSignIn && (
              <View className="space-y-2">
                <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Full Name
                </Text>
                <TextInput
                  className="mt-2 w-full bg-slate-900 text-white rounded-xl px-4 py-3.5 text-base border border-slate-800 focus:border-rose-600"
                  placeholder="Enter your name"
                  placeholderTextColor="#64748b"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}

            <View className="space-y-2">
              <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-4">
                Email Address
              </Text>
              <TextInput
                className="mt-2 w-full bg-slate-900 text-white rounded-xl px-4 py-3.5 text-base border border-slate-800 focus:border-rose-600"
                placeholder="you@example.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="space-y-2">
              <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-4">
                Password
              </Text>
              <View className="mt-2 flex-row items-center w-full bg-slate-900 rounded-xl border border-slate-800 pr-4 focus-within:border-rose-600">
                <TextInput
                  className="flex-1 text-white px-4 py-3.5 text-base"
                  placeholder="••••••••"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text className="text-xs font-bold text-slate-400">
                    {showPassword ? "HIDE" : "SHOW"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row justify-end items-center mt-4">
              {isSignIn && (
                <TouchableOpacity>
                  <Text className="text-xs text-rose-500 font-semibold">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="w-full bg-rose-600 rounded-xl py-4 items-center justify-center mt-6 shadow-lg shadow-rose-600/30"
              onPress={handleAuthAction}
            >
              <Text className="text-white text-base font-bold tracking-wide">
                {isSignIn ? "Sign In" : "Create Free Account"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[1px] bg-slate-800" />
            <Text className="text-2xs font-bold text-slate-500 px-4 tracking-widest">
              OR CONTINUE WITH
            </Text>
            <View className="flex-1 h-[1px] bg-slate-800" />
          </View>

          <View className="flex-row justify-between mb-8">
            <TouchableOpacity className="w-[47%] flex-row items-center justify-center bg-slate-900 border border-slate-800 rounded-xl py-3.5">
              <Text className="text-white font-semibold text-sm">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[47%] flex-row items-center justify-center bg-slate-900 border border-slate-800 rounded-xl py-3.5">
              <Text className="text-white font-semibold text-sm">Apple</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center mt-2">
            <Text className="text-slate-400 text-sm">
              {isSignIn ? "New to CineStream? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
              <Text className="text-rose-500 font-bold text-sm underline">
                {isSignIn ? "Sign Up Now" : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
