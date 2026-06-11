import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="topRated" />
      <Stack.Screen name="upComing" />
      <Stack.Screen name="popular" />
    </Stack>
  );
};

export default HomeLayout;
