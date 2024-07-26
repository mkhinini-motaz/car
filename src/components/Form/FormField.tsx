import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import { FORM_FIELD_TYPE_BUTTON, FORM_FIELD_TYPE_DATE, FORM_FIELD_TYPE_PASSWORD, FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_RADIO, FORM_FIELD_TYPE_SUBMIT, FORM_FIELD_TYPE_TEXT, FORM_FIELD_TYPE_OTP } from "../../support/form";
import PhoneField from "./PhoneField";
import PasswordField from "./PasswordField";
import DateField from "./DateField";
import RadioField from "./RadioField";
import TextField from "./TextField";
import ButtonField from "./ButtonField";
import OtpField from "./OtpField";

function FormField({ type, ...props }: any): JSX.Element {
    switch (type) {
        case FORM_FIELD_TYPE_PHONE:
            return <PhoneField {...props} />;

        case FORM_FIELD_TYPE_PASSWORD:
            return <PasswordField {...props} />;

        case FORM_FIELD_TYPE_DATE:
            return <DateField {...props} />;

        case FORM_FIELD_TYPE_RADIO:
            return <RadioField {...props} />;

        case FORM_FIELD_TYPE_OTP:
            return <OtpField {...props} />;

        case FORM_FIELD_TYPE_SUBMIT:
        case FORM_FIELD_TYPE_BUTTON:
            return <ButtonField {...props} />;

        case FORM_FIELD_TYPE_TEXT:
        default:
            return <TextField {...props} />
    }
}

const styles = StyleSheet.create({});

export default memo(FormField);
