import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

const BannerDate = () => {
    const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
      const updateDateTime = () => {
      const now = new Date();
      const date = formatDate(now);
      const time = now.toLocaleTimeString();
      setCurrentDate(date);
      setCurrentTime(time);
    };

    // Update the date and time immediately
    updateDateTime();

    // Set up an interval to update the time every second
    const timer = setInterval(updateDateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
        <View style={styles.datetime}>
        <Text style={styles.datetimetext}> {currentDate} </Text>
        <Text style={styles.datetimetext}> {currentTime} </Text>
        </View>
         
  );
};
const styles = StyleSheet.create({
    datetime : {
        flexDirection:'column',
        marginHorizontal:"43.5%",
        marginVertical:"1%",   
    
      },
      datetimetext : {
        fontSize: 20,
        fontWeight: 'bold',
       
      }
    
    });
export default BannerDate;