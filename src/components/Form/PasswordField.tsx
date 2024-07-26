import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useLang} from "../../store/hooks";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import TranslatableText from '../common/TranslatableText';

interface PasswordFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string) => void,
    error?: boolean,
    helperText?: string,
}

function PasswordField({ value, label, onChange, error = false, helperText = '' }: PasswordFieldProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <TextInput
                value={value}
                onChangeText={onChange}
                secureTextEntry
                style={{ ...styles.textInput, ...(error ? styles.textInputError : {}) }}
                textAlign={selectedLangWriteFrom}
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

export default memo(PasswordField);
