import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/DashboardStyles";

import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../config/firebase";

const db = getDatabase(app);

export default function DashboardScreen({ navigation }) {

/* -------------------- Sensor States -------------------- */

const [ph,setPh] = useState(0);
const [tds,setTds] = useState(0);
const [ec,setEc] = useState(0);
const [temp,setTemp] = useState(0);
const [water,setWater] = useState(0);

/* -------------------- Manual Control States -------------------- */

const [phUp,setPhUp] = useState(0);
const [phDown,setPhDown] = useState(0);
const [tdsUp,setTdsUp] = useState(0);
const [tdsDown,setTdsDown] = useState(0);
const [mainPump,setMainPump] = useState(0);
const [light,setLight] = useState(0);

/* -------------------- Plant State -------------------- */

const [plant,setPlant] = useState("lettuce");


/* -------------------- Plant Image -------------------- */

const getPlantImage = () => {

switch(plant){

case "mint":
return require("../assets/plants/mint.png");

case "basil":
return require("../assets/plants/basil.png");

case "tomato":
return require("../assets/plants/tomato.png");

default:
return require("../assets/plants/lettuce.png");

}

};


/* -------------------- Plant Limits -------------------- */

const getPlantLimits = () => {

switch(plant){

case "lettuce":
return {ph:"5.5–6.5", tds:"560–840"};

case "basil":
return {ph:"5.5–6.5", tds:"700–1120"};

case "tomato":
return {ph:"5.5–6.5", tds:"1400–3500"};

default:
return {ph:"5.5–6.5", tds:"560–840"};

}

};


/* -------------------- Sensors Listener -------------------- */

useEffect(()=>{

const sensorRef = ref(db,"Sensors");

const unsubscribe = onValue(sensorRef,(snapshot)=>{

const data = snapshot.val();

if(data){

setPh(data.ph ?? 0);
setTds(data.tds ?? 0);
setEc(data.ec ?? 0);
setTemp(data.temperature ?? 0);
setWater(data.waterLevel ?? 0);

}

});

return ()=>unsubscribe();

},[]);


/* -------------------- Plant Selection Listener -------------------- */

useEffect(()=>{

const plantRef = ref(db,"System/plant");

const unsubscribe = onValue(plantRef,(snapshot)=>{

const data = snapshot.val();

if(data){
setPlant(data);
}

});

return ()=>unsubscribe();

},[]);


/* -------------------- Manual Control Listener -------------------- */

useEffect(()=>{

const manualRef = ref(db,"Manual");

const unsubscribe = onValue(manualRef,(snapshot)=>{

const data = snapshot.val();

if(data){

setPhUp(data.PH_up ?? 0);
setPhDown(data.PH_down ?? 0);
setTdsUp(data.TDS_up ?? 0);
setTdsDown(data.TDS_down ?? 0);
setMainPump(data.mainPump ?? 0);
setLight(data.light ?? 0);

}

});

return ()=>unsubscribe();

},[]);


/* -------------------- Toggle Device -------------------- */

const toggleDevice = (device,current)=>{

const newValue = current ? 0 : 1;

set(ref(db,"Manual/"+device),newValue);

};


/* -------------------- UI -------------------- */

return(

<ScrollView
style={styles.container}
contentContainerStyle={styles.scrollContent}
>


{/* Welcome Section */}

<View style={styles.welcomeBox}>

<Text style={styles.welcomeTitle}>
Welcome, User 🌿
</Text>

<Text style={styles.welcomeSubtitle}>
Monitor and control your plants health
</Text>

</View>


{/* Plant Selection */}

<TouchableOpacity
style={styles.plantBox}
onPress={()=>navigation.navigate("Plants")}
>

<Image
source={getPlantImage()}
style={styles.plantImage}
/>

<View>

<Text style={styles.plantName}>
{plant} Plant
</Text>

<Text style={styles.plantLimits}>
pH: {getPlantLimits().ph}   TDS: {getPlantLimits().tds}
</Text>

<Text style={styles.plantSubtitle}>
Selected • 1 day ago
</Text>

</View>

</TouchableOpacity>


{/* Sensor Section */}

<Text style={styles.sectionTitle}>
Hydro Device
</Text>


<View style={styles.grid}>

<View style={styles.card}>
<Text style={styles.cardValue}>{temp}°C</Text>
<Text style={styles.cardTitle}>Temperature</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardValue}>
{water ? "Enough" : "Low"}
</Text>
<Text style={styles.cardTitle}>Water Level</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardValue}>{ph}</Text>
<Text style={styles.cardTitle}>pH Level</Text>
</View>

<View style={styles.card}>
<Text style={styles.cardValue}>{ec}</Text>
<Text style={styles.cardTitle}>EC Level</Text>
</View>

</View>


{/* Manual Controls */}

<Text style={styles.sectionTitle}>
Manual Controls
</Text>

<View style={styles.controlGrid}>

<TouchableOpacity
style={[styles.controlButton, phUp ? styles.controlButtonActive : null]}
onPress={()=>toggleDevice("PH_up",phUp)}
>
<Text style={styles.controlText}>PH UP</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.controlButton, phDown ? styles.controlButtonActive : null]}
onPress={()=>toggleDevice("PH_down",phDown)}
>
<Text style={styles.controlText}>PH DOWN</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.controlButton, tdsUp ? styles.controlButtonActive : null]}
onPress={()=>toggleDevice("TDS_up",tdsUp)}
>
<Text style={styles.controlText}>TDS UP</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.controlButton, tdsDown ? styles.controlButtonActive : null]}
onPress={()=>toggleDevice("TDS_down",tdsDown)}
>
<Text style={styles.controlText}>TDS DOWN</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.controlButton, mainPump ? styles.controlButtonActive : null]}
onPress={()=>toggleDevice("mainPump",mainPump)}
>
<Text style={styles.controlText}>MAIN PUMP</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.controlButton, light ? styles.controlButtonActive : null]}
onPress={()=>toggleDevice("light",light)}
>
<Text style={styles.controlText}>LIGHT</Text>
</TouchableOpacity>

</View>

</ScrollView>

);

}