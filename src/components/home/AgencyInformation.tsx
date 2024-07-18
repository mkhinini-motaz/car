import { StyleSheet, Text } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Section from "../common/Section";
import { formatLocalPhoneNumber } from "../../support/utils";

interface AgencyInformationProps {

}

// TODO
export default function AgencyInformation({}: AgencyInformationProps): React.JSX.Element {
  return (<RNBounceable>
    <Section>
      <Text>M'saken rent a car</Text>
      <Text>{formatLocalPhoneNumber('+21623456109')}</Text>
    </Section>
  </RNBounceable>);
}

const styles = StyleSheet.create({
  container: {
  },
});