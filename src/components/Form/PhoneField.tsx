import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import PhoneInput from "./PhoneInput";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import TranslatableText from '../common/TranslatableText';

interface PhoneFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string|((previousValue: string) => string)) => void,
    error?: boolean,
    helperText?: string,
}

function PhoneField({ value, label, onChange, error = false, helperText = '' }: PhoneFieldProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <PhoneInput
                value={value}
                onChangeText={onChange}
                style={{ ...styles.textInput, ...(error ? styles.textInputError : {}) }}
            />
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
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
        borderColor: COLOR_PRIMARY + '88',
        borderBottomWidth: 1.5,
        borderRadius: 50,
        fontSize: 22,
    },
    textInputError: {
        borderColor: COLOR_SECONDARY + '88',
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
    helperText: {
        color: COLOR_SECONDARY,
        fontSize: 16,
        marginTop: 5,
        marginHorizontal: 5,
    },
});

export default memo(PhoneField);
