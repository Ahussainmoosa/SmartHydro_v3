import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebase";

import styles from "../styles/LoginStyles";
import ResetPasswordModal from "./ResetPasswordModal";

export default function LoginScreen({ navigation }) {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showReset,setShowReset] = useState(false);

const handleLogin = ()=>{

if(!email || !password){
Alert.alert("Error","Enter email and password");
return;
}

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
Alert.alert("Login Successful");
navigation.replace("MainTabs");
})
.catch(err=>{
Alert.alert("Login Failed",err.message);
});

};

return(

<View style={styles.container}>
<Image
source={require("../assets/logo.png")}
style={styles.logo}
/>

<Text style={styles.title}>Smart Hydroponic</Text>

<Text style={styles.subtitle}>
Login to monitor your farm
</Text>

<TextInput
style={styles.input}
placeholder="Email"
value={email}
onChangeText={setEmail}
/>

<TextInput
style={styles.input}
placeholder="Password"
secureTextEntry
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity style={styles.button} onPress={handleLogin}>
<Text style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>setShowReset(true)}
style={{marginTop:15}}
>
<Text style={{color:"#2E7D32"}}>
Forgot Password?
</Text>
</TouchableOpacity>

<View style={{flexDirection:"row",marginTop:25}}>

<Text style={{color:"#555"}}>
Don't have an account?
</Text>

<TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
<Text style={{color:"#2E7D32",marginLeft:5,fontWeight:"600"}}>
Sign Up
</Text>
</TouchableOpacity>

</View>

<ResetPasswordModal
visible={showReset}
onClose={()=>setShowReset(false)}
/>

</View>

);

}