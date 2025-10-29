import { useRouter, Stack } from "expo-router";
import { LogOut, Package, ShoppingBag } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getOrdersByUserId, type Order } from "@/databases/db";
import type { CartItem } from "@/contexts/CartContext";

interface OrderItemProps {
  order: Order;
}

function OrderItem({ order }: OrderItemProps) {
  const items: CartItem[] = JSON.parse(order.items);
  const orderDate = new Date(order.timestamp);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderDate}>{formattedDate}</Text>
          <Text style={styles.orderId}>Order #{order.id}</Text>
        </View>
        <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
      </View>
      <View style={styles.orderItems}>
        {items.map((item, index) => (
          <Text key={index} style={styles.orderItemText} numberOfLines={1}>
            {item.name} × {item.quantity}
          </Text>
        ))}
      </View>
      <View style={styles.orderFooter}>
        <Package size={14} color="#999" strokeWidth={2} />
        <Text style={styles.orderItemCount}>
          {items.length} {items.length === 1 ? "item" : "items"}
        </Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const userId = user?.id;

  const ordersQuery = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) return [];
      return await getOrdersByUserId(userId);
    },
    enabled: !!userId,
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  if (!isAuthenticated || !user) {
    return (
      <>
        <Stack.Screen options={{ title: "Profile", headerShown: true }} />
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color="#ccc" strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>Not logged in</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Profile", headerShown: true }} />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut size={18} color="#fff" strokeWidth={2} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Order History</Text>

          {ordersQuery.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1a1a1a" />
            </View>
          ) : ordersQuery.data && ordersQuery.data.length > 0 ? (
            <FlatList
              data={ordersQuery.data}
              renderItem={({ item }) => <OrderItem order={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.ordersList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyOrders}>
              <Package size={48} color="#ccc" strokeWidth={1.5} />
              <Text style={styles.emptyOrdersText}>No orders yet</Text>
              <Text style={styles.emptyOrdersSubtext}>
                Start shopping to see your orders here
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    padding: 32,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginTop: 16,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#fff",
  },
  profileHeader: {
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#fff",
  },
  ordersSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
  },
  ordersList: {
    paddingBottom: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1a1a1a",
    marginBottom: 2,
  },
  orderId: {
    fontSize: 13,
    color: "#999",
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1a1a1a",
  },
  orderItems: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  orderItemText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  orderItemCount: {
    fontSize: 13,
    color: "#999",
  },
  emptyOrders: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 64,
  },
  emptyOrdersText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#1a1a1a",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyOrdersSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
