import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebase";
import styles from "../styles/LoginStyles";

export default function ResetPasswordModal({ visible, onClose }){

const [email,setEmail] = useState("");

const sendReset = ()=>{

if(!email){
Alert.alert("Enter Email","Please enter your email");
return;
}

sendPasswordResetEmail(auth,email)
.then(()=>{

Alert.alert("Success","Password reset email sent");
setEmail("");
onClose();

})
.catch(err=>{

Alert.alert("Error",err.message);

});

};

return(

<Modal
visible={visible}
transparent
animationType="slide"
>

<View style={{
flex:1,
justifyContent:"center",
backgroundColor:"rgba(0,0,0,0.4)"
}}>

<View style={{
backgroundColor:"#fff",
margin:20,
padding:25,
borderRadius:12
}}>

<Text style={{fontSize:20,fontWeight:"600",marginBottom:15}}>
Reset Password
</Text>

<TextInput
style={styles.input}
placeholder="Enter your email"
value={email}
onChangeText={setEmail}
/>

<TouchableOpacity
style={styles.button}
onPress={sendReset}
>

<Text style={styles.buttonText}>
Send Reset Link
</Text>

</TouchableOpacity>

<TouchableOpacity
onPress={onClose}
style={{marginTop:10}}
>

<Text style={{textAlign:"center",color:"#777"}}>
Cancel
</Text>

</TouchableOpacity>

</View>

</View>

</Modal>

);

}