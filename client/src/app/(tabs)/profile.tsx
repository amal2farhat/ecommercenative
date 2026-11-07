import { View, Text,ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { dummyUser } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Headers'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, PROFILE_MENU } from '@/assets/constants'
import { useClerk } from '@clerk/clerk-expo'
// import { ScrollView } from 'react-native-gesture-handler'

export default function Profile() {

  // const { user }={ user:dummyUser}

  const { user,signOut }=useClerk()
  const router=useRouter()

  // const handleLogout =async ()=>{router.replace('/(auth)/signin')}
  const handleLogout = async () => {
  try {
    await signOut()
    router.replace('/(auth)/signin')
  } catch (error) {
    console.log('Logout error:', error)
  }
}
  return (
 <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
  <Header title='Profile' />
  <ScrollView className='flex-1 px-4' contentContainerStyle={!user ? {flex:1, justifyContent:'center',
    alignItems:'center'
  } : {paddingTop:16}}>
    {!user ? (
      <View className='items-center w-full'>
        <View className='w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-6'>
          <Ionicons name='person' size={40} color={COLORS.secondary} />
        </View>
        <Text className='text-primary font-bold text-xl mb-2'>Visitor User</Text>
         <Text className='text-secondary text-base mb-8 text-center w-3/4 px-4'>
         Log in to view your profile, orders,and addresses.</Text>
      <TouchableOpacity className='bg-primary w-3/5 py-3 rounded-full items-center shadow-lg'
      onPress={()=>router.push('/login')}>
        <Text className='text-white font-bold text-lg'>Login/Sign Up</Text>
      </TouchableOpacity>
      </View>
    ) : (
      <>
      <View className='items-center mb-8'>
        <View>
          <Image source={{uri:user.imageUrl}}
          className='size-20 border-2 border-white shadow-sm rounded-full' />
        </View>
        <Text className='text-xl font-bold text-primary'>{user.firstName + '' + user.lastName}</Text>
        <Text className='text-secondary text-sm'>{user.emailAddresses[0].emailAddress}</Text>
      {user.publicMetadata?.role === 'admin' && (
        <TouchableOpacity
        onPress={()=>router.push('/admin')} className='mt-4 bg-primary px-6 py-2 rounded-full'>
          <Text className='text-white font-bold'>Admin Panel</Text>
        </TouchableOpacity>
      )}
      </View>
      {/* menu */}
      <View className='bg-white rounded-xl border border-gray-100/75 p-2 mb-4'>
       {PROFILE_MENU.map((item,index)=>(
        <TouchableOpacity 
        onPress={()=>router.push(item.route as any)}
        className={`flex-row items-center p-4 
          ${index !== PROFILE_MENU.length -1 ? 'border-b border-gray-100' : ''}`} key={item.id}>
        <View className='w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'>
          <Ionicons name={item.icon as any} color={COLORS.primary} size={20}/>
        </View>
        <Text className='flex-1 text-primary font-medium'>{item.title}</Text>
        <Ionicons name='chevron-forward' size={20} color={COLORS.secondary} />
        </TouchableOpacity>
       ))}
      </View>
      {/* logout */}
      <TouchableOpacity onPress={handleLogout} className='flex-row items-center justify-center p-4'>
        <Text className='text-red-500 font-bold ml-2'>Logout</Text>
      </TouchableOpacity>
      </>
    )}

  </ScrollView>
 </SafeAreaView>
  )
}