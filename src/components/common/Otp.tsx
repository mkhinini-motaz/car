import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import MaskInput from "react-native-mask-input";
import {otpMask} from "../../support/utils";
import {COLOR_PRIMARY} from "../../constants";
import TranslatableText from "./TranslatableText";
import {useLang} from "../../store/hooks";

interface OtpProps {
    value: string,
    onChange: (newValue: string|((previousValue: string) => string)) => void,
}

function Otp({ value, onChange }: OtpProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();

    return (
        <View style={styles.container}>
            <TranslatableText data={"otp:validation:title"} style={styles.title} />
            <TranslatableText data={"otp:validation:description"} style={styles.description} />
            <View style={styles.fieldContainer}>
                <View style={styles.halfWidth}>
                    <MaskInput
                        value={value}
                        onChangeText={onChange}
                        keyboardType={'number-pad'}
                        style={styles.textInput}
                        textAlign={selectedLangWriteFrom}
                        mask={otpMask}
                        maskAutoComplete
                        textContentType="oneTimeCode"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
    description: {
        fontSize: 17,
        color: '#333333'
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
    fieldContainer: {
        alignItems: 'center'
    }
});

export default memo(Otp);
