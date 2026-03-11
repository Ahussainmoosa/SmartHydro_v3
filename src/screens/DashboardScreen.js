import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../styles/DashboardStyles";

import { getDatabase, onValue, ref } from "firebase/database";
import app from "../config/firebase";

const db = getDatabase(app);

export default function DashboardScreen(){

const [ph,setPh] = useState(0);
const [tds,setTds] = useState(0);
const [ec,setEc] = useState(0);
const [temp,setTemp] = useState(0);
const [water,setWater] = useState(0);

useEffect(()=>{

const sensorRef = ref(db,"Sensors");

const unsubscribe = onValue(sensorRef,(snapshot)=>{

const data = snapshot.val();

if(data){

setPh(data.ph);
setTds(data.tds);
setEc(data.ec);
setTemp(data.temperature);
setWater(data.waterLevel);

}

});

return () => unsubscribe();

},[]);

return(

<View style={styles.container}>

<Text style={styles.title}>
Hydroponic Dashboard
</Text>

<View style={styles.grid}>

<View style={styles.card}>
<Text style={styles.cardTitle}>pH</Text>
<Text style={styles.cardValue}>{ph}</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardTitle}>TDS</Text>
<Text style={styles.cardValue}>{tds}</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardTitle}>EC</Text>
<Text style={styles.cardValue}>{ec}</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardTitle}>Temp</Text>
<Text style={styles.cardValue}>{temp}°C</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardTitle}>Water</Text>
<Text style={styles.cardValue}>{water}</Text>
</View>

</View>

</View>

);

}