import colors from "tailwindcss/colors";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Section from "../components/common/Section";
import { formatDateTime, timeDiff } from "../support/utils";
import TranslatableText from "../components/common/TranslatableText";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import LangAwareView from "../components/common/LangAwareView";

interface RentedCarsProps {

}

interface RentedCarProps {

}

function RentedCar({}: RentedCarProps): React.JSX.Element {
  return <Section>
    <LangAwareView className="gap-2 items-center">
      <MaterialIconsIcon name="person-outline" size={30} />
      <Text className={'text-lg'}>Client ben client</Text>
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <IoniconsIcon name="car-sport-outline" size={30} />
      <Text className={'text-lg'}>Lambroghini Gallardo</Text>
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <MaterialIconsIcon name="numbers" size={30} />
      <Text className={'text-lg'}>64 tn 1999</Text>
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <EvilIconsIcon name='calendar' size={30} />
      <TranslatableText className="text-lg" data={'client:days_rented'} params={{ days: timeDiff(1720612608, 1721303808) }} />
    </LangAwareView>

    <Text className={'text-lg'}>{formatDateTime(1720612608)} - {formatDateTime(1721303808)}</Text>

    <LangAwareView className="gap-2 items-center">
      <MaterialCommunityIconsIcon name='cash-check' size={30}  color={colors.green[500]} />
      <TranslatableText className="text-lg" data={'client:payment_payed'} params={{ amount: 350 }} />
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <MaterialCommunityIconsIcon name='cash-remove' size={30} color={colors.red[500]}/>
      <TranslatableText className="text-lg" data={'client:payment_not_payed'} params={{ amount: 700 }} />
    </LangAwareView>
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