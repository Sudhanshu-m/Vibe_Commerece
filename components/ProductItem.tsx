import { Image } from "expo-image";
import { Plus } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import type { Product } from "@/constants/products";
import { useCart } from "@/contexts/CartContext";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { dispatch } = useCart();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
        <View style={styles.content}>
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
              activeOpacity={0.7}
            >
              <Plus size={18} color="#fff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 11,
    fontWeight: "600" as const,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1a1a1a",
  },
  addButton: {
    backgroundColor: "#1a1a1a",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
