import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createUser, getUserByEmail, verifyUser, type User } from "@/databases/db";

const AUTH_STORAGE_KEY = "@vibe_commerce_user";

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["auth"],
    queryFn: async (): Promise<User | null> => {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;
      
      const userData = JSON.parse(stored);
      const dbUser = await getUserByEmail(userData.email);
      return dbUser;
    },
  });

  useEffect(() => {
    if (userQuery.data !== undefined) {
      setUser(userQuery.data);
    }
  }, [userQuery.data]);

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      console.log("Attempting login for:", email);
      const authenticatedUser = await verifyUser(email, password);
      
      if (!authenticatedUser) {
        throw new Error("Invalid email or password");
      }
      
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(authenticatedUser)
      );
      
      return authenticatedUser;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data.email);
      setUser(data);
      queryClient.setQueryData(["auth"], data);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      console.log("Attempting signup for:", email);
      const existingUser = await getUserByEmail(email);
      
      if (existingUser) {
        throw new Error("Email already exists");
      }
      
      const newUser = await createUser(email, password, name);
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      
      return newUser;
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data.email);
      setUser(data);
      queryClient.setQueryData(["auth"], data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      console.log("Logging out");
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    },
    onSuccess: () => {
      console.log("Logout successful");
      setUser(null);
      queryClient.setQueryData(["auth"], null);
    },
  });

  const { mutateAsync: loginAsync } = loginMutation;
  const { mutateAsync: signupAsync } = signupMutation;
  const { mutateAsync: logoutAsync } = logoutMutation;

  const login = useCallback(
    (email: string, password: string) => {
      return loginAsync({ email, password });
    },
    [loginAsync]
  );

  const signup = useCallback(
    (email: string, password: string, name: string) => {
      return signupAsync({ email, password, name });
    },
    [signupAsync]
  );

  const logout = useCallback(() => {
    return logoutAsync();
  }, [logoutAsync]);

  return useMemo(
    () => ({
      user,
      isLoading: userQuery.isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      loginError: loginMutation.error?.message,
      signupError: signupMutation.error?.message,
      isLoggingIn: loginMutation.isPending,
      isSigningUp: signupMutation.isPending,
    }),
    [
      user,
      userQuery.isLoading,
      login,
      signup,
      logout,
      loginMutation.error?.message,
      signupMutation.error?.message,
      loginMutation.isPending,
      signupMutation.isPending,
    ]
  );
});
