import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductCardProps } from '@/assets/constants/types'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/constants'
import { useWishlist } from '../context/washlistContext'

export default function ProductCard({product}:ProductCardProps) {
  const {toggleWishlist,isInWishlist}=useWishlist();  
  // const isLiked=false;
  const isLiked = isInWishlist(product._id);
  return (
//     <Link
//   href={{
//     pathname: '/product/[id]',
//     params: { id: String(product._id) },
//   }}
//   asChild
// >
//   <TouchableOpacity>
//     <View>
//       <Image
//         source={{ uri: product.images[0] }}
//         style={{ width: 150, height: 150 }}
//       />
//     </View>
//   </TouchableOpacity>
// </Link>

<Link
  href={`/product/${product._id}` as any}
  asChild
>
        <TouchableOpacity className='w-[48%] mb-4 bg-white rounded-lg overflow-hidden'>
            <View className='relative h-56 w-full bg-gray-100'>
                <Image source={{uri:product.images[0]}} className='w-full h-full'
                 resizeMode='cover' 
                 />
                 {/* favorite icon */}
                 <TouchableOpacity className='absolute top-2 right-2 z-10 p-2 bg-white rounded-full shdow-sm'
                 onPress={(e)=>{e.stopPropagation(); toggleWishlist(product)}}>
                    
                 <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20}
                 color={isLiked ? COLORS.accent : COLORS.primary} />
                 </TouchableOpacity>
                
                {/* futured  */}
                {product.isFeatured && (
                  <View className='absolute top-2 left-2 bg-black py-1 px-2
                   rounded'
                 >
                    <Text className='text-white text-xs font-bold upercase'>
                      Featured
                    </Text>
                  </View>
                )} 
            </View>

            <View className='p-3'>
            <View className='flex-row items-center mb-1'>
                <Ionicons name='star' color='#FFD700' size={14} />
              <Text className='text-secondary text-xs ml-1'>4.6</Text>
            </View>
            <Text className='text-primary font-medium text-sm mb-1' numberOfLines={1}>
              {product.name}
            </Text>
            <View className='flex-row items-center'>
           <Text className='text-primary font-bold text-base'>
               ${product.price.toFixed(2)}
           </Text>
            </View>
          
            </View>
        </TouchableOpacity>
    </Link>
    
  )
}