import {API_URL, PHONE_REGEX} from "../constants";
import axios from "axios";

export const FORM_FIELD_TYPE_TEXT = 'FORM_FIELD_TYPE_TEXT';
export const FORM_FIELD_TYPE_PHONE = 'FORM_FIELD_TYPE_PHONE';
export const FORM_FIELD_TYPE_PASSWORD = 'FORM_FIELD_TYPE_PASSWORD';
export const FORM_FIELD_TYPE_DATE = 'FORM_FIELD_TYPE_DATE';
export const FORM_FIELD_TYPE_RADIO = 'FORM_FIELD_TYPE_RADIO';
export const FORM_FIELD_TYPE_OTP = 'FORM_FIELD_TYPE_OTP';
export const FORM_FIELD_TYPE_SUBMIT = 'FORM_FIELD_TYPE_SUBMIT';
export const FORM_FIELD_TYPE_BUTTON = 'FORM_FIELD_TYPE_BUTTON';

export const formIsValid = async (value: any, fields: any, currentAuthClientPhone: string|undefined = undefined) => { // TODO: remove currentAuthClientPhone usage
    const errors = {};
    const helperTexts = {};
    for (let field of fields) {
        if ([FORM_FIELD_TYPE_SUBMIT, FORM_FIELD_TYPE_BUTTON].includes(field.type)) {
            continue;
        }

        if (field.required !== false && !value[field.name]) {
            errors[field.name] = true;
            helperTexts[field.name] = 'validation:required';
        } else if (field.type === FORM_FIELD_TYPE_PHONE) {
            if (! PHONE_REGEX.test(value[field.name])) {
                errors[field.name] = true;
                helperTexts[field.name] = 'validation:phone:invalid';
            } else if (! currentAuthClientPhone || currentAuthClientPhone !== value[field.name].replaceAll(' ', '')) {
// TODO: implement api
                const response = await axios.post(API_URL + 'phone', { phone: value[field.name].replaceAll(' ', '') });
                if (response.data) {
                    errors[field.name] = true;
                    helperTexts[field.name] = 'validation:phone:used';
                }
            }
        } else if ( // TODO: improve code snippet below
            field.name === 'password' &&
            value['password'] !== value['password_confirmation']
        ) {
            errors['password'] = true;
            helperTexts['password'] = 'validation:password:confirmation';
        } else if (
            field.name === 'password_confirmation' &&
            value['password'] !== value['password_confirmation']
        ) {
            errors['password_confirmation'] = true;
            helperTexts['password_confirmation'] = 'validation:password:confirmation';
        }
    }

    return { errors, helperTexts, isValid: 0 === Object.keys(errors).length }
};
