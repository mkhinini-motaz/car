import RNBounceable from "@freakycoder/react-native-bounceable";
import { View, StyleSheet, Text } from "react-native";
import Section from "../common/Section";

interface RentedCarsProps {

}

// TODO
export default function RentedCars({}: RentedCarsProps): React.JSX.Element {
  return (<RNBounceable>
    <Section>
      <Text>X cars rented</Text>
    </Section>
  </RNBounceable>);
}

const styles = StyleSheet.create({
  container: {
  },
});