import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="personalInformation" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="bookmarks" />
    </Stack>
  );
};

export default ProfileLayout;
