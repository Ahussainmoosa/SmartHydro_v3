import * as Notifications from "expo-notifications";

export async function sendAlert(title,message){

await Notifications.scheduleNotificationAsync({

content:{
title,
body:message
},

trigger:null

});

}