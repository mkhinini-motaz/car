import React, {memo} from 'react';
import {KeyboardType, StyleSheet, TextInput, View} from 'react-native';
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import {useLang} from "../../store/hooks";
import TranslatableText from '../common/TranslatableText';

interface TextFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string) => void,
    keyboardType?: KeyboardType,
    error?: boolean,
    helperText?: string,
    multiline?: boolean
}

function TextField({ value, label, onChange, error = false, helperText = '', keyboardType = undefined, multiline = false }: TextFieldProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <TextInput
                value={value}
                onChangeText={onChange}
                style={{ ...styles.textInput, ...(error ? styles.textInputError : {}) }}
                textAlign={selectedLangWriteFrom}
                keyboardType={keyboardType}
                multiline={multiline}
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

export default memo(TextField);
