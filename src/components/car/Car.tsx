import {default as CarClass} from '../../classes/Car';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Section from "../../components/common/Section";
import { periodsAreEqual, formatDate, formatDateTime, formatMoneyDisplay, diffInDays } from "../../support/utils";
import TranslatableText from "../../components/common/TranslatableText";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import LangAwareView from "../../components/common/LangAwareView";
import MoneyFormatter from '../common/MoneyFormatter';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { useNavigation } from '@react-navigation/native';
import { useLang } from '../../store/hooks';
import ColorHash from 'color-hash';
import Contract from './Contract';
import ContractInPeriod from './ContractInPeriod';
import Availability from './Availability';
import { default as AvailabilityClass } from '../../classes/Availability';
import { ColorValue } from 'react-native';

export interface CarProps {
  data: CarClass
  showDetails?: boolean
  navigatesToCarScreen?: boolean
  withColor?: boolean
  withContracts?: boolean,
  showAvailability?: boolean,
  availabilityIsPressable?: boolean,
  selectedAvailabilities?: AvailabilityClass[],
  onAvailabilityPress?: (period: [number, number]) => void
}

export interface CarPartialProps {
  data: CarClass;
  withColor?: boolean;
  color?: number | ColorValue | undefined;
}

export function CarName({ data, withColor = false, color = undefined }: CarPartialProps) {
  return (
    <LangAwareView className="gap-x-2 items-center">
      <IoniconsIcon name="car-sport-outline" size={30} color={withColor && color} />
      <Text className={'text-lg'}>{
        data.manufacturer + ' - ' +
        data.model_name + ' - ' +
        data.model_year
      }</Text>
    </LangAwareView>
  );
}

export function CarLicencePlates({ data, withColor = false, color = undefined }: CarPartialProps) {
  return (
    <LangAwareView>
      <MaterialIconsIcon name="numbers" size={30} color={withColor && color} />
      <Text className={'text-lg'}>{data.licence_plate}</Text>
    </LangAwareView>
  );
}

export default function Car({ data, showDetails = false, navigatesToCarScreen = false, withColor = false, withContracts = false, showAvailability = false, availabilityIsPressable = false, selectedAvailabilities = [], onAvailabilityPress = () => {} }: CarProps): JSX.Element {
  const { selectedLang } = useLang();
  const { navigate } = useNavigation();
  const onPress = () => {
    if (! navigatesToCarScreen) {
      return;
    }
    navigate('CarScreen', { carId: data.id });
  };
  const colorHash = new ColorHash();
  const color = colorHash.hex(data.licence_plate + '-' + data.id)

  return (
    <RNBounceable disabled={! navigatesToCarScreen} onPress={onPress}>
      <Section>
        <CarName data={data} withColor={withColor} color={color} />

        <LangAwareView className="gap-x-2 items-center">
          <CarLicencePlates data={data} withColor={withColor} color={color} />

          {showDetails ? <LangAwareView className="gap-x-2 items-center">
              <MaterialCommunityIcon name="horse" size={30} color={withColor && color} />
              <Text className={'text-lg'}>{data.fiscal_horse_power}</Text>

              <MaterialCommunityIcon name="cylinder" size={30} color={withColor && color} />
              <Text className={'text-lg'}>{data.number_of_cylinders}</Text>
            </LangAwareView> :
            <LangAwareView className="items-center gap-x-2">
              <FontAwesome5Icon name="money-bill-wave" size={30} color={withColor && color} />
              <TranslatableText data="car:daily_price" params={{ price: formatMoneyDisplay(data.daily_price, selectedLang) }} className='text-lg' />
            </LangAwareView>
          }
        </LangAwareView>

        {showDetails && <LangAwareView className="gap-x-2 items-center">
          <LangAwareView className='gap-x-2'>
            <MaterialIconsIcon name="local-gas-station" size={30} color={withColor && color} />
            <TranslatableText data={'car:fuel_type:' + data.fuel_type} className='text-lg' />
          </LangAwareView>

          <LangAwareView className='gap-x-2'>
            <FontAwesomeIcon name="gears" size={30} color={withColor && color} />
          <TranslatableText data={'car:transmission_type:' + data.transmission_type} className='text-lg' />
          </LangAwareView>
        </LangAwareView>}

        {showDetails && <LangAwareView className="gap-x-2 items-center">
          <FontAwesome5Icon name="money-bill-wave" size={30} color={withColor && color} />
          <TranslatableText data="car:daily_price" params={{ price: formatMoneyDisplay(data.daily_price, selectedLang) }} className='text-lg' />
        </LangAwareView>}

        {showDetails && <>
          <LangAwareView className="gap-x-2 items-center">
            <TranslatableText data={'car:circulation_tax_ends_at'} params={{ date: formatDate(data.circulation_tax_ends_at) }} className='text-lg' />
          </LangAwareView>

          <LangAwareView className="gap-x-2 items-center">
            <TranslatableText data={'car:insurance_ends_at'} params={{ date: formatDate(data.insurance_ends_at) }} className='text-lg' />
          </LangAwareView>

          <LangAwareView className="gap-x-2 items-center">
            <TranslatableText data={'car:technical_control_ends_at'} params={{ date: formatDate(data.technical_control_ends_at) }} className='text-lg' />
          </LangAwareView>
        </>}

        {showDetails && data.total_price &&
          <LangAwareView className="gap-x-2 items-center">
            <FontAwesome5Icon name="money-bill-wave" size={30} color={withColor && color} />
            <TranslatableText data="car:total_price" params={{ price: formatMoneyDisplay(data.total_price, selectedLang) }} className='text-lg' />
          </LangAwareView>
        }

        {showAvailability && data.availability_in_period && <>
          <TranslatableText data={'common:car:availability'} className='text-lg' />
          {data.availability_in_period.map((period, index) =>
            <Availability key={index} data={period} onPress={onAvailabilityPress} isPressable={availabilityIsPressable} isSelected={selectedAvailabilities.filter((availability) => periodsAreEqual(availability.period, period)).length > 0} />
          )}
        </>}

        {withContracts && data.contracts && <>
          <TranslatableText data={'common:car:availability'} className='text-lg' />
          {data.contracts.map((contract) =>
            <ContractInPeriod key={contract.id} data={contract} />
          )}
        </>
        }
      </Section>
    </RNBounceable>
  );
}