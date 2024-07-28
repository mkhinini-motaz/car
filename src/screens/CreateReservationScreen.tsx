import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import SearchField from '../components/Form/SearchField';
import Car from '../components/car/Car';
import { index } from '../api/car';
import DateTimeField from '../components/Form/DateTimeField';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function CreateReservationScreen(): JSX.Element {
  const onSelect = (item) => {
    console.log('#1#### ') 
    console.log(item)
    console.log('#1#### ') 
  }
  const [startsAt, setStartsAt] = useState(new Date());
  const [endsAt, setEndsAt] = useState(new Date());
  const queryKey = ['car.index.search', { starts_at: startsAt.getTime() / 1000, ends_at: endsAt.getTime() / 1000 }];

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='h-full px-3'>
          {/** TODO: starts_at, ends_at */}
          <DateTimeField label='contract:starts_at' value={startsAt} onChange={setStartsAt} />
          {/** TODO: starts_at, ends_at */}
          <DateTimeField label='contract:ends_at' value={endsAt} onChange={setEndsAt} />
          <SearchField label={'car:label'} queryKey={queryKey} queryFunction={index} renderItem={({ item }) => <Car data={item} />} keyExtractor={(item) => item.id } onSelect={onSelect} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

