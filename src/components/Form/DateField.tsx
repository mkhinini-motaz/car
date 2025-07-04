import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker'
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import TranslatableText from '../common/TranslatableText';

interface DateFieldProps {
    value: Date,
    label: string,
    onChange: (newValue: Date) => void
    maxDate: Date|undefined,
    error?: boolean,
    helperText?: string,
}

function DateField({ value, label, onChange, error = false, helperText = '', maxDate = undefined }: DateFieldProps): JSX.Element {
    const newDate = useMemo(() => new Date(), []);
    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={{ ...styles.label, marginBottom: 15 }} />
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ ...styles.datePickerContainer, ...(error ? styles.datePickerContainerError : {}) }}>
                    <DatePicker maximumDate={maxDate} date={value || newDate} onDateChange={onChange} mode={'date'} theme={'light'} />
                </View>
            </View>
            {! helperText ? '' :
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

export default memo(DateField)
