import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#DDE8D8",
paddingTop:60,
paddingHorizontal:20
},

scrollContent:{
paddingBottom:40,
alignItems:"center"
},

/* TOP BAR */

topBar:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
paddingHorizontal:15,
paddingTop:45,
paddingBottom:10,
backgroundColor:"#fff",
borderBottomWidth:1,
borderColor:"#eee"
},

topLeft:{
flexDirection:"row",
alignItems:"center"
},

logoSmall:{
width:24,
height:24,
marginRight:8
},

topTitle:{
fontSize:20,
fontWeight:"600",
color:"#333"
},

menuButton:{
padding:4
},

/* WELCOME */

welcomeBox:{
backgroundColor:"#CFE3CF",
width:"100%",
padding:20,
borderRadius:20,
marginBottom:15
},

welcomeTitle:{
fontSize:22,
fontWeight:"700",
color:"#1B5E20"
},

welcomeSubtitle:{
fontSize:14,
color:"#4F6F52",
marginTop:5
},

/* PLANT */

plantBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFFFFF",
padding:15,
borderRadius:20,
width:"100%",
marginBottom:20
},

plantImage:{
width:40,
height:40,
marginRight:15
},

plantLimits:{
fontSize:12,
color:"#6B7C6F",
marginTop:4
},

plantSubtitle:{
fontSize:12,
color:"#6B7C6F"
},

/* SENSOR GRID */

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},

card:{
backgroundColor:"#fff",
padding:15,
marginBottom:15,
borderRadius:12,
alignItems:"center",
justifyContent:"center",
width:"47%",
elevation:2
},

cardTitle:{
fontSize:16,
color:"#6B7C6F"
},

cardValue:{
fontSize:26,
fontWeight:"700",
color:"#1B5E20"
},

/* AI SCAN */

scanContainer:{
flexDirection:"row",
justifyContent:"space-between",
marginVertical:15
},

scanButton:{
flex:1,
backgroundColor:"#2e7d32",
marginHorizontal:5,
padding:15,
borderRadius:10,
alignItems:"center",
flexDirection:"row",
justifyContent:"center"
},

scanButtonText:{
color:"#fff",
marginLeft:8,
fontWeight:"600"
},

/* AI RESULT */

resultBox:{
backgroundColor:"#e8f5e9",
padding:15,
borderRadius:10,
marginBottom:20,
width:"100%"
},

resultTitle:{
fontSize:16,
fontWeight:"600",
marginBottom:5
},

resultText:{
fontSize:18,
color:"#2e7d32",
fontWeight:"bold"
},

/* DRAWER */

drawerContainer:{
flex:1,
backgroundColor:"#ffffff",
paddingTop:60,
paddingHorizontal:25
},

drawerHeader:{
alignItems:"center",
marginBottom:40
},

drawerLogo:{
width:55,
height:55,
marginBottom:10
},

drawerTitle:{
fontSize:20,
fontWeight:"600",
color:"#2e7d32"
},

drawerItem:{
flexDirection:"row",
alignItems:"center",
paddingVertical:16
},

drawerText:{
fontSize:16,
marginLeft:15,
color:"#333"
},

drawerDivider:{
height:1,
backgroundColor:"#eee",
marginVertical:25
},

/* MODAL */

modalBox:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"rgba(0,0,0,0.4)"
},

modalCard:{
backgroundColor:"#fff",
padding:25,
borderRadius:10,
width:280
},

modalTitle:{
fontSize:18,
fontWeight:"600",
marginBottom:15
},

diseaseName:{
fontSize:22,
fontWeight:"700",
color:"#c62828",
marginTop:5
},

confidenceText:{
fontSize:14,
color:"#555",
marginBottom:10
},

treatmentBox:{
backgroundColor:"#ffffff",
padding:12,
borderRadius:8,
marginTop:10
},

treatmentTitle:{
fontSize:16,
fontWeight:"600",
marginBottom:4
},

treatmentText:{
fontSize:14,
color:"#444"
},

healthBox:{
backgroundColor:"#ffffff",
padding:20,
borderRadius:15,
marginBottom:20,
alignItems:"center",
width:"100%"
},

healthTitle:{
fontSize:18,
fontWeight:"600",
marginBottom:10
},

healthValue:{
fontSize:36,
fontWeight:"700",
color:"#2e7d32"
},

healthStatus:{
marginTop:5,
fontSize:16
},

preview:{
width:"100%",
height:180,
borderRadius:12,
marginVertical:10
},

loadingBox:{
alignItems:"center",
marginVertical:20
},

loadingText:{
marginTop:10,
fontSize:14,
color:"#555"
},

diseaseBadge:{
backgroundColor:"#ff7043",
paddingVertical:6,
paddingHorizontal:14,
borderRadius:20,
alignSelf:"flex-start",
marginBottom:10
},

badgeText:{
color:"#fff",
fontWeight:"bold"
},

healthBar:{
height:14,
backgroundColor:"#e0e0e0",
borderRadius:10,
overflow:"hidden",
marginVertical:8
},

healthFill:{
height:14,
backgroundColor:"#4caf50"
},

clearButton:{
position:"absolute",
top:10,
right:10,
backgroundColor:"#ef5350",
padding:6,
borderRadius:20,
zIndex:10
},


});