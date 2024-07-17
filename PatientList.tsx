import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

const PatientList = () => {
    const [loading, setLoading] = useState(true);
    const [allPatients, setAllPatients] = useState([]);
    const [displayedPatients, setDisplayedPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [tejaCurrent, setTejaCurrent] = useState(0);
    const [arjunCurrent, setArjunCurrent] = useState(0);
    const [pretCurrent, setPretCurrent] = useState(0);



    useEffect(() => {
        const patientDbRef = ref(database, 'reception/patient');
        const rootDbRef = ref(database, '/');
    
        const fetchData = () => {
            // Listener for patient data
            onValue(patientDbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const list = [];
                    
                    Object.keys(data).forEach(innerKey => {
                        if (!data[innerKey].deleted) {
                            list.push({
                                id: innerKey,
                                ...data[innerKey]
                            });
                        }
                    });
                    
                    console.log("Patient list:", list);
    
                    const uniqueList = list.reduce((acc, current) => {
                        const x = acc.find(item => item.id === current.id);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);
    
                    setAllPatients(uniqueList);
                    setDisplayedPatients(uniqueList.slice(0, 10));
                } else {
                    setAllPatients([]);
                    setDisplayedPatients([]);
                }
                setLoading(false);
            });
    
            // Listener for root data (tejacurrentcount)
            onValue(rootDbRef, (snapshot) => {
                const rootData = snapshot.val();
                if (rootData && ( rootData.tejacurrentcount) !== undefined) {
                    setTejaCurrent(rootData.tejacurrentcount);}
                    console.log("Theja Current count:", rootData.tejacurrentcount);
                if (rootData && ( rootData.arjuncurrentcount) !== undefined) {
                    // setTejaCurrent(rootData.arjuncurrentcount);
                    console.log(" Arjun Current count:", rootData.arjuncurrentcount);
                    setArjunCurrent(rootData.arjuncurrentcount);
                    // Do something with the tejacurrentcount here, e.g.,
                    // setCurrentCount(rootData.tejacurrentcount);
                }
            });
        };
    
        fetchData();
    
        // Cleanup function to detach both listeners
        return () => {
            off(patientDbRef);
            off(rootDbRef);
        };
    }, []);



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => {
                const totalItems = allPatients.length;
               
            const itemsPerPage = 10;
            console.log("total items : ",totalItems)
            // Ensure totalPages is at least 1 to avoid division by zero
            const totalPages = ( Math.ceil(totalItems / itemsPerPage));
            console.log("total pages : ",totalPages)
            if(totalPages==1){
                return 0;
            }else{

                const nextPage = (prevPage + 1) % totalPages;
                const start = nextPage * 10;
                console.log(start)
                const end = start + 10;
                console.log(end)
                setDisplayedPatients(allPatients.slice(start, end));
                console.log('start : ',start)
                return nextPage;
            }
            });
        }, 6000);

        return () => clearInterval(interval);
    }, [allPatients]);
    console.log("currenyt page : ",currentPage)
    const renderItem = ({ item,index }) => (
       
        <View style={{flexDirection: 'row'}}>
            <View style={{width: 70}}>
                <Text style={styles.textfont}> {index+1}</Text>
            </View>
            <View style={{width: 200}}>
                <Text style={styles.textfont}> {item['Patient Name']}</Text>
            </View>
            <View style={{width: 200}}>
                 <Text style={styles.textfont}>{item['Dept value']}</Text>
            </View>
            <View style={{width: 200}}>
            <Text style={styles.textfont}>
  {(() => {
    let currentcountix = item['Dept value'] === 'Gynecology' ? tejaCurrent : 
    item['Dept value'] === 'Dermatology' ? arjunCurrent : 
    undefined; // Default case if needed
  
    const difference = item['Waiting Number'] - currentcountix;
    console.log("difference : ",difference)
    console.log("theja current : ",tejaCurrent)
    console.log("item['Waiting Number'] : ",item['Waiting Number'])
    if (difference === 0) {
      return 'In Consultation';
    } else if (difference === 1) {
      return 'Next';
    } else if (difference > 1) {
      return difference.toString();
    } else {
      return 'N/A';  // For negative differences or other unexpected cases
    }
  })()}
</Text>
            </View>
            <View style={{width: 200}}>
                <Text style={styles.textfont}>{item['Consulting Doctor']}</Text>
            </View>
        </View>
       
    );

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.patientlist}>
            <FlatList
                data={displayedPatients}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={true}     
            />
        </View>
    );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignContent : 'space-between',
      padding : 15,
      marginTop : '-2%',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    },
    patientlist : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding : 25,
        marginTop : '-0.75%',

    },
    item: {
      padding: 10,
      flexDirection : 'row',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent : 'space-between',
      borderBottomColor: '#ccc',
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textfont :{
        fontSize : 17,

        borderBottomWidth : 2,
        paddingBottom : 12,
        borderBottomColor : '#ccc',
        textAlign : 'center',
  
    }
  });
  

  
  export default PatientList;