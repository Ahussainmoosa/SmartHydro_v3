import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../styles/MessageStyles";

import { getDatabase, onValue, ref } from "firebase/database";
import app from "../config/firebase";
import { sendAlert } from "../utils/NotificationService";

const db = getDatabase(app);

export default function MessageScreen(){

const [alarm,setAlarm] = useState("OK");

useEffect(()=>{

const alarmRef = ref(db,"System/alarm");

const unsubscribe = onValue(alarmRef,(snapshot)=>{

const data = snapshot.val();

if(!data) return;

setAlarm(data);

if(data==="LOW_WATER"){
sendAlert("Low Water Level","Hydroponic tank water is low.");
}

if(data==="PH_HIGH"){
sendAlert("pH Level High","Check nutrient solution.");
}

if(data==="TDS_LOW"){
sendAlert("TDS Low","Nutrient concentration is low.");
}

});

return ()=>unsubscribe();

},[]);


return(

<View style={styles.container}>

<Text style={styles.title}>
System Messages
</Text>

<View style={styles.card}>

<Text style={styles.message}>
Current Status: {alarm}
</Text>

</View>

</View>

);

}