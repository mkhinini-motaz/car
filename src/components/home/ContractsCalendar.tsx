import { View, Text } from 'react-native';
import { index } from '../../api/contract';
import { alertNetworkError } from '../../support/alert';
import { useQuery } from 'react-query';
import { useLang } from '../../store/hooks';
import {default as ContractClass} from '../../classes/Contract';
import FullScreenLoader from '../common/FullScreenLoader';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import Section from '../common/Section';
import { useMemo } from 'react';
import ColorHash from 'color-hash';

function sortCalendarPeriods(value1, value2) {
  if (value1.length < value2.length) {
    return -1;
  }
  if (value1.length > value2.length) {
    return 1;
  }
  if (value1.car_id < value2.car_id) {
    return -1;
  }
  if (value1.car_id > value2.car_id) {
    return 1;
  }
  return 0;
}

function contractsToCalendarData(contracts: ContractClass[]) {
  const result = {};
  if (! contracts) {
    return result;
  }
  const colorHash = new ColorHash();
  contracts.forEach((contract: ContractClass) => {
    for (let currentStep = contract.starts_at; currentStep < contract.ends_at; currentStep += 24*60*60) {
      const date = CalendarUtils.getCalendarDateString(new Date(currentStep * 1000));

      const startingDay = currentStep === contract.starts_at;
      const endingDay = (currentStep + 24*60*60) > contract.ends_at;

      const period = {
        startingDay,
        endingDay,
        color: colorHash.hex('car-' + contract.car.id),
        car_id: contract.car.id,
        length: (contract.ends_at - contract.starts_at) / (24*60*60)
      };
      if (! result[date]) {
        result[date] = { periods: [ period ] };
      } else {
        result[date].periods.push(period);
      }
    }
  });

  for (const date in result) {
    result[date].periods = result[date].periods.sort(sortCalendarPeriods);
  }
  return result;
}

export default function ContractsCalendar(): JSX.Element {
  const { selectedLang } = useLang();
  const currentDate = new Date();
  const currentDateString = CalendarUtils.getCalendarDateString(currentDate);
  const firstDay = (new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1, 0, 0, 0)).getTime() / 1000;
  const lastDay = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0, 23, 59, 59)).getTime() / 1000;

  const queryKey = ['contract.index', {
    starts_at: firstDay,
    ends_at: lastDay
  }];

  const { isLoading, error, data } = useQuery(queryKey, index, {
    onError: (error) => {
      if (error.code === 'ERR_NETWORK') {
        alertNetworkError(selectedLang);
        return;
      }
    },
  });

  const memoizedData = useMemo(() => contractsToCalendarData(data), [data]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // TODO: implement
  if (error) {
    return (
      <Text>{JSON.stringify(error)}</Text>
    );
  }

  return (
    <Section>
      <View className=''>
      <Calendar
        current={currentDateString}
        markingType={'multi-period'}
        markedDates={memoizedData}
      />
      </View>
    </Section>
  );
};
