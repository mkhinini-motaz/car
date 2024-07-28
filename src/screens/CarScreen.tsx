import { FlatList, View, SafeAreaView, Text } from 'react-native';
import { index, show } from '../api/car';
import { alertNetworkError } from '../support/alert';
import { useQuery } from 'react-query';
import { useLang } from '../store/hooks';
import {default as CarClass} from '../classes/Car';
import Car from '../components/car/Car';
import FullScreenLoader from '../components/common/FullScreenLoader';
import { ScrollView } from 'react-native-gesture-handler';
import Contract from '../components/car/Contract';

export default function CarScreen({ route }): JSX.Element {
  const { selectedLang } = useLang();
  const { carId } = route.params;
  const { isLoading, error, data } = useQuery(['car.show', { id: carId }], show, {
    onError: (error) => {
      if (error.code === 'ERR_NETWORK') {
        alertNetworkError(selectedLang);
        return;
      }
    },
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // TODO: implement
  if (error) {
    return (
      <Text>{JSON.stringify(error)}</Text>
    );
  }

  return (
    <SafeAreaView>
      <View className='h-full'>
        <FlatList
          data={data.contracts}
          renderItem={({ item, index }) => <>
            {index === 0 && <Car data={data} showDetails />} 
            <Contract data={item} />
          </>}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
