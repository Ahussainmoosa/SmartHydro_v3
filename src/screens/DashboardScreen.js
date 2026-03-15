import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";

import * as ImageManipulator from "expo-image-manipulator";
import app from "../config/firebase";
import styles from "../styles/DashboardStyles";

const db = getDatabase(app);
const auth = getAuth(app);

/* ---------- API ---------- */

const API_URL =
"https://smarthydro-api-266809663557.us-central1.run.app/predict";

export default function DashboardScreen({ navigation }) {

/* ---------- STATES ---------- */

const [ph,setPh] = useState(0);
const [tds,setTds] = useState(0);
const [ec,setEc] = useState(0);
const [temp,setTemp] = useState(0);
const [water,setWater] = useState(0);

const [plant,setPlant] = useState("lettuce");

const [prediction,setPrediction] = useState(null);
const [confidence,setConfidence] = useState(null);
const [treatment,setTreatment] = useState(null);
const [healthScore,setHealthScore] = useState(null);

const [imagePreview,setImagePreview] = useState(null);
const [loading,setLoading] = useState(false);

/* ---------- HEALTH GAUGE ---------- */

const healthAnim = useRef(new Animated.Value(0)).current;

useEffect(()=>{

Animated.timing(healthAnim,{
toValue:healthScore || 0,
duration:1200,
useNativeDriver:false
}).start();

},[healthScore]);

const width = healthAnim.interpolate({
inputRange:[0,100],
outputRange:["0%","100%"]
});

/* ---------- PLANT IMAGE ---------- */

const getPlantImage = ()=>{

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

/* ---------- PLANT LIMITS ---------- */

const getPlantLimits = ()=>{

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

/* ---------- SCAN MENU ---------- */

const openScanMenu = ()=>{

Alert.alert(
"Scan Your Plant",
"Choose image source",
[
{text:"Take Photo",onPress:openCamera},
{text:"Pick from Gallery",onPress:openGallery},
{text:"Cancel",style:"cancel"}
]
);

};

/* ---------- CAMERA ---------- */

const openCamera = async ()=>{

const permission = await ImagePicker.requestCameraPermissionsAsync();

if(!permission.granted){

Alert.alert("Permission needed","Camera access required");
return;

}

const result = await ImagePicker.launchCameraAsync({
quality:0.4,
base64:false
});

if(!result.canceled){

setImagePreview(result.assets[0].uri);
sendToAPI(result.assets[0].uri);

}

};

/* ---------- GALLERY ---------- */

const openGallery = async ()=>{

const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

if(!permission.granted){

Alert.alert("Permission needed","Gallery access required");
return;

}

const result = await ImagePicker.launchImageLibraryAsync({
mediaTypes:["images"],
quality:0.4
});

if(!result.canceled){

setImagePreview(result.assets[0].uri);
sendToAPI(result.assets[0].uri);

}

};

/* ---------- SEND IMAGE ---------- */

const sendToAPI = async (uri)=>{

try{

setLoading(true);

/* compress image before upload */

const compressed = await ImageManipulator.manipulateAsync(
uri,
[{ resize: { width: 800 } }],
{ compress: 0.4, format: ImageManipulator.SaveFormat.JPEG }
);

const formData = new FormData();

formData.append("file",{
uri:compressed.uri,
name:"plant.jpg",
type:"image/jpeg"
});

const response = await fetch(API_URL,{
method:"POST",
body:formData,
headers:{
"Content-Type":"multipart/form-data"
}
});

const result = await response.json();

console.log("API RESULT:",result);

if(result.status === "success"){

setPrediction(result.prediction);
setConfidence(result.confidence);
setTreatment(result.treatment);
setHealthScore(result.health_score);

}else{

Alert.alert("AI Error",result.message || "Prediction failed");

}

}catch(err){

console.log("API ERROR:",err);
Alert.alert("Error","API connection failed");

}

setLoading(false);

};

/* ---------- CLEAR AI RESULT ---------- */

const clearAIResult = () => {
setPrediction(null);
setConfidence(null);
setTreatment(null);
setHealthScore(null);
setImagePreview(null);
};

/* ---------- SENSOR LISTENER ---------- */

useEffect(()=>{

const sensorRef = ref(db,"Sensors");

const unsub = onValue(sensorRef,(snap)=>{

const d = snap.val();

if(d){

setPh(d.ph ?? 0);
setTds(d.tds ?? 0);
setEc(d.ec ?? 0);
setTemp(d.temperature ?? 0);
setWater(d.waterLevel ?? 0);

}

});

return ()=>unsub();

},[]);

/* ---------- PLANT LISTENER ---------- */

useEffect(()=>{

const plantRef = ref(db,"System/plant");

const unsub = onValue(plantRef,(snap)=>{

if(snap.val()) setPlant(snap.val());

});

return ()=>unsub();

},[]);

/* ---------- UI ---------- */

return(

<View style={{flex:1}}>

{/* TOP BAR */}

<View style={styles.topBar}>

<View style={styles.topLeft}>

<Image
source={require("../assets/logo.png")}
style={styles.logoSmall}
/>

<Text style={styles.topTitle}>
SmartHydro 🌿
</Text>

</View>

</View>

<ScrollView
style={styles.container}
contentContainerStyle={styles.scrollContent}
>

{/* WELCOME */}

<View style={styles.welcomeBox}>

<Text style={styles.welcomeTitle}>
Welcome, User 🌿
</Text>

<Text style={styles.welcomeSubtitle}>
Monitor and control your plants health
</Text>

</View>

{/* PLANT */}

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

</View>

</TouchableOpacity>

{/* SCAN BUTTON */}

<View style={styles.scanContainer}>

<TouchableOpacity
style={styles.scanButton}
onPress={openScanMenu}
>

<Ionicons name="scan-outline" size={28} color="#fff"/>

<Text style={styles.scanButtonText}>
Scan Your Plants
</Text>

</TouchableOpacity>

</View>

{/* IMAGE PREVIEW */}

{imagePreview && (

<Image
source={{uri:imagePreview}}
style={styles.preview}
/>

)}

{/* LOADING */}

{loading && (

<View style={styles.loadingBox}>

<ActivityIndicator size="large" color="#2e7d32"/>

<Text style={styles.loadingText}>
AI scanning your plant...
</Text>

</View>

)}

{/* RESULT */}

{prediction && (

<View style={styles.resultBox}>

{/* CLEAR BUTTON */}

<TouchableOpacity
style={styles.clearButton}
onPress={clearAIResult}
>

<Ionicons name="close-circle" size={22} color="#fff" />

</TouchableOpacity>


<View style={styles.diseaseBadge}>

<Text style={styles.badgeText}>
{prediction}
</Text>

</View>

<Text style={styles.confidenceText}>
Confidence: {(confidence * 100).toFixed(2)}%
</Text>

<View style={styles.treatmentBox}>

<Text style={styles.treatmentTitle}>
Treatment
</Text>

<Text style={styles.treatmentText}>
{treatment}
</Text>

</View>

</View>

)}


{/* HEALTH GAUGE */}

{healthScore !== null && (

<View style={styles.healthBox}>

<Text style={styles.healthTitle}>
Plant Health Score
</Text>

<View style={styles.healthBar}>

<Animated.View
style={[styles.healthFill,{width}]}
/>

</View>

<Text style={styles.healthValue}>
{healthScore} / 100
</Text>

</View>

)}

{/* SENSOR GRID */}

<View style={styles.grid}>

<View style={styles.card}>
<Ionicons name="thermometer-outline" size={26} color="#ff7043"/>
<Text style={styles.cardValue}>{temp}°C</Text>
<Text style={styles.cardTitle}>Temperature</Text>
</View>

<View style={styles.card}>
<Ionicons name="water-outline" size={26} color="#42a5f5"/>
<Text style={styles.cardValue}>{water ? "Enough" : "Low"}</Text>
<Text style={styles.cardTitle}>Water Level</Text>
</View>

<View style={styles.card}>
<Ionicons name="flask-outline" size={26} color="#8e24aa"/>
<Text style={styles.cardValue}>{ph}</Text>
<Text style={styles.cardTitle}>pH</Text>
</View>

<View style={styles.card}>
<Ionicons name="flash-outline" size={26} color="#43a047"/>
<Text style={styles.cardValue}>{ec}</Text>
<Text style={styles.cardTitle}>EC</Text>
</View>

</View>

</ScrollView>

</View>

);

}
