import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../../constants";
import TranslatableText from '../common/TranslatableText';
import { useLang } from '../../store/hooks';
import Translatable from '../../classes/Translatable';

interface DateTimeFieldProps {
  value: Date,
  label: string,
  onChange: (newValue: Date) => void
  maxDate: Date | undefined,
  minuteInterval: number,
  error?: boolean,
  helperText?: string,
}

const langToLocale = (selectedLang: keyof Translatable) => {
  return selectedLang.replace('tn', '');
}

function DateTimeField({ value, label, onChange, error = false, helperText = '', maxDate = undefined, minuteInterval = 60 }: DateTimeFieldProps): JSX.Element {
  const newDate = useMemo(() => new Date(), []);
  const { selectedLang } = useLang();

  return (
    <View style={styles.container}>
      <TranslatableText data={label} style={{ ...styles.label, marginBottom: 15 }} />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ ...styles.datePickerContainer, ...(error ? styles.datePickerContainerError : {}) }}>
          <DatePicker maximumDate={maxDate} date={value || newDate} onDateChange={onChange} mode={'datetime'} theme={'light'} minuteInterval={30} is24hourSource={'device'} locale={langToLocale(selectedLang)} />
        </View>
      </View>
      {!helperText ? '' :
        <TranslatableText data={helperText} style={styles.helperText} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
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
