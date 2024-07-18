import { View, StyleSheet, Text, ScrollView } from "react-native";
import Section from "../components/common/Section";
import { formatDateTime, timeDiff } from "../support/utils";
import TranslatableText from "../components/common/TranslatableText";

interface RentedCarsProps {

}

interface RentedCarProps {

}

function RentedCar({}: RentedCarProps): React.JSX.Element {
  return <Section>
    <Text>Client ben client</Text>
    <Text>Lambroghini Gallardo - 64 tn 1999</Text>
    <Text>{formatDateTime(1720612608)} - {formatDateTime(1721303808)}</Text>
    <TranslatableText data={'client:days_rented'} params={{ days: timeDiff(1720612608, 1721303808) }} />
    <TranslatableText data={'client:payment_made'} params={{ amount: 350 }} />
    <TranslatableText data={'client:payment_left'} params={{ amount: 700 }} />
  </Section>
}

// TODO:
export default function RentedCarsScreen({}: RentedCarsProps): React.JSX.Element {
  return (<View style={styles.container}>
    <ScrollView>
      <RentedCar />
      <RentedCar />
      <RentedCar />
      <RentedCar />
    </ScrollView>
  </View>);
}

const styles = StyleSheet.create({
  container: {
  },
});