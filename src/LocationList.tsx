import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {RootState} from './redux/rootReducer';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

function LocationList(): JSX.Element {
  const requestLocationServicesPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location ?',
          buttonNeutral: 'ASK ME LATER',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };


  const getGeoLocations = async() => {
    console.log('this function is called after 2 secs');
    const results = await requestLocationServicesPermission();
    console.log(results);
      if(results === true){
        const position : any = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        });
        const latitude = position.latitude;
        const longitude = position.longitude;
        // getLocationDetails(latitude,longitude);
      }
    }
  
  // const getLocationDetails =async (latitude:any,longitude:any) => {
  //       const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR-API-KEY`)
  //       console.log(res.data);
  // }
  useEffect(() => {
    const interval = setInterval(getGeoLocations, 5*60*5000);
    return () => clearInterval(interval);
  },[])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.currentItem}>
          <Text style={{fontSize:25, fontWeight:'800', textTransform:'uppercase', color:'#8B4513'}}>Current Location Details</Text>
            <Text style={styles.text}>Current Location : </Text>
            <Text style={styles.text}>Current time : </Text>
        </View>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    marginTop:30
  },
  currentItem:{
    borderColor:' #2ECC40 ',
    borderWidth:1,
    borderRadius:8,
  },
  text:{
    // fontFamily:'san',
    fontWeight:'600',
    fontSize:20,
    color:'#FF851B',
    marginTop:6,
    borderBottomColor:'#999',
    borderWidth:1,
    borderTopColor:'#fff'


  }
});

export default LocationList;
