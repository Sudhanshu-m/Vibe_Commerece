import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Stack } from "expo-router";
import ProductItem from "@/components/ProductItem";
import { mockProducts } from "@/constants/products";

export default function ShopScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Vibe Commerce", headerShown: true }} />
      <View style={styles.container}>
        <FlatList
          data={mockProducts}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  listContent: {
    padding: 8,
  },
});
