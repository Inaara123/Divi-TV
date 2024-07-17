import { View, Text,StyleSheet } from 'react-native'
import React from 'react'


const TableTitle = () => {
  return (
   
      <View style={styles.title}>
        <Text style={styles.titleSnotext}>SNO</Text>
        <Text style={styles.titletext}>Patient Name</Text>
        <Text style={styles.titletext}>Department</Text>
        <Text style={styles.titletext}>Status</Text>
        <Text style={styles.titlelasttext}>Consulting Doctor</Text>
      
    </View>
  )
}
const styles = StyleSheet.create({  
    title: {
        flexDirection: 'row',
        backgroundColor : '#9F236E',
        paddingLeft : 25,

    
    },
    titletext : {
        fontWeight : 'bold',
        fontSize : 20,
        width : 200,
        paddingBottom : 10,
        paddingTop : 10,
        textAlign : 'center',   
        color : 'white',
       
        borderBottomWidth : 1,
        borderBottomColor : '#ccc',
    
        
    },
    titleSnotext : {
        fontWeight : 'bold',
        fontSize : 20,
        width : 70,
        borderBottomWidth : 1,
        borderBottomColor : '#ccc',
        textAlign : 'center',
        paddingBottom : 10,
        paddingTop : 10,
        color : 'white',
        paddingHorizontal :10,
       
    
        
    },
    titlelasttext : {
        fontWeight : 'bold',
        fontSize : 20,
        width : 200,
        paddingBottom : 10,
        paddingTop : 10,
        // marginLeft : '3%',
       
        borderBottomWidth : 1,
        borderBottomColor : '#ccc',
        color : 'white',
        textAlign : 'center',
    },
    });

export default TableTitle