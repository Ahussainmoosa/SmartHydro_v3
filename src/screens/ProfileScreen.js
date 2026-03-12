import { signOut } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import app, { auth } from "../config/firebase";
import styles from "../styles/ProfileStyles";

const db = getDatabase(app);

export default function ProfileScreen({navigation}){

const [user,setUser] = useState({});
const uid = auth.currentUser?.uid;

useEffect(()=>{

if(!uid) return;

const userRef = ref(db,"Users/"+uid);

const unsub = onValue(userRef,(snapshot)=>{
setUser(snapshot.val() || {});
});

return ()=>unsub();

},[]);

const logout = ()=>{

signOut(auth);
navigation.replace("Login");

};

return(

<View style={styles.container}>

<Text style={styles.title}>User Profile</Text>

<View style={styles.card}>

<Text style={styles.label}>Name</Text>
<Text style={styles.value}>{user.username}</Text>

<Text style={styles.label}>Email</Text>
<Text style={styles.value}>{user.email}</Text>

<Text style={styles.label}>Phone</Text>
<Text style={styles.value}>{user.phone}</Text>

</View>

<TouchableOpacity style={styles.logout} onPress={logout}>
<Text style={{color:"#fff"}}>Logout</Text>
</TouchableOpacity>

</View>

);

}