import React from 'react';
import BannerDate from './BannerDate';
import BannerLogo from './BannerLogo';
import { StyleSheet,View, Text } from 'react-native';

const Banner = () => {
  return (
    <View style={styles.banner}>
    <BannerLogo/>
    <BannerDate/>
    </View>
  );
};
const styles = StyleSheet.create({
    banner: {
        backgroundColor:'#FFE5F5',
        flexDirection:'row',
        height:'18%',
      },
  });
export default Banner;