import { useRouter, Stack } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext";

export default function CartScreen() {
  const { cart, totalPrice, totalItems } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: "Cart", headerShown: true }} />
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color="#ccc" strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add some products to get started
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Cart", headerShown: true }} />
      <View style={styles.container}>
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.itemCount}>{totalItems} items</Text>
            </View>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
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
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
    textAlign: "center",
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#666",
    marginBottom: 2,
  },
  itemCount: {
    fontSize: 13,
    color: "#999",
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#1a1a1a",
  },
  checkoutButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#fff",
  },
});
