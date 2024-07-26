import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Icon from "react-native-vector-icons/AntDesign";
import TranslatableText from '../common/TranslatableText';
import LangAwareView from '../common/LangAwareView';

interface RadioFieldProps {
    value: number,
    label: string,
    options: { label: string, value: number }[],
    onChange: (newValue: number) => void,
    error?: boolean,
    helperText?: string,
}

function RadioField({ value, label, onChange, options, error = false, helperText = '' }: RadioFieldProps): JSX.Element {
    const buttonsComponents = [];

    for (let option of options) {
        const isSelected = value === option.value;
        buttonsComponents.push(<RNBounceable onPress={() => onChange(option.value)} key={'checkbox_' + option.value} style={styles.checkboxContainer} >
            <TranslatableText data={option.label} style={{ ...styles.checkboxLabel, ...(error ? styles.checkboxLabelError : {})}} />
            <BouncyCheckbox disableBuiltInState
                            size={50}
                            fillColor={error ? COLOR_SECONDARY :COLOR_PRIMARY}
                            isChecked={isSelected}
                            iconComponent={!isSelected ? '' : <Icon size={38} name={'check'} color={'white'} />}
                            textContainerStyle={{ marginLeft: 0, }}
                            onPress={() => onChange(option.value)}
            />
        </RNBounceable>)
    }

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={{ ...styles.label, marginBottom: 10 }} />
            <LangAwareView >
                {buttonsComponents}
            </LangAwareView>
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
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    },
    checkboxLabel: {
        fontSize: 25,
        fontWeight: '500',
        color: '#333333',
    },
    checkboxLabelError: {
        color: COLOR_SECONDARY,
    },
    checkboxContainer: {
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        gap: 10,
    },
    checkboxIconContainer: {
        height: 60,
        width: 60,
    },
    helperText: {
        color: COLOR_SECONDARY,
        fontSize: 16,
        marginTop: 5,
        marginHorizontal: 5,
    },
});

export default memo(RadioField);
