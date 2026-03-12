import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/PlantStyles";

import { getDatabase, ref, set } from "firebase/database";
import app from "../config/firebase";

const db = getDatabase(app);

export default function PlantsScreen({ navigation }) {

const selectPlant = (plant) => {

set(ref(db,"System/plant"),plant);

navigation.goBack();

};

return(

<View style={styles.container}>

<Text style={styles.title}>
Select Plant
</Text>

<TouchableOpacity
style={styles.plantItem}
onPress={()=>selectPlant("lettuce")}
>

<Image
source={require("../assets/plants/lettuce.png")}
style={styles.plantImage}
/>

<Text style={styles.plantName}>
Lettuce
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.plantItem}
onPress={()=>selectPlant("mint")}
>

<Image
source={require("../assets/plants/mint.png")}
style={styles.plantImage}
/>

<Text style={styles.plantName}>
Mint
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.plantItem}
onPress={()=>selectPlant("basil")}
>

<Image
source={require("../assets/plants/basil.png")}
style={styles.plantImage}
/>

<Text style={styles.plantName}>
Basil
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.plantItem}
onPress={()=>selectPlant("tomato")}
>

<Image
source={require("../assets/plants/tomato.png")}
style={styles.plantImage}
/>

<Text style={styles.plantName}>
Tomato
</Text>

</TouchableOpacity>

</View>

);

}