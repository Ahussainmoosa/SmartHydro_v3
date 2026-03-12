import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import styles from "../styles/ControlStyles";

import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../config/firebase";

const db = getDatabase(app);

export default function ControlScreen(){

const [auto,setAuto] = useState(false);
const [light,setLight] = useState(false);
const [pump,setPump] = useState(false);
const [waterLevel,setWaterLevel] = useState(0);

useEffect(()=>{

const systemRef = ref(db,"System");

const unsub = onValue(systemRef,(snapshot)=>{

const data = snapshot.val();

if(data){
setAuto(data.autoControl === 1);
}

});

return ()=>unsub();

},[]);

useEffect(()=>{

const manualRef = ref(db,"Manual");

const unsub = onValue(manualRef,(snapshot)=>{

const data = snapshot.val();

if(data){

setLight(data.light === 1);
setPump(data.mainPump === 1);

}

});

return ()=>unsub();

},[]);

useEffect(()=>{

const sensorRef = ref(db,"Sensors/waterLevel");

const unsub = onValue(sensorRef,(snapshot)=>{
setWaterLevel(snapshot.val() ?? 0);
});

return ()=>unsub();

},[]);

const toggleAuto=(value)=>{

setAuto(value);
set(ref(db,"System/autoControl"), value ? 1 : 0);

};

const toggleLight=(value)=>{

if(auto) return;

setLight(value);
set(ref(db,"Manual/light"), value ? 1 : 0);

};

const togglePump=(value)=>{

if(auto) return;

setPump(value);
set(ref(db,"Manual/mainPump"), value ? 1 : 0);

};

return(

<ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

<Text style={styles.title}>Plant Status</Text>

<View style={styles.card}>

<View style={styles.row}>

<Text style={styles.cardTitle}>
Master Lock (Automatic)
</Text>

<View style={{flexDirection:"row",alignItems:"center"}}>

{auto && <Text style={{marginRight:8}}>🔒</Text>}

<Switch
value={auto}
onValueChange={toggleAuto}
/>

</View>

</View>

</View>

<View style={styles.card}>

<View style={styles.row}>

<Text style={styles.bigText}>
{light ? "Light On" : "Light Off"}
</Text>

<Switch
disabled={auto}
value={light}
onValueChange={toggleLight}
/>

</View>

<Text style={styles.desc}>
Switch lighting to manage temperature.
</Text>

</View>

<View style={styles.card}>

<View style={styles.row}>

<Text style={styles.bigText}>
{waterLevel ? "Normal" : "Low"}
</Text>

<Switch
disabled={auto}
value={pump}
onValueChange={togglePump}
/>

</View>

<Text style={styles.desc}>
Toggle water pump to refill when low.
</Text>

</View>

</ScrollView>

);

}