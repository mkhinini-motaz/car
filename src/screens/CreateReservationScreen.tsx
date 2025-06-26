import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import SearchField from '../components/Form/SearchField';
import Car from '../components/car/Car';
import { index } from '../api/car';
import DateTimeField from '../components/Form/DateTimeField';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { periodsAreEqual, formatDate, formatDateTime, occursInPeriod } from '../support/utils';
import CarAvailabilityList from '../components/home/CarAvailabilityList';
import { default as CarClass } from '../classes/Car';
import { alertOccursInPeriod } from '../support/alert';
import { useLang } from '../store/hooks';
import { default as AvailabilityClass } from '../classes/Availability';
import Availability from '../components/car/Availability';

const today = new Date();
today.setMinutes(0);

const defaultStartsAt = new Date();
defaultStartsAt.setMinutes(0);
defaultStartsAt.setSeconds(0);
const defaultEndsAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
defaultEndsAt.setMinutes(0);
defaultEndsAt.setSeconds(0);

export default function CreateReservationScreen(): JSX.Element {
  const { selectedLang } = useLang();
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<AvailabilityClass[]>([]);
  const [startsAt, setStartsAt] = useState(defaultStartsAt);
  const [endsAt, setEndsAt] = useState(defaultEndsAt);
  const queryKey = ['car.index.search', { starts_at: ~~(startsAt.getTime() / 1000), ends_at: ~~(endsAt.getTime() / 1000) }];
  const modalTitle = formatDateTime(startsAt.getTime() / 1000) + ' -> ' + formatDateTime(endsAt.getTime() / 1000);

  useEffect(() => {
    setSelectedAvailabilities([]);
  }, [startsAt, endsAt])

  const onAvailabilityPress = (car: CarClass, selectedAvailability: [number, number]) => {
    if (selectedAvailabilities.length === 0) {
      setSelectedAvailabilities([{ car, period: selectedAvailability }]);
      return;
    }

    let alreadySelected = false;
    const availabilities = [ ];
    for (const availability of selectedAvailabilities) {
      if (periodsAreEqual(availability.period, selectedAvailability)) {
        if (availability.car.id === car.id) {
          alreadySelected = true;
          continue;
        }
        alertOccursInPeriod(selectedLang);
        return;
      }

      if (occursInPeriod(selectedAvailability, availability.period)) {
        alertOccursInPeriod(selectedLang);
        return;
      }

      availabilities.push(availability);
    }

    if (! alreadySelected) {
      availabilities.push({ car, period: selectedAvailability });
    }

    availabilities.sort((availability1, availability2) => availability1.period[0] - availability2.period[0]);
    setSelectedAvailabilities(availabilities);
  };

  const selectedCarsOutput = [];
  for (const availability of selectedAvailabilities) {
    selectedCarsOutput.push(
      <Availability key={'' + availability.car + availability.period} data={availability.period} car={availability.car} />
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='p-3'>
          <DateTimeField label='contract:starts_at' value={startsAt} onChange={setStartsAt} minuteInterval={30} minDate={today} />

          <DateTimeField label='contract:ends_at' value={endsAt} onChange={setEndsAt} minuteInterval={30} minDate={today} />

          <CarAvailabilityList
            label={'car:label'}
            queryKey={queryKey}
            queryFunction={index}
            renderItem={({ item }) =>
              <Car
                data={item}
                withContracts
                showAvailability
                selectedAvailabilities={selectedAvailabilities.filter((availability: Availability) => availability.car.id === item.id)}
                availabilityIsPressable
                onAvailabilityPress={(availabilityPeriod) => onAvailabilityPress(item, availabilityPeriod)}
              />
            }
            keyExtractor={(item) => item.id }
            modalTitle={modalTitle}
          />

          <View className='mt-2'>
            {selectedCarsOutput}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

