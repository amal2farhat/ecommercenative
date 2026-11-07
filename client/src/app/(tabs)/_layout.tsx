import { Tabs } from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons"
import {COLORS} from '@/assets/constants';
import Header from "../../../components/Headers";
import { useCart } from "../../../context/cartContext";
import { View } from "react-native";
// import Header from "@/components/headers";


export default function TabsLayout() {
  const {cartItems}=useCart()
  return (
    <Tabs
     screenOptions={{
      headerShown:true,
      tabBarActiveTintColor:COLORS.primary,
      tabBarInactiveTintColor:'#7272f6',
      tabBarShowLabel:false,
      tabBarStyle:{

        backgroundColor:'#fff',borderTopWidth:1,
        borderTopColor:'#F0F0F0',height:100,paddingTop:8
      }
    }}
    >
      {/* <Tabs.Screen
  name="index"
  options={{
    title: "Home",

    headerTitle: () => (
      <Header
        showMenu
        showLogo
      />
    ),

    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={26}
        color={color}
      />
    ),
  }}
/> */}
<Tabs.Screen
  name="index"
  options={{
    headerShown: false,
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={26}
        color={color}
      />
    ),
  }}
/>
      {/* <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon:({color,focused})=><Ionicons  
          name={focused ? 'home' : 'home-outline' } size={26} color={color}/>
        }}
      /> */}
            <Tabs.Screen
        name="cart"
        options={{
          title: "cart",
           headerShown:false,
          tabBarIcon:({color,focused})=>
        <View className="relative">
            <Feather  
          name={focused ? 'shopping-cart' : 'shopping-cart' } size={26} color={color}/>
          {cartItems?.length >0 && 
          
          <View className="absolute -top-2 -right-2 bg-accent size-3 rounded-full items-center justify-center">
            <Ionicons name="ellipse" size={6} color='white'/>
          </View>
          }
        </View>
        }}
      />

      {/* <Tabs.Screen
  name="favorites"
  options={{
    title: 'Favorites',
    headerShown: false,
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? 'heart' : 'heart-outline'}
        size={26}
        color={color}
      />
    ),
  }}
/> */}

      <Tabs.Screen
        name="favorites"
        options={{
          title: "favorites",
          headerShown:false,

          tabBarIcon:({color,focused})=><Ionicons  
          name={focused ? 'heart' : 'heart-outline' } size={26} color={color}/>
        }}
      />
            <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
           headerShown:false,
           tabBarIcon:({color,focused})=><Ionicons  
          name={focused ? 'person' : 'person-outline' } size={26} color={color}/>
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
           headerShown:false,
        }}
      />
           <Tabs.Screen
        name="signin"
        options={{
          href: null,
           headerShown:false,
        }}
      />
    </Tabs>
  );
}
