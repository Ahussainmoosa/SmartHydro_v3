import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#DDE8D8",
paddingTop:60,
paddingHorizontal:20
},

title:{
fontSize:26,
fontWeight:"700",
color:"#1B5E20",
marginBottom:30
},

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"center"
},

card:{
backgroundColor:"#FFFFFF",
width:150,
height:120,
borderRadius:20,
margin:10,
justifyContent:"center",
alignItems:"center",
shadowColor:"#000",
shadowOpacity:0.2,
shadowRadius:5,
elevation:5
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

sectionTitle:{
fontSize:22,
fontWeight:"700",
marginTop:20,
color:"#1B5E20"
},

controlGrid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"center",
marginTop:10
},

controlButton:{
backgroundColor:"#1E8E3E",
padding:15,
borderRadius:20,
margin:10,
width:140,
alignItems:"center"
},

controlText:{
color:"#fff",
fontWeight:"600"
},

welcomeBox:{
backgroundColor:"#CFE3CF",
width:"90%",
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

plantBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFFFFF",
padding:15,
borderRadius:20,
width:"90%",
marginBottom:20
},

plantImage:{
width:40,
height:40,
marginRight:15
},

plantSubtitle:{
fontSize:12,
color:"#6B7C6F"
},

controlButtonActive:{
backgroundColor:"#2E7D32"
},

scrollContent:{
paddingBottom:40,
alignItems:"center"
},

plantLimits:{
fontSize:12,
color:"#6B7C6F",
marginTop:4
},

});