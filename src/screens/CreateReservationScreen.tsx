import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import SearchField from '../components/Form/SearchField';
import Car from '../components/car/Car';
import { index } from '../api/car';

export default function CreateReservationScreen(): JSX.Element {
  const onSelect = (item) => {
    console.log('#1#### ') 
    console.log(item)
    console.log('#1#### ') 
  }
  return (
    <SafeAreaView>
      <View className='h-full px-3'>
        <SearchField label={'car:label'} queryKey={'car.index.search'} queryFunction={index} renderItem={({ item }) => <Car data={item} />} keyExtractor={(item) => item.id } onSelect={onSelect} />
      </View>
    </SafeAreaView>
  );
};

