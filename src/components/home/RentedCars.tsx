import { View, StyleSheet, Text } from "react-native";

interface RentedCarsProps {

}

export default function RentedCars({}: RentedCarsProps): React.JSX.Element {
  return (<View style={styles.container}>
    <Text>X cars rented</Text>
  </View>);
}

const styles = StyleSheet.create({
  container: {
  },
});