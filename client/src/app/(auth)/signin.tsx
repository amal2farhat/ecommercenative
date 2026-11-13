
import { COLORS } from "@/assets/constants";
import { useSignIn } from "@clerk/clerk-expo";
import type { EmailCodeFactor } from "@clerk/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as React from "react";

import {
    Pressable,
    TextInput,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [code, setCode] = React.useState("");

    const [showEmailCode, setShowEmailCode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // SIGN IN
    const onSignInPress = async () => {
        if (!isLoaded || !emailAddress || !password || loading) return;

        setLoading(true);

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress.trim(),
                password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({
                    session: signInAttempt.createdSessionId,
                });

                router.replace("/");
            }

            else if (signInAttempt.status === "needs_second_factor") {

                const emailCodeFactor =
                    signInAttempt.supportedSecondFactors?.find(
                        (factor): factor is EmailCodeFactor =>
                            factor.strategy === "email_code"
                    );

                if (emailCodeFactor) {
                    await signIn.prepareSecondFactor({
                        strategy: "email_code",
                        emailAddressId: emailCodeFactor.emailAddressId,
                    });

                    setShowEmailCode(true);
                } else {
                    Alert.alert(
                        "Error",
                        "Email verification is not available."
                    );
                }
            }

            else {
                console.log("Sign in status:", signInAttempt.status);
            }

        } catch (err) {
            console.error("Sign in error:", err);
            Alert.alert("Sign In Error", "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    // VERIFY EMAIL CODE
    const onVerifyPress = async () => {
        if (!isLoaded || !code.trim() || loading) return;

        setLoading(true);

        try {
            const attempt = await signIn.attemptSecondFactor({
                strategy: "email_code",
                code: code.trim(),
            });

            if (attempt.status === "complete") {

                await setActive({
                    session: attempt.createdSessionId,
                });

                router.replace("/");
            }

            else {
                Alert.alert(
                    "Verification",
                    "Verification is not complete. Please try again."
                );
            }

        } catch (err) {
            console.error("Verification error:", err);

            Alert.alert(
                "Verification Error",
                "Invalid or expired verification code."
            );
        } finally {
            setLoading(false);
        }
    };

    // EMAIL VERIFICATION SCREEN
    if (showEmailCode) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center px-7">

                <View className="items-center mb-8">

                    <Ionicons
                        name="mail-outline"
                        size={65}
                        color={COLORS.primary}
                    />

                    <Text className="text-3xl font-bold text-primary mt-4 mb-2">
                        Verify Email
                    </Text>

                    <Text className="text-secondary text-center">
                        A verification code has been sent to your email.
                        Please enter it below.
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
                        maxLength={6}
                    />

                </View>

                <Pressable
                    className={`w-full py-4 rounded-full items-center ${
                        loading || !code.trim()
                            ? "bg-gray-300"
                            : "bg-primary"
                    }`}
                    onPress={onVerifyPress}
                    disabled={loading || !code.trim()}
                >

                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-lg">
                            Verify
                        </Text>
                    )}

                </Pressable>

            </SafeAreaView>
        );
    }

    // SIGN IN SCREEN
    return (
        <SafeAreaView
            className="flex-1 bg-white justify-center"
            style={{ padding: 28 }}
        >

            {/* BACK BUTTON */}
            <TouchableOpacity
                onPress={() => router.push("/")}
                className="absolute top-12 z-10"
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={COLORS.primary}
                />
            </TouchableOpacity>

            {/* HEADER */}
            <View className="items-center mb-8">

                <Text className="text-3xl font-bold text-primary mb-2">
                    Welcome Back
                </Text>

                <Text className="text-secondary">
                    Sign in to continue
                </Text>

            </View>

            {/* EMAIL */}
            <View className="mb-4">

                <Text className="text-primary font-medium mb-2">
                    Email
                </Text>

                <TextInput
                    className="w-full bg-surface p-4 rounded-xl text-primary"
                    placeholder="user@example.com"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />

            </View>

            {/* PASSWORD */}
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

            {/* SIGN IN BUTTON */}
            <Pressable
                className={`w-full py-4 rounded-full items-center mb-10 ${
                    loading || !emailAddress || !password
                        ? "bg-gray-300"
                        : "bg-primary"
                }`}
                onPress={onSignInPress}
                disabled={loading || !emailAddress || !password}
            >

                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-lg">
                        Sign In
                    </Text>
                )}

            </Pressable>

            {/* FOOTER */}
            <View className="flex-row justify-center">

                <Text className="text-secondary">
                    Don't have an account?{" "}
                </Text>

                <Link href="/sign-up">
                    <Text className="text-primary font-bold">
                        Sign up
                    </Text>
                </Link>

            </View>

        </SafeAreaView>
    );
}


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
