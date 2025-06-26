import { StyleSheet, Text, View } from "react-native";
import { formatDate, formatDateTime, diffInDays } from "../../support/utils";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LangAwareView from "../../components/common/LangAwareView";
import RNBounceable from '@freakycoder/react-native-bounceable';
import colors from "tailwindcss/colors";
import TranslatableText from "../common/TranslatableText";
import Car from "../../classes/Car";
import { CarLicencePlates, CarName } from "./Car";
import MoneyFormatter from "../common/MoneyFormatter";


export interface AvailabilityProps {
  data: [number, number],
  car: Car,
  isSelected?: boolean,
  onPress?: (period: [number, number]) => void,
  isPressable?: boolean,
}

export default function Availability({ data, car, isSelected, onPress, isPressable = false }: AvailabilityProps): JSX.Element {
  const containerStyle = isSelected ? styles.containerSelected : {};
  const days = diffInDays(data[0], data[1]);

  return (
    <RNBounceable disabled={! isPressable} onPress={() => isPressable && onPress && onPress(data)}>
      <View className="my-2 p-2 border rounded shadow-lg" style={{ ...styles.container, ...containerStyle }}>
        {car && <View className="pb-2">
          <CarName data={car} />
          <CarLicencePlates data={car} />
        </View>}
        <LangAwareView className='items-center flex-wrap gap-y-2'>
          <Text className='text-lg' key={data[0] + data[1]}>
            {formatDateTime(data[0])} - {formatDateTime(data[1])}
          </Text>

          <View className="flex-row gap-x-2">
            <TranslatableText data={'client:days_rented'} params={{ days }} className={'text-lg'} />
            {car && <>
              <Text className="text-lg"> - </Text>
              <MoneyFormatter className="text-lg" data={days * car.daily_price} />
            </>}
            {isPressable &&
              <MaterialCommunityIcon name={isSelected ? 'text-box-minus-outline' : 'text-box-plus-outline'} size={30} color={isSelected ? colors.red[500] : colors.green[500]} />
            }
          </View>
        </LangAwareView>
      </View>
    </RNBounceable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  containerSelected: {
    shadowColor: colors.yellow[400],
    shadowOpacity: 0.6,
    shadowOffset: { width: 8, height: 6, },
  }
});