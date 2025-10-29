import { Tabs } from "expo-router";
import { Home, ShoppingCart, UserCircle } from "lucide-react-native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCart } from "@/contexts/CartContext";

function CartIconWithBadge({ color }: { color: string }) {
  const { totalItems } = useCart();

  return (
    <View>
      <ShoppingCart size={24} color={color} strokeWidth={2} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1a1a1a",
        tabBarInactiveTintColor: "#999",
        headerShown: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => <Home size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <CartIconWithBadge color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserCircle size={24} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700" as const,
  },
});
