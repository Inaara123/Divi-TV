import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import PatientList from './PatientList';
import TableTitle from './TableTitle';
import Banner from './Banner';

export default function App() {
  return (
    <View style={styles.container}>


      <Banner />
      <TableTitle />

      <PatientList />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
