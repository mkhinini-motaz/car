import React, {memo, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MaskInput from "react-native-mask-input";
import {otpMask} from "../../support/utils";
import {COLOR_PRIMARY} from "../../constants";
import {useLang} from "../../store/hooks";
import ButtonField from "./ButtonField";
import {translate} from "../../i18n";
import {requestOtp} from "../../api/auth";
import TranslatableText from '../common/TranslatableText';
import LangAwareView from '../common/LangAwareView';

interface OtpFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string|((previousValue: string) => string)) => void,
    withRequestButton: boolean,
    phone: string|undefined,
}

function OtpField({ value, label, onChange, withRequestButton = false, phone = undefined }: OtpFieldProps): JSX.Element {
    const { selectedLang, selectedLangWriteFrom } = useLang();

    useEffect(() => () => clearTimeout(timeoutIdRef.current), []);

    const [otpIsLoading, setOtpIsLoading] = useState(false);
    const [requestOtpIsActive, setRequestOtpIsActive] = useState(true);
    const timeoutIdRef = useRef(-1);
    const onOtpRequestPress = () => {
        if (! requestOtpIsActive) {
            Alert.alert('', translate('otp:request:timeout:message', selectedLang), [{ text: translate('common:ok', selectedLang), }]);
            return;
        }
        requestOtp(phone, selectedLang)
            .then(() => {
                setRequestOtpIsActive(false);
                timeoutIdRef.current = setTimeout(() => setRequestOtpIsActive(true), 60000)
            })
            .catch((error) => {
                Alert.alert(
                    translate('otp:request:error:title', selectedLang),
                    translate('otp:request:error:message', selectedLang),
                    [{
                        text: translate('common:ok', selectedLang),
                    }],
                );
            })
            .finally(() => setOtpIsLoading(false));
    };

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <View style={{ alignItems: selectedLangWriteFrom === 'right' ? 'flex-end' : 'flex-start' }}>
                <LangAwareView>
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
                    {! withRequestButton ? '' :
                        <ButtonField label={'form:otp:request'} buttonType={requestOtpIsActive ? 'contained' : 'outlined'} onPress={onOtpRequestPress} isLoading={otpIsLoading} />
                    }
                </LangAwareView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
});

export default memo(OtpField);
