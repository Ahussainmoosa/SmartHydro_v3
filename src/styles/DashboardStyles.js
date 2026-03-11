import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#DDE8D8",
paddingTop:60,
alignItems:"center"
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
}

});