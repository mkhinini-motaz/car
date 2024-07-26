import React, {memo, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY} from "../constants";
import {useAuthenticateUser, useLang} from "../store/hooks";
import {useMutation} from "react-query";
import {requestOtp, resetPassword} from "../api/auth";
import {translate} from "../i18n";
import ButtonField from "../components/Form/ButtonField";
import Form from "../components/Form/Form";
import {alertNetworkError} from "../support/alert";
import OtpField from '../components/Form/OtpField';
import { FORM_FIELD_TYPE_PASSWORD, FORM_FIELD_TYPE_SUBMIT } from '../support/form';

interface NewPasswordScreenProps {
    route: any,
}

function NewPasswordScreen({ route }: NewPasswordScreenProps): JSX.Element {
    const phone = route.params?.phone;
    const { selectedLang } = useLang();
    const authenticateClient = useAuthenticateUser();

    const [otp, setOtp] = useState('');
    const [otpIsLoading, setOtpIsLoading] = useState(false);
    const [requestOtpIsActive, setRequestOtpIsActive] = useState(true);
    const timeoutIdRef = useRef(-1);

    useEffect(() => () => clearTimeout(timeoutIdRef.current), []);

    const { mutate, isLoading } = useMutation({
        mutationFn: resetPassword,
        onSuccess: authenticateClient,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
            const errorMsg = error.response.data?.message === 'phone.code' ? 'otp:validation:wrong' : 'otp:request:error:title';
            Alert.alert('', translate(errorMsg, selectedLang), [{ text: translate('common:ok', selectedLang), }],);
        }
    });

    const onOtpRequestPress = () => {
        if (! requestOtpIsActive) {
            Alert.alert('', translate('otp:request:timeout:message', selectedLang), [{ text: translate('common:ok', selectedLang), }]);
            return;
        }
        requestOtp(phone, selectedLang)
            .then(() => {
                setRequestOtpIsActive(false);
                timeoutIdRef.current = setTimeout(() => setRequestOtpIsActive(true), 60000);
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

    const onOtpChange = (newOtp) => {
        setOtp(newOtp.trimEnd());
    };

    const onSubmit = () => {
        const spaceFreeOtp = otp.replaceAll(' ', '');
        if (spaceFreeOtp.length < 6) {
            Alert.alert('', translate('otp:validation:wrong', selectedLang), [{ text: translate('common:ok', selectedLang), }]);
            return;
        }
        mutate({ ...formData, phone, otp: spaceFreeOtp });
    };
    const [ formData, setFormData ] = useState({});
    const fields = [
        {
            name: 'password',
            label: 'form:new_password:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            name: 'password_confirmation',
            label: 'form:password_confirmation:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            label: 'common:confirm',
            type: FORM_FIELD_TYPE_SUBMIT,
            isLoading: isLoading,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', gap: 10 }}>
                <OtpField value={otp} onChange={onOtpChange} />

               <View style={{ width: '50%' }}>
                   <ButtonField label={'otp:validation:didnt_receive'} buttonType={requestOtpIsActive ? 'contained' : 'outlined'} onPress={onOtpRequestPress} isLoading={otpIsLoading} />
               </View>
            </View>

            <Form value={formData} fields={fields} onChange={setFormData} onSubmit={onSubmit} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        gap: 30,
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
    fieldContainer: {
        width: '50%',
    },
    halfWidth: {
        width: '50%',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#333333'
    },
    didntReceiveContainer: {
        gap: 10,
        paddingHorizontal: 10,
    },
});

export default memo(NewPasswordScreen);