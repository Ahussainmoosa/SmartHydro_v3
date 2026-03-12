import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styles from "../styles/HistoryStyles";

import { getDatabase, onValue, ref } from "firebase/database";
import app from "../config/firebase";

const db = getDatabase(app);

export default function HistoryScreen(){

const [logs,setLogs] = useState([]);

useEffect(()=>{

const logsRef = ref(db,"Logs");

onValue(logsRef,(snapshot)=>{

const data = snapshot.val();

if(!data) return;

const list = Object.keys(data).map(key=>({
id:key,
...data[key]
}));

setLogs(list.reverse());

});

},[]);

return(

<View style={styles.container}>

<Text style={styles.title}>
Sensor History
</Text>

<FlatList
data={logs}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(

<View style={styles.card}>

<Text style={styles.time}>
{new Date(parseInt(item.id)*1000).toLocaleString()}
</Text>

<Text>pH: {item.ph}</Text>
<Text>TDS: {item.tds}</Text>
<Text>EC: {item.ec}</Text>

</View>

)}
/>

</View>

);

}