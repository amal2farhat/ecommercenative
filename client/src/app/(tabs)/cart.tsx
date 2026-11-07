import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Headers'
import { useCart } from '../../../context/cartContext'
import { useRouter } from 'expo-router'
import CartItem from '../../../components/cartItem'

export default function Cart() {
  const {cartItems,cartTotal,removeFromCart,updateQuantity}=useCart()
  const router=useRouter()
  const shipping=2.00;
  const total=cartTotal+shipping;
  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Cart' showBack />
      
{cartItems.length > 0 ? (
  <>
  <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false}>
    {cartItems.map((item,index) => (
      // <Text key={index}>{item.product.name}</Text>
      <CartItem
        key={index}
        item={item}
        onRemove={()=>removeFromCart(item.id,item.size)}
        onUpdateQuantity={(q)=>updateQuantity(item.id,q,item.size)}
      />
    ))}
  </ScrollView>
  <View className='p-4 bg-white rounded-t-3xl shadow-sm'>
    {/* subtotal */}
      <View className='flex-row justify-between mb-2'>
        <Text className='text-secondary'>SubTotal</Text>
        <Text className='text-primary font-bold'>${cartTotal.toFixed(2)}</Text>
      </View>
   {/* shipping */}
      <View className='flex-row justify-between mb-2'>
        <Text className='text-secondary'>Shipping</Text>
        <Text className='text-primary font-bold'>${shipping.toFixed(2)}</Text>
      </View>
      {/* border */}
      <View className='h-[1px] bg-border mb-4'/>
      {/* total */}
 <View className='flex-row justify-between mb-6'>
        <Text className='text-primary font-bold text-lg'>Total</Text>
        <Text className='text-primary font-bold text-lg'>${total.toFixed(2)}</Text>
      </View>
     
     {/* chekout */}
     <TouchableOpacity className='bg-primary py-4 rounded-full items-center'
     onPress={()=>router.push('/checkout')}
     >
      <Text className='text-white font-bold tect-base'>Checkout</Text>

     </TouchableOpacity>
  </View>
  </>
 )

      // {/* {cartItems.length >0 ?(
      //   <>

      //   </>
      //  */}
      :(
        <View className='flex-1 items-center justify-center'>
          <Text className='text-secondary text-lg'>Your Cart is Empty</Text>
          <TouchableOpacity onPress={()=>router.push('/')} className='mt-4'>
            <Text className='text-primary font-bol'>
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  //  <View className="h-72 justify-center items-center bg-green-500">

  //     <Text className="text-[30px] text-blue-500">
  //       E-Commerce App 🛒
  //     </Text>

  //     <Text className="text-green-500">
  //       E-Commerce App pp 🛒
  //     </Text>
  //   </View>
  )
}

// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Cart() {
//   return (
//          <View style={{ justifyContent: 'center', alignItems: 'center',
//          backgroundColor:'green',height:300 }}>
//       <Text style={{ fontSize: 30, color:'blue' }}>E-Commerce App 🛒</Text>
//         <Text className='text-green-500'>E-Commerce App oo pp pp🛒</Text>
//     </View>
//     // <View >
//     //         <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-2">
//     //       <Text>Cartttttt</Text>
//     //    </View>
   
//     // </View>
//   )
// }