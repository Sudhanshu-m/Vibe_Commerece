
# Welcome to Your Mobile App

## Project Overview

This is a native cross-platform mobile application built using **React Native** and **Expo**.  
It supports **iOS**, **Android**, and **Web** platforms seamlessly.

**Framework:** Expo Router + React Native  
**Language:** TypeScript

---

## How to Edit and Run the Project

You can develop and modify this app locally using your preferred code editor.

### **Setup Instructions**

Make sure you have **Node.js** and **Bun** installed on your system.

#### Steps:

```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project folder
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
bun install

# Step 4: Run the app on web
bun run start-web

# Step 5: Run the app on iOS or Android
bun run start  # Then press 'i' or 'a' to open iOS or Android emulator
```

---

## Technology Stack

This project is built using modern and production-grade technologies:

- **React Native** – Cross-platform mobile framework by Meta
- **Expo** – Development and build framework for React Native
- **Expo Router** – File-based navigation for React Native
- **TypeScript** – Type-safe JavaScript for better maintainability
- **React Query** – For efficient server-state management
- **Lucide React Native** – Icon library for consistent design

---

## Testing the App

### **Run on Your Device**

1. **iOS:** Use Expo Go app from the App Store.  
2. **Android:** Use Expo Go from Google Play Store.  
3. Run the app and scan the QR code displayed in the terminal.

### **Run in Browser**

```bash
bun run start-web
```
> Note: Browser testing is best for quick previews but may not support native APIs.

### **Using Emulator or Simulator**

```bash
# For iOS (requires Xcode)
bun run start -- --ios

# For Android (requires Android Studio)
bun run start -- --android
```

---

## Deployment

### **iOS (App Store)**

```bash
bun i -g @expo/eas-cli
eas build:configure
eas build --platform ios
eas submit --platform ios
```

### **Android (Google Play)**

```bash
eas build --platform android
eas submit --platform android
```

### **Web Deployment**

You can deploy the app as a website using:

- **Vercel** – Automatic GitHub deployments
- **Netlify** – Continuous web deployment
- **EAS Hosting** – Expo’s hosting service

---

## Project Structure

```
├── app/                     # Screens and navigation
│   ├── (tabs)/              # Tab navigation screens
│   ├── _layout.tsx          # Root layout
│   ├── modal.tsx            # Example modal screen
│   └── +not-found.tsx       # 404 screen
├── assets/                  # Images and static assets
├── constants/               # Configuration and constants
├── app.json                 # Expo app configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

---

## Advanced Development

### **Custom Development Builds**

Required for features like:
- Face ID / Touch ID
- In-app purchases
- Push notifications
- Native modules or background tasks

```bash
bun i -g @expo/eas-cli
eas build:configure
eas build --profile development --platform ios
eas build --profile development --platform android
bun start --dev-client
```

---

## Integration Options

### **Database Integration**
- **Supabase** – PostgreSQL-based backend with real-time support
- **Firebase** – Realtime database and authentication
- **Custom API** – Connect to your own backend service

### **Authentication**
- **Expo AuthSession** – OAuth-based login (Google, Apple, Facebook)
- **Supabase Auth** – Email/password + social logins
- **Firebase Auth** – Robust authentication system

### **Push Notifications**
- **Expo Notifications**
- **Firebase Cloud Messaging (FCM)**

### **Payments & Subscriptions**
- **Stripe** – Web payments and subscriptions
- **RevenueCat** – In-app subscriptions (requires custom build)
- **PayPal** – Mobile payments integration

---

## Troubleshooting

### **Common Issues**
1. Ensure phone and computer are on the same WiFi network.  
2. Try running in tunnel mode:
   ```bash
   bun start -- --tunnel
   ```
3. Clear cache if build fails:
   ```bash
   bunx expo start --clear
   ```
4. Reinstall dependencies if needed:
   ```bash
   rm -rf node_modules && bun install
   ```

---

## About the Project

This project demonstrates a fully native cross-platform app architecture using React Native and Expo.  
It’s optimized for production and ready for App Store, Google Play, and web deployment.

## Screenshots

![WhatsApp Image 2025-10-29 at 19 26 43_416e4986](https://github.com/user-attachments/assets/435535c6-316c-4e30-aca8-4f597a6a4e9f)

![WhatsApp Image 2025-10-29 at 19 26 43_936bf041](https://github.com/user-attachments/assets/67dcf730-64cb-497d-9e4e-c3beca8bc594)

![WhatsApp Image 2025-10-29 at 19 26 42_1f75a491](https://github.com/user-attachments/assets/9c5fd0fd-381b-4659-b022-afb52c6dea73)

![WhatsApp Image 2025-10-29 at 19 26 42_85bbf7c9](https://github.com/user-attachments/assets/40895eeb-66d8-4b6d-8fa6-3cbeda231f30)

![WhatsApp Image 2025-10-29 at 19 26 42_db987982](https://github.com/user-attachments/assets/86e7c472-ea51-4b76-8eb7-1990fd9491dd)

![WhatsApp Image 2025-10-29 at 19 26 41_2a77264e](https://github.com/user-attachments/assets/6e06bd24-1398-4a90-b6d8-cebd98cf6ae3)

![WhatsApp Image 2025-10-29 at 19 26 41_fd62440c](https://github.com/user-attachments/assets/379bcc85-517c-4b0a-b83a-b9417e818065)

