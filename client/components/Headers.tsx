import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { HeaderProps } from "@/assets/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/constants";
import { useRouter } from "expo-router";

export default function Header({
title,
showBack,
showSearch,
showCart,
showMenu,
showLogo,
}: HeaderProps) {
const router = useRouter();
const { itemCount}={itemCount:6}

return (
<View className="relative flex-row items-center justify-between w-full h-14 bg-white px-4">

  {/* Left */}
  <View className="flex-row items-center flex-1">
    {showBack && (
      <TouchableOpacity
        onPress={() => router.back()}
        className="mr-3"
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    )}

    {showMenu && (
      <TouchableOpacity>
        <Ionicons
          name="menu-outline"
          size={28}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    )}
  </View>

  {/* Center Logo */}
  {showLogo ? (
    <View className="absolute left-1/2 -translate-x-1/2">
      <Image
        source={require("@/assets/logo.png")}
        style={{
          width: 120,
          height: 40,
        }}
        resizeMode="contain"
      />
    </View>
  ) : (
    title && (
      <Text className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-primary">
        {title}
      </Text>
    )
  )}

  {/* Right */}
  <View className="flex-row items-center ml-auto">
    {showSearch && (
      <TouchableOpacity
        // onPress={() => router.push("/search")}
        className="mr-3"
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    )}

    {showCart && (
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/cart")}
      
      >

     <View className="relative">
         <Ionicons
          name="cart-outline"
          size={26}
          color={COLORS.primary}
        />
          <View className="absolulte -top-1 -right-1 bg-accent w-4 h-4 rounded-full items-center justify-center ">
          <Text className="text-white text-[10px] font-bold">{itemCount}</Text>
        </View>
     </View>
      </TouchableOpacity>
    )}
    
  </View>
</View>


);
}


// import { View, Text, TouchableOpacity,Image } from 'react-native'
// import React from 'react'
// import { HeaderProps } from '@/assets/constants/types'
// import { Ionicons } from '@expo/vector-icons'
// import { COLORS } from '@/assets/constants'
// import { useRouter } from 'expo-router'
// import '../global.css'

// export default function Header({title,showBack,showSearch,showCart,showMenu,showLogo}: HeaderProps) {
//  const router=useRouter()
//     return (
//     <View className='flex-row items-center justify-between px-4 py-3 bg-red'>
//         {/* left side */}
//       <View className='flex-row items-center flex-1'>
//         {showBack && (
//            <TouchableOpacity onPress={()=>router.back()} className='mr-3'>
//              <Ionicons name='arrow-back' size={24} color={COLORS.primary} />
       
//            </TouchableOpacity> )}
//            {showMenu && (
//                <TouchableOpacity className='mr-3'>
//              <Ionicons name='menu-outline' size={28} color={COLORS.primary} />
       
//            </TouchableOpacity>
//            )}

//             {showLogo ? (
//                 <View className='flex-1'>
//                     <Image source={require("@/assets/logo.png")} 
//                     style={{width:100,height:24}} resizeMode='contain'/>
                    
//                 </View>
//             ) : title && (
//                 <Text className='text-xl font-bold text-primary text-center flex-1 mr-8 '>{title}</Text>
//             ) }
//              {(!title && ! showSearch) && <View className='flex-1'/>}
//       </View>
     
//         {/* right side */}

//       <View className='flex-row items-center gap-4'>
//             {showSearch && (
//                  <TouchableOpacity >
//              <Ionicons name='search-outline' size={24} color={COLORS.primary} />
       
//            </TouchableOpacity> 
//             )}

//       </View>
      
//     </View>
//   )
// }