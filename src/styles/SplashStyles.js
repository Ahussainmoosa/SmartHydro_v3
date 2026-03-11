import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background,
alignItems:"center",
justifyContent:"center"
},

circleTop:{
position:"absolute",
width:250,
height:250,
borderRadius:125,
backgroundColor:colors.secondary,
opacity:0.4,
top:-80,
left:-80
},

circleBottom:{
position:"absolute",
width:250,
height:250,
borderRadius:125,
backgroundColor:colors.secondary,
opacity:0.4,
bottom:-80,
right:-80
},

logo:{
width:140,
height:140,
resizeMode:"contain"
},

title:{
fontSize:28,
fontWeight:"700",
color:colors.textDark,
marginTop:20
},

description:{
fontSize:16,
color:colors.textLight,
textAlign:"center",
marginTop:10
},

button:{
backgroundColor:colors.primary,
paddingVertical:16,
paddingHorizontal:40,
borderRadius:30,
marginTop:60
},

buttonText:{
color:"#fff",
fontWeight:"600",
fontSize:16
}

});