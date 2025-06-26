import React, { memo, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../../constants";
import TranslatableText from '../common/TranslatableText';
import { useLang } from '../../store/hooks';
import Translatable from '../../classes/Translatable';
import ButtonField from './ButtonField';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDateTime } from '../../support/utils';

interface DateTimeFieldProps {
  value: Date,
  label: string,
  onChange: (newValue: Date) => void
  maxDate?: Date | undefined,
  minDate?: Date | undefined,
  minuteInterval?: 2 | 1 | 20 | 15 | 5 | 10 | 3 | 4 | 6 | 12 | 30 | undefined,
  error?: boolean,
  helperText?: string,
}

const langToLocale = (selectedLang: keyof Translatable) => {
  return selectedLang.replace('tn', '');
}

function DateTimeField({ value, label, onChange, error = false, helperText = '', minDate = undefined, maxDate = undefined, minuteInterval = undefined }: DateTimeFieldProps): JSX.Element {
  const newDate = useMemo(() => new Date(), []);
  const { selectedLang } = useLang();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View className='flex-1 py-2 gap-y-3'>
      <TranslatableText data={label} style={styles.label} />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ ...styles.datePickerContainer, ...(error ? styles.datePickerContainerError : {}) }}>
          <ButtonField label={formatDateTime(value.getTime() / 1000)} onPress={() => setIsOpen(true)} icon={<MaterialCommunityIcon name="calendar-edit" size={30} color={'white'} />} />

          <DatePicker
            minimumDate={minDate}
            maximumDate={maxDate}
            date={value || newDate}
            onConfirm={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
            mode={'datetime'}
            theme={'light'}
            minuteInterval={minuteInterval}
            is24hourSource={'device'}
            locale={langToLocale(selectedLang)}
            open={isOpen}
            modal
          />
        </View>
      </View>
      {!helperText ? '' :
        <TranslatableText data={helperText} style={styles.helperText} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  datePickerContainerError: {
    shadowColor: COLOR_SECONDARY,
  },
  label: {
    fontSize: 25,
    fontWeight: '500',
    color: COLOR_PRIMARY
  },
  helperText: {
    color: COLOR_SECONDARY,
    fontSize: 16,
    marginTop: 15,
    marginHorizontal: 5,
  },
});

export default DateTimeField
