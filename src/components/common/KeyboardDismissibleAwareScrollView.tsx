import React, {memo} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface KeyboardDismissableAwareScrollViewProps {
    children: any,
}

function KeyboardDismissibleAwareScrollView({ children }: KeyboardDismissableAwareScrollViewProps): JSX.Element {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAwareScrollView style={{ width: '100%', paddingHorizontal: '8%' }}>
                {children}
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({});

export default memo(KeyboardDismissibleAwareScrollView);
