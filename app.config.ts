import { ConfigContext, ExpoConfig } from "expo/config";
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";
const IS_UAT = process.env.APP_VARIANT === "uat";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.arkar08.LatestFlim.dev";
  }

  if (IS_PREVIEW) {
    return "com.arkar08.LatestFlim.preview";
  }
  if (IS_UAT) {
    return "com.arkar08.LatestFlim.uat";
  }
  return "com.arkar08.LatestFlim";
};

const getAppName = () => {
  if (IS_DEV) {
    return "LatestFlim (Dev)";
  }

  if (IS_PREVIEW) {
    return "LatestFlim (Preview)";
  }
  if (IS_UAT) {
    return "LatestFlim (UAT)";
  }
  return "LatestFlim";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "LatestFlim",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/favicon-icon.png",
  scheme: "latest-flim",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    buildNumber: "1",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0A0A0A",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
    versionCode: 1,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon-icon.png",
    bundler: "metro",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/latest-splash-logo.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-secure-store",
    "expo-font",
    "expo-image",
    "expo-web-browser",
    "expo-status-bar",
  ],
  updates: {
    url: "https://u.expo.dev/47c944ca-6dda-452e-8a46-90c37497da7a",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "47c944ca-6dda-452e-8a46-90c37497da7a",
    },
  },
  owner: "arkar08",
});
