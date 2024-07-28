import {default as ContractClass} from '../../classes/Contract';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Section from "../../components/common/Section";
import { formatDate, formatDateTime, formatMoneyDisplay, timeDiff } from "../../support/utils";
import TranslatableText from "../../components/common/TranslatableText";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import LangAwareView from "../../components/common/LangAwareView";
import MoneyFormatter from '../common/MoneyFormatter';
import Car from './Car';
import { useLang } from '../../store/hooks';

export interface ContractProps {
  data: ContractClass
}

export default function Contract({ data }: ContractProps): JSX.Element {
  const days = timeDiff(data.starts_at, data.ends_at);
  const { selectedLang } = useLang();

  return (<Section>
    <TranslatableText data={'car:contract:starts_at'} params={{ date: formatDate(data.starts_at) }} className='text-lg' />
    <TranslatableText data={'car:contract:ends_at'} params={{ date: formatDate(data.ends_at) }} className='text-lg' />
    <TranslatableText data={'car:daily_price'} params={{ price: formatMoneyDisplay(data.daily_price, selectedLang) }} className='text-lg' />
    <LangAwareView>
      <TranslatableText data={'client:days_rented'} params={{ days }} className={'text-lg'} />
      <Text className={'text-lg'}> - </Text>
      <MoneyFormatter data={data.daily_price * days} className={'text-lg'} />
    </LangAwareView>
  </Section>);
}