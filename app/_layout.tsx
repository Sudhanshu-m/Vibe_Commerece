import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          presentation: "card",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          presentation: "card",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          presentation: "card",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="receipt"
        options={{
          presentation: "card",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <GestureHandlerRootView>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
