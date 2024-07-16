import React from 'react';
import {StyleSheet, View, Text,Image } from 'react-native';

const BannerLogo = () => {
  return (
    <Image style={styles.logo} source={require('./assets/images/divilogodoc.png')}></Image>   

  );
};
const styles = StyleSheet.create({
    logo : {
        width:"40%",
        resizeMode:"contain",
        marginHorizontal:"-5%",
        marginVertical:"-12%",
    
      },
});

export default BannerLogo;
