import { Href, Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const value = await SecureStore.getItemAsync("isAuthenticated");
        setIsAuthenticated(value === "true");
      } catch (error) {
        console.error("Storage error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);
  if (isAuthenticated === null) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <ActivityIndicator size="large" color="#e11d48" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Redirect href="/tabs/home" />
  ) : (
    <Redirect href={"/(auth)/signIn" as Href} />
  );
}
