import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useWishlist } from '../../../context/washlistContext'
import { useRouter } from 'expo-router'
import Header from '../../../components/Headers'
import ProductCard from '../../../components/ProductCard'

export default function Favorites() {
  const {wishlist}=useWishlist()
  const router=useRouter()
  return (
  <SafeAreaView className=' flex-1 bg-surface' edges={['top']}>
    <Header title='Wishlist' showMenu />
    {wishlist.length > 0 ? (
      <ScrollView className='flex-1 px-4 mt-4' showsVerticalScrollIndicator={false} >
        <View flex-row flex-wrap justify-between>
          {wishlist.map((product)=>(
            <ProductCard key={product._id} product={product} />
          ))}

        </View>
      </ScrollView>
    )
    :(
      <View className='flex-1 items-center justify-center'>
            <Text className='text-secondary text-lg'>Your wishlist is Empty</Text>
            <TouchableOpacity onPress={()=>router.push('/')} className='mt-4'>
              <Text className='text-primary font-bold'>
                Start Shopping
              </Text>
            </TouchableOpacity>
          </View>
    )}
  </SafeAreaView>
  )
}