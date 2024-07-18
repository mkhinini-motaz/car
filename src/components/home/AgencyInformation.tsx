import { StyleSheet, Text } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Section from "../common/Section";
import { formatLocalPhoneNumber } from "../../support/utils";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { COLOR_PRIMARY } from "../../constants";
import LangAwareView from "../common/LangAwareView";

interface AgencyInformationProps {

}

// TODO
export default function AgencyInformation({}: AgencyInformationProps): React.JSX.Element {
  return (
    <Section>
      <Text className={'text-xl text-center'}>M'saken rent a car</Text>
      <LangAwareView className={'gap-5'}>
        <SimpleLineIcon name={'phone'} size={30} />
        <Text className={'text-lg'}>{formatLocalPhoneNumber('+21623456789')}</Text>
      </LangAwareView>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});