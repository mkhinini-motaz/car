import RNBounceable from "@freakycoder/react-native-bounceable";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text } from "react-native";
import Section from "../common/Section";
import LangAwareView from "../common/LangAwareView";
import TranslatableText from "../common/TranslatableText";

interface RentedCarsProps {

}

// TODO
export default function RentedCars({}: RentedCarsProps): React.JSX.Element {
  return (
    <Section>
      <LangAwareView className="gap-5 items-center">
        <IoniconsIcon name="car-sport-outline" size={30} />
        <TranslatableText data={'car:rented'} params={{ amount: 27 }} className="text-lg" />
      </LangAwareView>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});