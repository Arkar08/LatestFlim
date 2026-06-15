import { Host, Spacer, TabView, Text, VStack } from "@expo/ui/swift-ui";
import {
  background,
  font,
  foregroundStyle,
  frame,
  tabViewStyle,
} from "@expo/ui/swift-ui/modifiers";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const fillFrame = frame({ maxWidth: Infinity, maxHeight: Infinity });
const pageFrame = frame({ maxWidth: Infinity, maxHeight: Infinity });

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === "ios") {
    return (
      <Host style={{ flex: 1 }}>
        <TabView
          defaultSelection="home"
          modifiers={[pageFrame, tabViewStyle({ type: "automatic" })]}
        >
          <TabView.Tab value="home" label="Home" systemImage="house.fill">
            <Page label="Home" color="#121212" />
          </TabView.Tab>
          <TabView.Tab
            value="search"
            label="Search"
            systemImage="magnifyingglass"
          >
            <Page label="Search" color="#121212" />
          </TabView.Tab>
          <TabView.Tab
            value="wishlist"
            label="Wishlist"
            systemImage="heart.fill"
          >
            <Page label="Wishlist" color="#121212" />
          </TabView.Tab>
          <TabView.Tab
            value="profile"
            label="Profile"
            systemImage="person.fill"
          >
            <Page label="Profile" color="#121212" />
          </TabView.Tab>
        </TabView>
      </Host>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E50914",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
          height: 54 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

function Page({ label, color }: { label: string; color: string }) {
  return (
    <VStack alignment="center" modifiers={[fillFrame, background(color)]}>
      <Spacer />
      <Text
        modifiers={[
          font({ size: 28, weight: "bold" }),
          foregroundStyle("#FFFFFF"),
        ]}
      >
        {label}
      </Text>
      <Spacer />
    </VStack>
  );
}

export default TabLayout;
