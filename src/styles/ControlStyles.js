import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#E6EFE6"
},

scrollContent:{
paddingTop:60,
paddingHorizontal:20,
paddingBottom:60
},

title:{
fontSize:26,
fontWeight:"700",
color:"#2E7D32",
marginBottom:20,
textAlign:"center"
},

card:{
backgroundColor:"#FFFFFF",
borderRadius:20,
padding:20,
marginBottom:20,
shadowColor:"#000",
shadowOpacity:0.1,
shadowRadius:6,
elevation:3
},

row:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

cardTitle:{
fontSize:18,
fontWeight:"600",
color:"#2E7D32"
},

goodStatus:{
color:"#2E7D32",
fontWeight:"700",
marginTop:10,
marginBottom:10
},

bigText:{
fontSize:22,
fontWeight:"700",
color:"#333"
},

desc:{
fontSize:13,
color:"#777",
marginTop:8
},

locked:{
opacity:0.4
},

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between",
marginBottom:20
},

controlCard:{
width:"48%",
backgroundColor:"#2e7d32",
padding:20,
borderRadius:14,
alignItems:"center",
marginBottom:15
},

active:{
backgroundColor:"#1b5e20"
},

controlText:{
color:"#fff",
fontWeight:"600",
marginTop:8
},

});