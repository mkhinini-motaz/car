import { FlatList, View, SafeAreaView, Text } from 'react-native';
import { index } from '../api/car';
import { alertNetworkError } from '../support/alert';
import { useQuery } from 'react-query';
import { useLang } from '../store/hooks';
import {default as CarClass} from '../classes/Car';
import Car from '../components/car/Car';
import FullScreenLoader from '../components/common/FullScreenLoader';
import { ScrollView } from 'react-native-gesture-handler';

export default function CarsScreen(): JSX.Element {
  const { selectedLang } = useLang();
  const { isLoading, error, data } = useQuery('car.index', index, {
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
          data={data}
          className='px-3'
          renderItem={({ item }) => <Car data={item} showDetails />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
