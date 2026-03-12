import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/LoginStyles";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app, { auth } from "../config/firebase";

const db = getDatabase(app);

export default function SignupScreen({ navigation }){

const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirm,setConfirm] = useState("");
const [phone,setPhone] = useState("");

const handleSignup = async ()=>{

if(!username || !email || !password || !phone){
Alert.alert("Error","Please fill all fields");
return;
}

if(password !== confirm){
Alert.alert("Error","Passwords do not match");
return;
}

try{

const cred = await createUserWithEmailAndPassword(auth,email,password);

await set(ref(db,"Users/"+cred.user.uid),{

username: username,
email: email,
phone: phone

});

Alert.alert("Success","Account created");

navigation.replace("MainTabs");

}catch(err){

Alert.alert("Signup Failed",err.message);

}

};

return(

<View style={styles.container}>

<Text style={styles.title}>Create Account</Text>

<TextInput
style={styles.input}
placeholder="User Name"
value={username}
onChangeText={setUsername}
/>

<TextInput
style={styles.input}
placeholder="Email"
value={email}
onChangeText={setEmail}
/>

<TextInput
style={styles.input}
placeholder="Mobile Number"
value={phone}
onChangeText={setPhone}
/>

<TextInput
style={styles.input}
placeholder="Password"
secureTextEntry
value={password}
onChangeText={setPassword}
/>

<TextInput
style={styles.input}
placeholder="Confirm Password"
secureTextEntry
value={confirm}
onChangeText={setConfirm}
/>

<TouchableOpacity style={styles.button} onPress={handleSignup}>

<Text style={styles.buttonText}>
SIGN UP
</Text>

</TouchableOpacity>

</View>

);

}