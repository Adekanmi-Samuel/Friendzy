# Friendzy Mobile App

This directory contains the Capacitor configuration for building native iOS and Android apps from the Friendzy web frontend.

## Prerequisites

1. Build the frontend first:
   ```bash
   cd ../frontend && npm run build
   ```

2. Install mobile dependencies:
   ```bash
   cd mobile && npm install
   ```

3. Add native platforms:
   ```bash
   npx cap add android
   npx cap add ios
   ```

4. Sync web assets:
   ```bash
   npx cap sync
   ```

## Development

### Android
```bash
npx cap run android
```
Requires Android Studio and Android SDK.

### iOS
```bash
npx cap run ios
```
Requires Xcode and macOS.

## Building for Production

### Android APK
Open Android Studio via `npx cap open android` and build from there.

### iOS App Store
Open Xcode via `npx cap open ios`, configure signing, and archive for App Store.

## Push Notifications

The app includes Capacitor Push Notifications plugin. Configure with your Firebase (Android) and APNs (iOS) credentials.

## Notes

- The app wraps the React frontend in native webviews
- All frontend features (chat, matching, safety) work natively
- Native plugins provide: haptic feedback, keyboard handling, push notifications, share sheet, status bar control
- Update `capacitor.config.ts` with your local IP for development
