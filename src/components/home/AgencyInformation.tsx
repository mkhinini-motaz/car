import { View, StyleSheet, Text } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface AgencyInformationProps {

}

export default function AgencyInformation({}: AgencyInformationProps): React.JSX.Element {
  return (<RNBounceable>
    <View style={styles.container}>
      <Text>Agency Name</Text>
      <Text>Agency numbers</Text>
    </View>
  </RNBounceable>);
}

const styles = StyleSheet.create({
  container: {
  },
});