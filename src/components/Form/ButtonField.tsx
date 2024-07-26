import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import {COLOR_PRIMARY} from "../../constants";
import {capitalize} from "../../support/utils";
import LangAwareView from '../common/LangAwareView';
import TranslatableText from '../common/TranslatableText';

interface ButtonFieldProps {
    label: string,
    isLoading?: boolean,
    onPress?: () => void,
    buttonType?: 'contained'|'outlined',
    icon: any,
}

function ButtonField({ label, isLoading, onPress, buttonType = 'contained', icon = '' }: ButtonFieldProps): JSX.Element {
    let output;
    if (isLoading) {
        output = <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} />;
    } else {
        output = <View style={styles['button' + capitalize(buttonType)]}>
            <LangAwareView style={styles.textAndIconContainer}>
                <TranslatableText style={styles['buttonText' + capitalize(buttonType)]} data={label} />
                {icon || '' }
            </LangAwareView>
        </View>;
    }

    return (
        <RNBounceable onPress={onPress} >
            <View style={styles.container}>
                {output}
            </View>
        </RNBounceable>
    );
};

const buttonStyle = {
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
};

const styles = StyleSheet.create({
    buttonOutlined: {
        ...buttonStyle,
        borderColor: COLOR_PRIMARY,
        backgroundColor: 'white',
        borderWidth: 0.18,
    },
    buttonContained: {
        ...buttonStyle,
        backgroundColor: COLOR_PRIMARY,
    },
    buttonTextOutlined: {
        fontSize: 19,
        fontWeight: '700',
        textAlign: 'center',
        color: COLOR_PRIMARY,
    },
    buttonTextContained: {
        fontSize: 19,
        fontWeight: '700',
        textAlign: 'center',
        color: 'white',
    },
    textAndIconContainer: {
        gap: 10,
        alignItems: 'center',
    }
});

export default memo(ButtonField);
