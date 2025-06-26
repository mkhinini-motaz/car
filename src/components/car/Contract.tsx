import {default as ContractClass} from '../../classes/Contract';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Section from "../../components/common/Section";
import { formatDate, formatDateTime, formatMoneyDisplay, diffInDays } from "../../support/utils";
import TranslatableText from "../../components/common/TranslatableText";
import LangAwareView from "../../components/common/LangAwareView";
import MoneyFormatter from '../common/MoneyFormatter';
import Car from './Car';
import { useLang } from '../../store/hooks';

export interface ContractProps {
  data: ContractClass
}

export default function Contract({ data }: ContractProps): JSX.Element {
  const days = diffInDays(data.starts_at, data.ends_at);
  const { selectedLang } = useLang();

  return (<Section>
    {data.car && <Car data={data.car} withColor />}
    <TranslatableText data={'car:contract:starts_at'} params={{ date: formatDateTime(data.starts_at) }} className='text-lg' />
    <TranslatableText data={'car:contract:ends_at'} params={{ date: formatDateTime(data.ends_at) }} className='text-lg' />
    <TranslatableText data={'car:daily_price'} params={{ price: formatMoneyDisplay(data.daily_price, selectedLang) }} className='text-lg' />
    <LangAwareView>
      <TranslatableText data={'client:days_rented'} params={{ days }} className={'text-lg'} />
      <Text className={'text-lg'}> - </Text>
      <MoneyFormatter data={data.daily_price * days} className={'text-lg'} />
    </LangAwareView>
  </Section>);
}