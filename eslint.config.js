// https://docs.expo.dev/guides/using-eslint/
import expoConfig from "eslint-config-expo/flat.js"; // <-- Added .js here
import { defineConfig } from "eslint/config";

// Use 'export default' instead of 'module.exports'
export default defineConfig([
  ...expoConfig, // Spread this because expoConfig is an array of objects
  {
    ignores: ["dist/*"],
  },
]);
