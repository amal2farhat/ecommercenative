
// import { useAuth, useSignUp } from '@clerk/clerk-expo'
// import { useState } from 'react'
// import {
//   ActivityIndicator,
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native'

// export default function MainScreen() {
//   const { isLoaded, isSignedIn } = useAuth()
//   const {
//     isLoaded: signUpLoaded,
//     signUp,
//     setActive,
//   } = useSignUp()

//   const [emailAddress, setEmailAddress] = useState('')
//   const [password, setPassword] = useState('')
//   const [code, setCode] = useState('')
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')

//   const handleSignUp = async () => {
//     if (!signUpLoaded || loading) return

//     if (!emailAddress.trim() || !password) {
//       setErrorMessage('Please enter email and password.')
//       return
//     }

//     setLoading(true)
//     setErrorMessage('')

//     try {
//       await signUp.create({
//         emailAddress: emailAddress.trim(),
//         password,
//       })

//       await signUp.prepareEmailAddressVerification({
//         strategy: 'email_code',
//       })

//       setIsVerifying(true)
//     } catch (err: any) {
//       setErrorMessage(
//         err?.errors?.[0]?.message ??
//           err?.message ??
//           'Sign up failed.'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVerify = async () => {
//     if (!signUpLoaded || loading) return

//     if (!code.trim()) {
//       setErrorMessage('Please enter the verification code.')
//       return
//     }

//     setLoading(true)
//     setErrorMessage('')

//     try {
//       const attempt =
//         await signUp.attemptEmailAddressVerification({
//           code: code.trim(),
//         })

//       if (
//         attempt.status === 'complete' &&
//         attempt.createdSessionId
//       ) {
//         await setActive({
//           session: attempt.createdSessionId,
//         })
//       } else {
//         setErrorMessage(
//           `Verification status: ${attempt.status}`
//         )
//       }
//     } catch (err: any) {
//       setErrorMessage(
//         err?.errors?.[0]?.message ??
//           err?.message ??
//           'Verification failed.'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!isLoaded || !signUpLoaded) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }

//   if (isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <Text>You are signed in!</Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       {!isVerifying ? (
//         <>
//           <Text style={styles.title}>Create Account</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Enter email"
//             value={emailAddress}
//             onChangeText={setEmailAddress}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Enter password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           {!!errorMessage && (
//             <Text style={styles.error}>{errorMessage}</Text>
//           )}

//           <Button
//             title={loading ? 'Creating account...' : 'Sign up'}
//             onPress={handleSignUp}
//             disabled={loading}
//           />

//           <View nativeID="clerk-captcha" />
//         </>
//       ) : (
//         <>
//           <Text style={styles.title}>Verify Email</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Enter verification code"
//             value={code}
//             onChangeText={setCode}
//             keyboardType="number-pad"
//           />

//           {!!errorMessage && (
//             <Text style={styles.error}>{errorMessage}</Text>
//           )}

//           <Button
//             title={loading ? 'Verifying...' : 'Verify'}
//             onPress={handleVerify}
//             disabled={loading}
//           />
//         </>
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 12,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   error: {
//     color: 'red',
//   },
//})

////////////////

import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { useAuth, useSignUp } from "@clerk/clerk-expo";

import { COLORS } from "@/assets/constants";

export default function SignUpScreen() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();

  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive,
  } = useSignUp();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!signUpLoaded || loading) return;

    if (
      !emailAddress.trim() ||
      !password ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields",
      });
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);

      Toast.show({
        type: "success",
        text1: "Verification code sent",
        text2: "Check your email for the code",
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Failed to Sign Up",
        text2:
          err?.errors?.[0]?.message ??
          err?.message ??
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!signUpLoaded || loading) return;

    if (!code.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing Code",
        text2: "Enter the verification code",
      });
      return;
    }

    setLoading(true);

    try {
      const attempt =
        await signUp.attemptEmailAddressVerification({
          code: code.trim(),
        });

      if (
        attempt.status === "complete" &&
        attempt.createdSessionId
      ) {
        await setActive({
          session: attempt.createdSessionId,
        });

        router.replace("/");
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Incomplete",
          text2: "Please complete the verification process",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Failed to Verify",
        text2:
          err?.errors?.[0]?.message ??
          err?.message ??
          "Invalid verification code",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!authLoaded || !signUpLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (isSignedIn) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-primary font-bold text-xl">
          You are signed in!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-center"
      style={{ padding: 28 }}
    >
      {!pendingVerification ? (
        <>
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="absolute top-12 left-6 z-10"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-primary mb-2">
              Create Account
            </Text>
            <Text className="text-secondary">
              Sign up to get started
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-primary font-medium mb-2">
              First Name
            </Text>
            <TextInput
              className="w-full bg-surface p-4 rounded-xl text-primary"
              placeholder="John"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>

          <View className="mb-4">
            <Text className="text-primary font-medium mb-2">
              Last Name
            </Text>
            <TextInput
              className="w-full bg-surface p-4 rounded-xl text-primary"
              placeholder="Doe"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          <View className="mb-4">
            <Text className="text-primary font-medium mb-2">
              Email
            </Text>
            <TextInput
              className="w-full bg-surface p-4 rounded-xl text-primary"
              placeholder="user@example.com"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>

          <View className="mb-6">
            <Text className="text-primary font-medium mb-2">
              Password
            </Text>
            <TextInput
              className="w-full bg-surface p-4 rounded-xl text-primary"
              placeholder="********"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="w-full bg-primary py-4 rounded-full items-center mb-10"
            onPress={onSignUpPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Continue
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-secondary">
              Already have an account?{" "}
            </Text>
            <Link href="/signin">
              <Text className="text-primary font-bold">
                Login
              </Text>
            </Link>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setPendingVerification(false)}
            className="absolute top-12 left-6 z-10"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-primary mb-2">
              Verify Email
            </Text>
            <Text className="text-secondary text-center">
              Enter the code sent to your email
            </Text>
          </View>

          <View className="mb-6">
            <TextInput
              className="w-full bg-surface p-4 rounded-xl text-primary text-center tracking-widest"
              placeholder="123456"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            className="w-full bg-primary py-4 rounded-full items-center"
            onPress={onVerifyPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Verify
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
