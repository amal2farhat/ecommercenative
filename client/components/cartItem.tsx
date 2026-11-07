
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { CartItemProps } from '@/assets/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/constants'

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}:CartItemProps) {
    const imageUrl=item.product.images[0]
  return (
    <View className="flex-row bg-white p-3 mb-4 rounded-xl">
  <View 
//     style={{
//     width: 80,
//     height: 80,
//     backgroundColor: '#f3f4f6',
//     overflow: 'hidden',
//     marginRight: 12,
//     borderRadius: 8,
//   }}
  className='w-[80px] h-[80px] bg-gray-100 overflow-hidden mr-3 rounded-lg'
  >
      {/* <Image
    source={{ uri: imageUrl }}
    style={{ width: '100%', height: '100%' }}
    resizeMode="cover"
    onError={(error) =>
      console.log('Image error:', error.nativeEvent)
    }
  /> */}
        <Image
        source={{ uri: imageUrl }}
        className="w-full h-full rounded-lg"
        resizeMode="cover"
      />
  </View>
  {/* <View> */}
    <View className='flex-1 justify-between'>
        {/* product details */}
        <View className='flex-row justify-between items-start'>
            <View>
                
            <Text className='text-primary font-medium text-sm mb-1'>
                {item.product.name}
            </Text>
            <Text className='text-secondary text-xs'>Size : {item.size}</Text>
            </View>
                 <TouchableOpacity onPress={onRemove} >
            <Ionicons name='close-circle-outline' size={20} color='#FF4C3B' />
        </TouchableOpacity>
        </View>
   {/* price and quantity */}
        <View className='flex-row justify-between items-center mt-2'>
            <Text className='text-primary font-bold text-base'>${item.product.price.toFixed(2)}</Text>
             <View className='flex-row items-center bg-surface rounded-full px-2 py-1'>
          <TouchableOpacity>
            <Ionicons name='remove' size={16} color={COLORS.primary} className='p-1'
            onPress={()=>onUpdateQuantity && onUpdateQuantity(item.quantity -1)}/>
          </TouchableOpacity>
            <Text className='text-primary font-medium mx-3'>{item.quantity}</Text>

          <TouchableOpacity>
            <Ionicons name='add' size={16} color={COLORS.primary} className='p-1'
            onPress={()=>onUpdateQuantity && onUpdateQuantity(item.quantity +1)}/>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  {/* </View> */}

      {/* <View className="flex-1 ml-3">
        <Text className="font-bold text-base">
          {item.product.name}
        </Text>

        <Text className="text-primary mt-1">
          ${item.product.price}
        </Text>

        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            // onPress={() =>
            //   updateQuantity(item.id, item.quantity - 1)
            // }
            className="bg-gray-200 px-3 py-1 rounded"
          >
            <Text>-</Text>
          </TouchableOpacity>

          <Text className="mx-3">
            {item.quantity}
          </Text>

          <TouchableOpacity
            // onPress={() =>
            //   onUpdateQuantity(item.id, item.product.quantity + 1)
            // }
            className="bg-gray-200 px-3 py-1 rounded"
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
        //   onPress={() => removeFromCart(item.id)}
          className="mt-2"
        >
          <Text className="text-red-500">
            Remove
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}
