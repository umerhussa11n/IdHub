/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

export const firebaseConfig = {
  apiKey: "AIzaSyAU0qS1Hoi4Ok9Q93a8uFxueSAWrr2r_uc",
  authDomain: "test-5d5bf.firebaseapp.com",
  databaseURL: "https://test-5d5bf.firebaseio.com",
  projectId: "test-5d5bf",
  storageBucket: "test-5d5bf.appspot.com",
  messagingSenderId: "300463161675",
  appId: "1:300463161675:web:e613e133711a35036f68ce",
  measurementId: "G-1DBK2RXV2X"
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = true;
export const defaultColor = "light.purple";
export const defaultDirection = "ltr";
export const isDarkSwitchActive = true;
export const themeColorStorageKey = "__theme_color";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = false;
