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

const now = Date.now()/1000;

const filtered = Object.entries(data)
.filter(([timestamp])=>{

const time = parseInt(timestamp);

if(filter==="1h") return now-time < 3600;
if(filter==="24h") return now-time < 86400;
if(filter==="7d") return now-time < 604800;

return true;

})
.sort((a,b)=>a[0]-b[0]);

const times = filtered.map(([timestamp])=>{
const date = new Date(timestamp*1000);
return `${date.getHours()}:${String(date.getMinutes()).padStart(2,"0")}`;
});

const values = filtered.map(([k,v])=>v);

setLabels(times);

setPhData(values.map(v=>v.ph ?? 0));
setTdsData(values.map(v=>v.tds ?? 0));
setEcData(values.map(v=>v.ec ?? 0));

setPumpData(values.map(v=>v.pump ?? 0));
setLightData(values.map(v=>v.light ?? 0));

});

return ()=>unsubscribe();

},[filter]);

const chartConfig = {

backgroundGradientFrom:"#fff",
backgroundGradientTo:"#fff",

decimalPlaces:2,

color:(opacity=1)=>`rgba(46,125,50,${opacity})`,

labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`

};

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

</View>

{renderChart("pH Level",phData)}
{renderChart("TDS",tdsData)}
{renderChart("EC",ecData)}

{renderChart("Pump Power Usage",pumpData)}
{renderChart("Light Power Usage",lightData)}

</ScrollView>

);

}