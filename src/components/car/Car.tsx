import {default as CarClass} from '../../classes/Car';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Section from "../../components/common/Section";
import { formatDate, formatDateTime, timeDiff } from "../../support/utils";
import TranslatableText from "../../components/common/TranslatableText";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import LangAwareView from "../../components/common/LangAwareView";
import MoneyFormatter from '../common/MoneyFormatter';

export interface CarProps {
  data: CarClass
}

export default function Car({ data }: CarProps): JSX.Element {
  return (<Section>
    <LangAwareView className="gap-2 items-center">
      <IoniconsIcon name="car-sport-outline" size={30} />
      <Text className={'text-lg'}>{data.manufacturer + ' - ' + data.model_name + ' - ' + data.model_year}</Text>
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <MaterialIconsIcon name="numbers" size={30} />
      <Text className={'text-lg'}>{data.licence_plate}</Text>

      <MaterialCommunityIconsIcon name="horse" size={30} />
      <Text className={'text-lg'}>{data.fiscal_horse_power}</Text>

      <MaterialCommunityIconsIcon name="cylinder" size={30} />
      <Text className={'text-lg'}>{data.number_of_cylinders}</Text>
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <MaterialIconsIcon name="local-gas-station" size={30} />
      <TranslatableText data={'car:fuel_type:' + data.fuel_type} className='text-lg' />
      <FontAwesomeIcon name="gears" size={30} />
      <TranslatableText data={'car:transmission_type:' + data.transmission_type} className='text-lg' />
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <FontAwesome5Icon name="money-bill-wave" size={30} />
      <MoneyFormatter data={data.daily_price} className='text-lg' />
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <TranslatableText data={'car:circulation_tax_ends_at'} params={{ date: formatDate(data.circulation_tax_ends_at) }} className='text-lg' />
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <TranslatableText data={'car:insurance_ends_at'} params={{ date: formatDate(data.insurance_ends_at) }} className='text-lg' />
    </LangAwareView>

    <LangAwareView className="gap-2 items-center">
      <TranslatableText data={'car:technical_control_ends_at'} params={{ date: formatDate(data.technical_control_ends_at) }} className='text-lg' />
    </LangAwareView>
  </Section>);
}