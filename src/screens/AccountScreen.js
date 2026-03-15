import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/AccountStyles";

export default function AccountScreen(){

return(

<ScrollView style={styles.container}>

<Text style={styles.title}>My Account</Text>

<View style={styles.overviewBox}>

<Text style={styles.overviewTitle}>Account Overview</Text>
<Text style={styles.overviewSub}>
Manage your personal information.
</Text>

</View>


{/* USERNAME */}

<View style={styles.infoCard}>

<Ionicons name="person" size={22} color="#43a047"/>

<View style={styles.infoText}>

<Text style={styles.label}>Username</Text>
<Text style={styles.value}>Ebrahim</Text>

</View>

</View>


{/* EMAIL */}

<View style={styles.infoCard}>

<Ionicons name="mail" size={22} color="#43a047"/>

<View style={styles.infoText}>

<Text style={styles.label}>Email</Text>
<Text style={styles.value}>example@gmail.com</Text>

</View>

</View>


{/* PHONE */}

<View style={styles.infoCard}>

<Ionicons name="call" size={22} color="#43a047"/>

<View style={styles.infoText}>

<Text style={styles.label}>Phone</Text>
<Text style={styles.value}>12345678</Text>

</View>

</View>


{/* CHANGE PASSWORD */}

<Text style={styles.sectionTitle}>Change Password</Text>

<TextInput
placeholder="Current Password"
style={styles.input}
/>

<TextInput
placeholder="New Password"
style={styles.input}
/>

<TextInput
placeholder="Confirm New Password"
style={styles.input}
/>


<TouchableOpacity style={styles.button}>
<Text style={styles.buttonText}>
Update Password
</Text>
</TouchableOpacity>


</ScrollView>

);

}