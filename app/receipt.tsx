import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const receipt = params.receipt ? JSON.parse(params.receipt as string) : null;

  if (!receipt) {
    return null;
  }

  const handleClose = () => {
    router.replace("/(tabs)/shop");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Order Complete",
          headerLeft: () => null,
          gestureEnabled: false,
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <CheckCircle2 size={64} color="#34c759" strokeWidth={2} />
            </View>
            <Text style={styles.title}>Order Successful!</Text>
            <Text style={styles.subtitle}>
              Thank you for your purchase, {receipt.customerName}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Order Date</Text>
              <Text style={styles.value}>{receipt.timestamp}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{receipt.customerEmail}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Items</Text>
            {receipt.cartItems.map((item: any) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name} × {item.quantity}
                </Text>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.itemRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${receipt.total.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: "#666",
  },
  value: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1a1a1a",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: "#666",
    marginRight: 12,
  },
  itemPrice: {
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
  closeButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#fff",
  },
});
