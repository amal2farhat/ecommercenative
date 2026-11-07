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
