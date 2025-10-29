import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useReducer, useRef, useCallback } from "react";
import type { Product } from "@/constants/products";

export interface CartItem extends Product {
  quantity: number;
}

type CartState = CartItem[];

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
    case "CLEAR_CART":
      return [];
    case "SET_CART":
      return action.payload;
    default:
      return state;
  }
}

const CART_STORAGE_KEY = "@vibe_commerce_cart";

export const [CartProvider, useCart] = createContextHook(() => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartItem[]> => {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (cartData: CartItem[]) => {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      return cartData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
    },
  });
  
  const { mutate: saveToStorage } = saveMutation;

  useEffect(() => {
    if (cartQuery.data) {
      dispatch({ type: "SET_CART", payload: cartQuery.data });
    }
  }, [cartQuery.data]);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveCart = useCallback((cartData: CartItem[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveToStorage(cartData);
    }, 100);
  }, [saveToStorage]);

  useEffect(() => {
    if (!cartQuery.isLoading && cart.length >= 0) {
      saveCart(cart);
    }
  }, [cart, cartQuery.isLoading, saveCart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return useMemo(
    () => ({
      cart,
      dispatch,
      totalItems,
      totalPrice,
      isLoading: cartQuery.isLoading,
    }),
    [cart, totalItems, totalPrice, cartQuery.isLoading]
  );
});
