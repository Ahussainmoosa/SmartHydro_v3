import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/SplashStyles";

export default function SplashScreen({ navigation }) {

return (

<View style={styles.container}>

<View style={styles.circleTop} />
<View style={styles.circleBottom} />

<Image
source={require("../assets/logo.png")}
style={styles.logo}
/>

<Text style={styles.title}>
Smart Hydroponic
</Text>

<Text style={styles.description}>
Automate your plants 🌱{"\n"}
Monitor. Nourish. Grow.
</Text>

<TouchableOpacity
style={styles.button}
onPress={() => navigation.navigate("Login")}
>

<Text style={styles.buttonText}>
GET STARTED →
</Text>

</TouchableOpacity>

</View>

);

}