import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { getDatabase, onValue, ref } from "firebase/database";
import app from "../config/firebase";

import styles from "../styles/StatsStyles";

const db = getDatabase(app);
const screenWidth = Dimensions.get("window").width;

export default function StatsScreen(){

const [labels,setLabels] = useState([]);

const [phData,setPhData] = useState([]);
const [tdsData,setTdsData] = useState([]);
const [ecData,setEcData] = useState([]);

const [pumpData,setPumpData] = useState([]);
const [lightData,setLightData] = useState([]);

const [filter,setFilter] = useState("24h");

useEffect(()=>{

const logsRef = ref(db,"Logs");

const unsubscribe = onValue(logsRef,(snapshot)=>{

const data = snapshot.val();
if(!data) return;

let entries = Object.entries(data)
.filter(([timestamp,value]) => {

if(typeof value !== "object") return false;

const ph = Number(value.ph);
const tds = Number(value.tds);
const ec = Number(value.ec);

return (
!isNaN(ph) ||
!isNaN(tds) ||
!isNaN(ec)
);

})

.sort((a,b)=> Number(a[0]) - Number(b[0]));



/* ---------- LIMIT DATA BY FILTER ---------- */

if(filter==="1h") entries = entries.slice(-60);
if(filter==="24h") entries = entries.slice(-288);
if(filter==="7d") entries = entries.slice(-1000);
if(filter==="30d") entries = entries.slice(-4000);


/* ---------- LABELS ---------- */

const times = entries.map(([timestamp])=>{

const date = new Date(Number(timestamp)*1000);

if(filter==="30d"){
return `${date.getDate()}/${date.getMonth()+1}`;
}

return `${date.getHours()}:${String(date.getMinutes()).padStart(2,"0")}`;

});


const values = entries.map(([k,v]) => ({
ph: Number(v.ph) || 0,
tds: Number(v.tds) || 0,
ec: Number(v.ec) || 0,
pump: Number(v.pump) || 0,
light: Number(v.light) || 0
}));


setLabels(times.length > 1 ? times : ["",""]);

const ph = values.map(v=>Number(v.ph) || 0);
const tds = values.map(v=>Number(v.tds) || 0);
const ec = values.map(v=>Number(v.ec) || 0);
const pump = values.map(v=>Number(v.pump) || 0);
const light = values.map(v=>Number(v.light) || 0);

setPhData(ph.length > 1 ? ph : [ph[0] || 0, ph[0] || 0]);
setTdsData(tds.length > 1 ? tds : [tds[0] || 0, tds[0] || 0]);
setEcData(ec.length > 1 ? ec : [ec[0] || 0, ec[0] || 0]);

setPumpData(pump.length > 1 ? pump : [pump[0] || 0, pump[0] || 0]);
setLightData(light.length > 1 ? light : [light[0] || 0, light[0] || 0]);


});

return ()=>unsubscribe();

},[filter]);


/* ---------- CHART CONFIG ---------- */

const chartConfig = {

backgroundGradientFrom:"#fff",
backgroundGradientTo:"#fff",

decimalPlaces:2,

color:(opacity=1)=>`rgba(46,125,50,${opacity})`,

labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`

};


/* ---------- CHART ---------- */

const renderChart=(title,data)=>(

<View style={styles.chartCard}>

<Text style={styles.chartTitle}>{title}</Text>

<ScrollView horizontal>

<LineChart
data={{
labels: labels.length ? labels : [""],
datasets:[{data: data.length ? data : [0]}]
}}
width={Math.max(screenWidth, labels.length*60)}
height={220}
chartConfig={chartConfig}
bezier
/>

</ScrollView>

</View>

);


/* ---------- UI ---------- */

return(

<ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

<Text style={styles.title}>Statistics</Text>

<View style={styles.filterRow}>

<TouchableOpacity
style={[styles.filterButton, filter==="1h" && styles.filterActive]}
onPress={()=>setFilter("1h")}
>
<Text style={styles.filterText}>1H</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.filterButton, filter==="24h" && styles.filterActive]}
onPress={()=>setFilter("24h")}
>
<Text style={styles.filterText}>24H</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.filterButton, filter==="7d" && styles.filterActive]}
onPress={()=>setFilter("7d")}
>
<Text style={styles.filterText}>7D</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.filterButton, filter==="30d" && styles.filterActive]}
onPress={()=>setFilter("30d")}
>
<Text style={styles.filterText}>1M</Text>
</TouchableOpacity>

</View>

{renderChart("pH Level",phData)}
{renderChart("TDS",tdsData)}
{renderChart("EC",ecData)}

{renderChart("Pump Power Usage",pumpData)}
{renderChart("Light Power Usage",lightData)}

</ScrollView>

);

}
