import { Image } from "expo-image";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import type { CartItem as CartItemType } from "../contexts/CartContext";
import { useCart } from "../contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const handleIncrease = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: item.id, quantity: item.quantity - 1 },
      });
    }
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.controls}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrease}
              activeOpacity={0.7}
            >
              <Minus size={16} color="#1a1a1a" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}
              activeOpacity={0.7}
            >
              <Plus size={16} color="#1a1a1a" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemove}
            activeOpacity={0.7}
          >
            <Trash2 size={18} color="#ff3b30" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 8,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1a1a1a",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    padding: 8,
  },
});
