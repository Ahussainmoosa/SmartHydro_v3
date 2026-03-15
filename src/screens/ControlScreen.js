import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

import styles from "../styles/ControlStyles";

import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../config/firebase";

const db = getDatabase(app);

export default function ControlScreen(){

/* ---------------- STATES ---------------- */

const [auto,setAuto] = useState(false);

const [light,setLight] = useState(false);
const [pump,setPump] = useState(false);

const [phUp,setPhUp] = useState(false);
const [phDown,setPhDown] = useState(false);

const [tdsUp,setTdsUp] = useState(false);
const [tdsDown,setTdsDown] = useState(false);


/* ---------------- SYSTEM LISTENER ---------------- */

useEffect(()=>{

const systemRef = ref(db,"System");

const unsubscribe = onValue(systemRef,(snapshot)=>{

const data = snapshot.val();

if(data){
setAuto(data.autoControl === 1);
}

});

return ()=>unsubscribe();

},[]);


/* ---------------- MANUAL CONTROL LISTENER ---------------- */

useEffect(()=>{

const manualRef = ref(db,"Manual");

const unsubscribe = onValue(manualRef,(snapshot)=>{

const data = snapshot.val();

if(data){

setLight(data.light === 1);
setPump(data.mainPump === 1);

setPhUp(data.PH_up === 1);
setPhDown(data.PH_down === 1);

setTdsUp(data.TDS_up === 1);
setTdsDown(data.TDS_down === 1);

}

});

return ()=>unsubscribe();

},[]);


/* ---------------- AUTO TOGGLE ---------------- */

const toggleAuto=(value)=>{

setAuto(value);

set(ref(db,"System/autoControl"), value ? 1 : 0);

};


/* ---------------- DEVICE TOGGLE ---------------- */

const toggleDevice=(device,value)=>{

if(auto) return;

set(ref(db,"Manual/"+device), value ? 1 : 0);

};


/* ---------------- UI ---------------- */

return(

<ScrollView
style={styles.container}
contentContainerStyle={styles.scrollContent}
>

<Text style={styles.title}>
Control Panel
</Text>


{/* ---------------- CONTROL GRID ---------------- */}

<View style={styles.grid}>


{/* LIGHT */}

<TouchableOpacity
style={[styles.controlCard, light && styles.active]}
disabled={auto}
onPress={()=>toggleDevice("light",!light)}
>

<Ionicons name="bulb-outline" size={30} color="#fff"/>

<Text style={styles.controlText}>
Light
</Text>

</TouchableOpacity>


{/* MAIN PUMP */}

<TouchableOpacity
style={[styles.controlCard, pump && styles.active]}
disabled={auto}
onPress={()=>toggleDevice("mainPump",!pump)}
>

<Ionicons name="water-outline" size={30} color="#fff"/>

<Text style={styles.controlText}>
Main Pump
</Text>

</TouchableOpacity>


{/* PH UP */}

<TouchableOpacity
style={[styles.controlCard, phUp && styles.active]}
disabled={auto}
onPress={()=>toggleDevice("PH_up",!phUp)}
>

<Ionicons name="flask-outline" size={30} color="#fff"/>

<Text style={styles.controlText}>
PH Up
</Text>

</TouchableOpacity>


{/* PH DOWN */}

<TouchableOpacity
style={[styles.controlCard, phDown && styles.active]}
disabled={auto}
onPress={()=>toggleDevice("PH_down",!phDown)}
>

<Ionicons name="flask-outline" size={30} color="#fff"/>

<Text style={styles.controlText}>
PH Down
</Text>

</TouchableOpacity>


{/* TDS UP */}

<TouchableOpacity
style={[styles.controlCard, tdsUp && styles.active]}
disabled={auto}
onPress={()=>toggleDevice("TDS_up",!tdsUp)}
>

<Ionicons name="flash-outline" size={30} color="#fff"/>

<Text style={styles.controlText}>
TDS Up
</Text>

</TouchableOpacity>


{/* TDS DOWN */}

<TouchableOpacity
style={[styles.controlCard, tdsDown && styles.active]}
disabled={auto}
onPress={()=>toggleDevice("TDS_down",!tdsDown)}
>

<Ionicons name="flash-outline" size={30} color="#fff"/>

<Text style={styles.controlText}>
TDS Down
</Text>

</TouchableOpacity>

</View>


{/* ---------------- AUTO MODE ---------------- */}

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

<Text style={styles.desc}>
When Auto Mode is enabled manual controls are disabled.
</Text>

</View>


</ScrollView>

);

}