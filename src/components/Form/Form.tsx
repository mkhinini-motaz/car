import React, {memo} from 'react';
import { StyleSheet, View} from 'react-native';
import FormField from "./FormField";
import {FORM_FIELD_TYPE_SUBMIT, formIsValid} from "../../support/form"
import {useUser} from "../../store/hooks";
import KeyboardDismissibleAwareScrollView from '../common/KeyboardDismissibleAwareScrollView';

interface FormProps {
    fields: any[], // TODO: change type any
    value: any, // TODO: change type any
    onChange: (newValue: any) => void
    onSubmit: () => void
}

function Form({ fields, value, onChange, onSubmit }: FormProps): JSX.Element {
    const user = useUser();
    let [errors, setErrors] = React.useState({});
    let [helperTexts, setHelperTexts] = React.useState({});

    const onSubmitClicked = async () => {
        const { errors, helperTexts, isValid } = await formIsValid(value, fields, user.phone);
        if (isValid) {
            onSubmit();
            return;
        }
        setErrors(errors);
        setHelperTexts(helperTexts);
    };

    const fieldsComponents = [];
    for (let field of fields) {
        fieldsComponents.push(<FormField {...field}
            key={'form_field_' + field.label + '_' + field.value}
            value={value[field.name]}
            onChange={(newValue) => {
                onChange({ ...value, [field.name]: newValue });
                if (errors[field.name]) {
                    const { [field.name]: omitted1, ...newErrors } = errors;
                    const { [field.name]: omitted2, ...newHelperTexts } = helperTexts;
                    setErrors(newErrors);
                    setHelperTexts(newHelperTexts);
                }
            }}
            onPress={field.type === FORM_FIELD_TYPE_SUBMIT ? onSubmitClicked : field.onPress}
            error={errors[field.name]}
            helperText={helperTexts[field.name]}
        />)
    }

    return (
        <KeyboardDismissibleAwareScrollView>
            <View style={styles.container} >
                {fieldsComponents}
            </View>
        </KeyboardDismissibleAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 30,
        paddingBottom: 10,
    }
});

export default memo(Form);
