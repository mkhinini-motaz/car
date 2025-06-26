import { View, Text, Modal, FlatList } from 'react-native';
import { index } from '../../api/contract';
import { alertNetworkError } from '../../support/alert';
import { useQuery } from 'react-query';
import { useLang } from '../../store/hooks';
import {default as ContractClass} from '../../classes/Contract';
import FullScreenLoader from '../common/FullScreenLoader';
import {Calendar, CalendarUtils, DateData} from 'react-native-calendars';
import Section from '../common/Section';
import { useEffect, useMemo, useState } from 'react';
import ColorHash from 'color-hash';
import Contract from '../car/Contract';
import RNBounceable from '@freakycoder/react-native-bounceable';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import LangAwareView from '../common/LangAwareView';
import { useNavigation } from '@react-navigation/native';

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
        color: colorHash.hex(contract.car.licence_plate + '-' + contract.car.id),
        car_id: contract.car.id,
        contract_id: contract.id,
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

function showContracts(data: ContractClass[], clickedDay: DateData, periods) {
  if (! clickedDay || ! data) {
    return '';
  }
  const periodsForDate = periods[clickedDay.dateString]?.periods || [];
  const contractIds = periodsForDate.map(period => period.contract_id)
  const dataToShow = data.filter((contract: Contract) => {
    return contractIds.includes(contract.id)
  });

  return (
    <FlatList
      data={dataToShow}
      renderItem={({ item }) => <Contract data={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default function ContractsCalendar(): JSX.Element {
  const { selectedLang } = useLang();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayModalIsOpen, setDayModalIsOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState(null);
  const openModal = (date: DateData) => {
    if (! memoizedData[date.dateString]) {
      return;
    }
    setDayModalIsOpen(true);
    setClickedDay(date);
  }
  const closeModal = () => {
    setDayModalIsOpen(false);
    setClickedDay(null);
  }

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
          onDayPress={openModal}
          onMonthChange={(dateData: DateData) => {
            setCurrentDate(new Date(dateData.year, dateData.month));
          }}
        />
        <Modal
          onDismiss={closeModal}
          animationType="slide"
          visible={dayModalIsOpen}
          className='h-full'
          onRequestClose={closeModal}>
            <View className='py-8'>
              <LangAwareView className='justify-between px-5'>
                <Text className='text-xl font-bold'>{clickedDay?.dateString}</Text>
                <RNBounceable onPress={closeModal}>
                  <MaterialIconsIcon name="close" size={30} />
                </RNBounceable>
              </LangAwareView>
              {showContracts(data, clickedDay, memoizedData)}
            </View>
        </Modal>
      </View>
    </Section>
  );
};
