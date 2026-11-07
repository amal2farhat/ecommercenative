import { COLORS } from "@/assets/constants";
import { useSignIn } from "@clerk/clerk-expo";
import type { EmailCodeFactor } from "@clerk/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Pressable, TextInput, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [code, setCode] = React.useState("");
    const [showEmailCode, setShowEmailCode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignInPress = async () => {

        if (!isLoaded) return;
        if (!emailAddress || !password) return;

        setLoading(true);

        try {

            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({
                    session: signInAttempt.createdSessionId,
                    navigate:async({session})=>{
                        if(session?.currentTask){
                            console.log(session?.currentTask)
                        }
                    }
                });
                router.replace("/");
            } else if (signInAttempt.status === "needs_second_factor") {
                const emailCodeFactor = signInAttempt.supportedSecondFactors?.find((factor): factor is EmailCodeFactor => factor.strategy === "email_code");

                if (emailCodeFactor) {
                    await signIn.prepareSecondFactor({
                        strategy: "email_code",
                        emailAddressId: emailCodeFactor.emailAddressId,
                    });
                    setShowEmailCode(true);
                }
            }else{
                console.error(JSON.stringify(signInAttempt,null,2))
            }
        } catch (err) {
            console.error(err);
        }finally {
            setLoading(false);
        }
    };
    //},[isLoaded,signIn,setActive,router,emailAddress,password];

    const onVerifyPress = async () => {
        if (!isLoaded || !code) return;

        setLoading(true);
        try {
            const attempt = await signIn.attemptSecondFactor({
                strategy: "email_code",
                code,
            });

            if (attempt.status === "complete") {
                await setActive({
                    session: attempt.createdSessionId,
                    navigate:async ({session})=>{
                        console.log(session?.currentTask)
                        return
                    }
                });
                router.replace("/");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    if(showEmailCode){
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Verify your email</Text>
                 <Text style={styles.title}>A Verification code has been sent to your email

                 </Text>
                 <TextInput style={styles.input}
                 value={code} placeholder="Enter verification code" 
                 placeholderTextColor='#666666' onChangeText={(code)=>setCode(code)}
                 keyboardType="numeric" />
                 <Pressable style={({pressed})=>[styles.button, pressed && styles.button]}>
                    <Text style={styles.buttonText}>Verify</Text></Pressable>
            </View>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-white justify-center" style={{ padding: 28 }}>
            {!showEmailCode ? (
                <>
                    <TouchableOpacity onPress={() => router.push("/")} className="absolute top-12 z-10">
                        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="items-center mb-8">
                        <Text className="text-3xl font-bold text-primary mb-2">Welcome Back</Text>
                        <Text className="text-secondary">Sign in to continue</Text>
                    </View>

                    {/* Email */}
                    <View className="mb-4">
                        <Text className="text-primary font-medium mb-2">Email</Text>
                        <TextInput className="w-full bg-surface p-4 rounded-xl text-primary" placeholder="user@example.com" placeholderTextColor="#999" autoCapitalize="none" keyboardType="email-address" value={emailAddress} onChangeText={setEmailAddress} />
                    </View>

                    {/* Password */}
                    <View className="mb-6">
                        <Text className="text-primary font-medium mb-2">Password</Text>
                        <TextInput className="w-full bg-surface p-4 rounded-xl text-primary"
                         placeholder="********" placeholderTextColor="#999"
                          secureTextEntry value={password} onChangeText={setPassword} />
                    </View>

                    {/* Submit */}
                    <Pressable className={`w-full py-4 rounded-full items-center mb-10 ${loading || !emailAddress || !password ? "bg-gray-300" : "bg-primary"}`} onPress={onSignInPress} disabled={loading || !emailAddress || !password}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Sign In</Text>}
                    </Pressable>

                    {/* Footer */}
                    <View className="flex-row justify-center">
                        <Text className="text-secondary">Don&apos;t have an account? </Text>
                        <Link href="/sign-up">
                            <Text className="text-primary font-bold">Sign up</Text>
                        </Link>
                    </View>
                </>
            ) : (
                <>
                    {/* Verification */}
                    <View className="items-center mb-8">
                        
                        <Text className="text-3xl font-bold text-primary mb-2">Verify Email</Text>
                        <Text className="text-secondary text-center">Enter the code sent to your email</Text>
                    </View>

                    <View className="mb-6">
                        <TextInput className="w-full bg-surface p-4 rounded-xl text-primary text-center tracking-widest" placeholder="123456" placeholderTextColor="#999" keyboardType="number-pad" value={code} onChangeText={setCode} />
                    </View>

                    <Pressable className="w-full bg-primary py-4 rounded-full items-center" onPress={onVerifyPress} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Verify</Text>}
                    </Pressable>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    height: 55,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  signupText: {
    fontSize: 14,
    color: "#777",
  },

  signupLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
});


// import { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { router } from "expo-router";

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Add login logic here
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back 👋</Text>

//       <Text style={styles.subtitle}>
//         Login to continue
//       </Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleLogin}
//       >
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       {/* Sign Up Link */}
//       <View style={styles.signupContainer}>
//         <Text style={styles.signupText}>
//           Don't have an account?{" "}
//         </Text>

//         <TouchableOpacity
//           onPress={() => router.push("/(auth)/sign-up")}
//         >
//           <Text style={styles.signupLink}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 25,
//     backgroundColor: "#fff",
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   subtitle: {
//     fontSize: 16,
//     color: "#777",
//     textAlign: "center",
//     marginBottom: 30,
//   },

//   input: {
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 15,
//   },

//   button: {
//     height: 55,
//     backgroundColor: "#007AFF",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   signupContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 25,
//   },

//   signupText: {
//     fontSize: 14,
//     color: "#777",
//   },

//   signupLink: {
//     fontSize: 14,
//     color: "#007AFF",
//     fontWeight: "bold",
//   },
// });


//////////////////////////
// import { useState } from "react";
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { router } from "expo-router";

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // if (!email || !password) {
//     //   Alert.alert("Error", "Please enter email and password");
//     //   return;
//     // }
// // router.replace("/(tabs)/index");

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back 👋</Text>

//       <Text style={styles.subtitle}>
//         Login to continue
//       </Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity
//         style={styles.button}
//         // onPress={handleLogin}
//       >
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 25,
//     backgroundColor: "#fff",
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   subtitle: {
//     fontSize: 16,
//     color: "#777",
//     textAlign: "center",
//     marginBottom: 30,
//   },

//   input: {
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 15,
//   },

//   button: {
//     height: 55,
//     backgroundColor: "#007AFF",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
