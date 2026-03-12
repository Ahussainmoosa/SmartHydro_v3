import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import app from "../config/firebase";
import styles from "../styles/NotificationStyles";

const db = getDatabase(app);

export default function NotificationHistory(){

const [list,setList] = useState([]);

useEffect(()=>{

const refNot = ref(db,"Notifications");

const unsub = onValue(refNot,(snap)=>{

const data = snap.val();
if(!data) return;

const arr = Object.entries(data).map(([k,v])=>({
id:k,
...v
}));

setList(arr.reverse());

});

return ()=>unsub();

},[]);

return(

<View style={styles.container}>

<Text style={styles.title}>Notifications</Text>

<FlatList
data={list}
keyExtractor={(i)=>i.id}
renderItem={({item})=>(

<View style={styles.card}>
<Text>{item.type}</Text>
<Text>{item.message}</Text>
</View>

)}
/>

</View>

);

}