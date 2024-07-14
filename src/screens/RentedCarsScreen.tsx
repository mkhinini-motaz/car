import { View, StyleSheet, Text } from "react-native";

interface RentedCarsProps {

}

interface RentedCarProps {

}

function RentedCar({}: RentedCarProps): React.JSX.Element {
  return <View>
    <Text>client name</Text>
    <Text>car brand, model and licence plates</Text>
    <Text>rent start and end</Text>
    <Text>how many days left</Text>
    <Text>how much payement client gave</Text>
    <Text>how much payment left from client</Text>
  </View>
}

export default function RentedCarsScreen({}: RentedCarsProps): React.JSX.Element {
  return (<View style={styles.container}>
    <RentedCar />
    <RentedCar />
    <RentedCar />
    <RentedCar />
  </View>);
}

const styles = StyleSheet.create({
  container: {
  },
});