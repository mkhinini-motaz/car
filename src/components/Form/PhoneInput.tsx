import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import MaskInput from "react-native-mask-input";
import {useLang} from "../../store/hooks";
import {phoneMask} from "../../support/utils";

interface PhoneInputProps {
    value: string,
    onChangeText: (newValue: string|((previousValue: string) => string)) => void,
    style?: TextStyle,

}

function PhoneInput({ value, onChangeText, style = {} }: PhoneInputProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();
    const onChangeTextCallback = useCallback((nextPhone: string) => {
        onChangeText(value === '+216 ' && nextPhone === '+216' ? '+216 ' : nextPhone);
    }, [onChangeText]);

    return (
        <MaskInput
            value={value}
            onChangeText={onChangeTextCallback}
            keyboardType={'phone-pad'}
            style={style}
            textAlign={selectedLangWriteFrom}
            mask={phoneMask}
            maskAutoComplete
        />
    );
};

const styles = StyleSheet.create({});

export default memo(PhoneInput);
