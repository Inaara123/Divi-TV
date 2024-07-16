import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

const PatientList = () => {
    const [loading, setLoading] = useState(true);
    const [allPatients, setAllPatients] = useState([]);
    const [displayedPatients, setDisplayedPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const dbRef = ref(database, 'reception/patient');
        const fetchPatients = () => {
            // This onValue is the reason why i am continuousy listening to changes in Database //
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const list = [];
                    // Object.keys(data).forEach(key => {
                    //     Object.keys(data[key]).forEach(innerKey => {
                    //         // Check if the patient is marked as deleted
                    //         if (!data[key][innerKey].deleted) {
                    //             list.push({
                    //                 id: innerKey,
                    //                 ...data[key][innerKey]
                    //             });
                    //         }
                    //     });
                    // });
                    Object.keys(data).forEach(innerKey => {
                        
                            // Check if the patient is marked as deleted
                            if (!data[innerKey].deleted) {
                                list.push({
                                    id: innerKey,
                                    ...data[innerKey]
                                });
                            }
                        });
                        console.log(list)
                    ;
    
    
                    // Assuming you want to prevent duplicates, ensure list is unique
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
        };
    
        fetchPatients();
    
        // Cleanup function to detach the listener
        return () => {
            off(dbRef);
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
                 <Text style={styles.textfont}>Gynacology</Text>
            </View>
            <View style={{width: 200}}>
                <Text style={styles.textfont}>{item.Area}</Text>
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