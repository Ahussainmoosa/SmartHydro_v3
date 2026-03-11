import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/LoginStyles";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation }) {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = () => {

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

Alert.alert("Login Successful");

// Navigate to dashboard
navigation.replace("Dashboard");

})
.catch(error=>{

Alert.alert("Login Failed",error.message);

});

};

return (

<View style={styles.container}>

<Text style={styles.title}>
Smart Hydroponic
</Text>

<Text style={styles.subtitle}>
Login to monitor your farm
</Text>

<TextInput
style={styles.input}
placeholder="Email"
value={email}
onChangeText={setEmail}
autoCapitalize="none"
/>

<TextInput
style={styles.input}
placeholder="Password"
secureTextEntry
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity
style={styles.button}
onPress={handleLogin}
>

<Text style={styles.buttonText}>
LOGIN
</Text>

</TouchableOpacity>

</View>

);

}