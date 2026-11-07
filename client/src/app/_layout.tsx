import { Stack } from 'expo-router';
import '../../global.css';
import { CartProvider } from '../../context/cartContext';
import { WishlistProvider } from '../../context/washlistContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';
import { ClerkProvider } from '@clerk/clerk-expo';
// import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
   <ClerkProvider tokenCache={tokenCache}>
   <CartProvider>
    <WishlistProvider>
        <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="product/[id]" />
            </Stack>

       {/* <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" />
    </Stack> */}
    <Toast  />
    </WishlistProvider>
   </CartProvider>
   </ClerkProvider>
   </GestureHandlerRootView>
  );
}
// import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useColorScheme } from 'react-native';

// import { AnimatedSplashOverlay } from '@/components/animated-icon';
// import AppTabs from '@/components/app-tabs';

// SplashScreen.preventAutoHideAsync();

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <AnimatedSplashOverlay />
//       <AppTabs />
//     </ThemeProvider>
//   );
// }
