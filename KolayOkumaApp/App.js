import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./contexts/Auth";
import { Router } from "./navigation/Router";
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setBackgroundColorAsync("#ffffff01");
  return (
    <AuthProvider>
      <StatusBar />
      <Router />
    </AuthProvider>
  );
}
