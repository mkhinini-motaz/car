import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import I18nSelect from '../components/common/I18nSelect';
import TranslatableText from '../components/common/TranslatableText';
import AgencyInformation from '../components/home/AgencyInformation';
import RentedCars from '../components/home/RentedCars';
import ContractsCalendar from '../components/home/ContractsCalendar';

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AgencyInformation />
        <ContractsCalendar />
        <RentedCars />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});