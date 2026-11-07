import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Headers";
import {
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BANNERS, dummyProducts } from "@/assets/assets";
import { useRouter } from "expo-router";
import { CATEGORIES } from "@/assets/constants";
import CategoryItem from "../../../components/CategoryItem";
import { Product } from "@/assets/constants/types";
import ProductCard from "../../../components/ProductCard";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router=useRouter();

  const [activeIndex,setActiveIndex]=useState(0);
  const [products,setProducts]=useState<Product[]>([]);
  const [loading,setLoading]=useState(true)
  const categories=[{id:'all',name:'All',icon:'grid'},...CATEGORIES];

  const fetchProduct=async()=>{
    setProducts(dummyProducts);
    setLoading(false)
  }
  useEffect(()=>{
    fetchProduct();
  })
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header
        title="Welcome"
        showMenu
        showLogo
        showCart
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6">

    
        {/*    <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ height: 192 }} onScroll={(event)=>{
            const index = Math.round(
      event.nativeEvent.contentOffset.x / (width - 32)
    );
     setActiveIndex(index);
          }}
        > */}
        {/* tari2a tenyi */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ height: 192 }} onScroll={(event)=>{
            const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /event.nativeEvent.layoutMeasurement.width
    );
    if(slide !== activeIndex){
        setActiveIndex(slide);
    }
   
          }}
        >
          {BANNERS.map((banner, index) => (
            <View
              key={index}
              className="relative h-48 bg-gray-200 overflow-hidden rounded-xl"
              style={{ width: width - 32 }}
            >
              <Image
                source={{ uri: banner.image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />

                   <View className="absolute inset-0 bg-black/20" />

              <View className="absolute bottom-4 left-4 z-10">
                <Text className="text-white text-2xl font-bold">
                  {banner.title}
                </Text>

                <Text className="text-white text-sm font-medium">
                  {banner.subtitle}
                </Text>

                <TouchableOpacity className="mt-2 bg-white px-4 py-2 rounded-full self-start">
                  <Text className="text-primary font-bold text-xs">
                    Get Now
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View className="absolute inset-0 bg-black/20" /> */}
            </View>
          ))}
        </ScrollView>
        {/* pagination dots */}
      <View className="flex-row justify-center items-center mt-3">
  {BANNERS.map((_, index) => (
    <View
      key={index}
      className={`h-2 rounded-full mx-1 ${
        activeIndex === index
          ? "w-6 bg-primary"
          : "w-2 bg-gray-300"
      }`}
    />
  ))}
</View>
</View>
{/* categories */}
<View className="mb-6">
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-xl font-bold text-primary">Categories</Text>
  </View>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {categories.map((cat:any)=>(
    <CategoryItem key={cat.id} item={cat} isSelected={false}
    onPress={()=>router.push({pathname:'/shop',
      params:{category:cat.id === 'all' ? '' : cat.name}
    })}/>
    ))}
  </ScrollView>
</View>
{/*Popular  Products */}
<View className="mb-8">
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-xl font-bold text-primary">Popular</Text>
  <TouchableOpacity onPress={()=>router.push('/shop')}>
      <Text className="text-sm text-secondary">See All</Text>
  </TouchableOpacity>

  </View>
{loading ? (
  <ActivityIndicator size="large" />
) : (
  <View className="flex-row flex-wrap justify-between">
    {products.slice(0,4).map((product) => (
      <ProductCard key={product._id}
      product={product} />
      // <Text key={product._id} >{product.name}</Text>
    ))}
  </View>
)}

</View>

<View className="bg-gray-100 p-6 rounded-2xl mb-20 items-center">
  <Text className="text-2xl font-bold text-primary mb-2 text-center">
    {/* join the Revolution */}
     Elevate Your Everyday Style
  </Text>
  
  <Text className="text-secondary text-center mb-4">
    Subscribe to our news letter and get 10% off your first purchase.
  </Text>
  <TouchableOpacity className="bg-primary w-4/5 py-3 rounded-full items-center">
    <Text className="text-white font-medium text-base">Subscribe Now</Text>
  </TouchableOpacity>

</View>
      </ScrollView>
    </SafeAreaView>
  );
}

// import React from "react";
// import {
// View,
// Text,
// TouchableOpacity,
// Image,
// StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// export default function HomeScreen() {
// const router = useRouter();

// return (
// <SafeAreaView >
//   {/* <View className="h-[60px] w-full flex-row items-center
//    justify-between px-4 bg-white border-b border-[#eee]"
// > */}

//   {/* APP BAR */}
//     <View  className="h-[60px] w-full flex-row items-center justify-between px-4 bg-white border-b border-b-[#eee]">
//   {/* <View className="h-52" style={styles.appBar}> */}

//     {/* MENU */}
//     {/* <TouchableOpacity className="h-[px] w-[px]"> */}
// <TouchableOpacity className="w-[40px] h-[40px] items-center justify-center">
//       <Ionicons
//         name="menu-outline"
//         size={30}
//         color="black"
//       />
//     </TouchableOpacity>

//     {/* LOGO */}
//     <Image
//       source={require("@/assets/logo.png")}
//       className="w-[120px] h-[45px]"
//       // style={styles.logo}
//       resizeMode="contain"
//     />

//     {/* CART */}
//     <TouchableOpacity className="w-[40px] h-[40px] items-center justify-center"
//       // style={styles.sideButton}
//       onPress={() => router.push("/cart")}
//     >
//       <Ionicons
//         name="cart-outline"
//         size={28}
//         color="black"
//       />
//     </TouchableOpacity>

//   </View>

//   {/* CONTENT */}
//   {/* <View style={styles.content}>  */}
//   <View className="flex-1 items-center justify-center">
//     <Text className="text-[30px]">HOME</Text>
//   </View>

// </SafeAreaView>


// );
// }

// const styles = StyleSheet.create({
// safeArea: {
// flex: 1,
// backgroundColor: "#fff",
// },

// appBar: {
// // height: 100,
// width: "100%",
// flexDirection: "row",
// alignItems: "center",
// justifyContent: "space-between",
// paddingHorizontal: 16,
// backgroundColor: "#fff",
// borderBottomWidth: 1,
// borderBottomColor: "#eee",
// },

// sideButton: {
// width: 40,
// height: 40,
// alignItems: "center",
// justifyContent: "center",
// },

// logo: {
// width: 120,
// height: 45,
// },

// content: {
// flex: 1,
// alignItems: "center",
// justifyContent: "center",
// },

// text: {
// fontSize: 30,
// },
// });