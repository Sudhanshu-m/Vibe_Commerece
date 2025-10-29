import { useRouter, Stack } from "expo-router";
import { CreditCard, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/databases/db";

export default function CheckoutScreen() {
  const { cart, totalPrice, dispatch } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      Alert.alert("Login Required", "Please login to complete your purchase");
      router.push("/login");
      return;
    }

    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    try {
      const timestamp = new Date().toLocaleString();
      
      const order = await createOrder(
        user.id,
        totalPrice,
        JSON.stringify(cart),
        name.trim(),
        email.trim(),
        timestamp
      );

      console.log("Order created:", order);

      const receipt = {
        cartItems: [...cart],
        total: totalPrice,
        timestamp,
        customerName: name,
        customerEmail: email,
      };

      dispatch({ type: "CLEAR_CART" });

      setTimeout(() => {
        router.replace({
          pathname: "/receipt",
          params: {
            receipt: JSON.stringify(receipt),
          },
        });
      }, 500);
    } catch (error) {
      console.error("Checkout error:", error);
      Alert.alert("Error", "Failed to complete purchase. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Checkout", presentation: "card", headerShown: true }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryCard}>
              {cart.map((item) => (
                <View key={item.id} style={styles.summaryItem}>
                  <Text style={styles.summaryItemName} numberOfLines={1}>
                    {item.name} × {item.quantity}
                  </Text>
                  <Text style={styles.summaryItemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View style={styles.divider} />
              <View style={styles.summaryItem}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Information</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#666" strokeWidth={2} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#666" strokeWidth={2} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.checkoutButton,
              (!name.trim() || !email.trim() || isProcessing) &&
                styles.checkoutButtonDisabled,
            ]}
            onPress={handleCheckout}
            disabled={!name.trim() || !email.trim() || isProcessing}
            activeOpacity={0.8}
          >
            <CreditCard size={20} color="#fff" strokeWidth={2} />
            <Text style={styles.checkoutButtonText}>
              {isProcessing ? "Processing..." : "Complete Purchase"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryItemName: {
    flex: 1,
    fontSize: 15,
    color: "#666",
    marginRight: 12,
  },
  summaryItemPrice: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1a1a1a",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1a1a1a",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1a1a1a",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 12,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginTop: 8,
  },
  checkoutButtonDisabled: {
    opacity: 0.5,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#fff",
  },
});
