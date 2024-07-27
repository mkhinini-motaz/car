import React, { useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, View, Modal, } from 'react-native';
import { COLOR_PRIMARY, PHONE_REGEX } from "../constants";
import { translate } from "../i18n";
import { useAuthenticateUser, useLang } from "../store/hooks";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import { useMutation } from "react-query";
import { login, requestOtp } from "../api/auth";
import PhoneInput from "../components/Form/PhoneInput";
import ButtonField from "../components/Form/ButtonField";
import PhoneField from "../components/Form/PhoneField";
import { alertNetworkError } from "../support/alert";
import TranslatableText from '../components/common/TranslatableText';
import LangAwareView from '../components/common/LangAwareView';

interface LoginScreenProps {
  navigation: any,
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [phone, setPhone] = React.useState('+21623456109'); // TODO: set to '+216 '
  const [password, setPassword] = React.useState('azerty'); // TODo: set to ''
  const [forgotPhone, setForgotPhone] = React.useState('+216 ');
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const { selectedLang, selectedLangWriteFrom } = useLang();
  const authenticateUser = useAuthenticateUser();
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: authenticateUser,
    onError: (error) => {
      if (error.code === 'ERR_NETWORK') {
        alertNetworkError(selectedLang);
        return;
      }

      Alert.alert(
        '',
        translate('login:error', selectedLang),
        [{ text: translate('common:ok', selectedLang), }],
      );
    }
  });

  const onLoginPress = () => mutate({ phone: phone.replaceAll(' ', ''), password });

  const onForgotPasswordPress = () => {
    setModalIsVisible(true);
    setForgotPhone('+216 ');
    // TODO: auto focus on phone input
  };

  const onForgotPasswordConfirm = () => {
    const phoneData = forgotPhone.replaceAll(' ', '');
    if (!PHONE_REGEX.test(phoneData)) {
      Alert.alert(
        '',
        translate('validation:phone:invalid', selectedLang),
        [{ text: translate('common:ok', selectedLang), }],
      );
      return;
    }
    requestOtp(phoneData, selectedLang)
      .then(() => {
        navigation.navigate('NewPasswordScreen', { phone: phoneData });
        setModalIsVisible(false);
      })
      .catch(error => {
        Alert.alert(
          translate('otp:request:error:title', selectedLang),
          translate('otp:request:error:message', selectedLang),
          [{
            text: translate('common:ok', selectedLang),
          }],
        );
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView style={styles.container} >
        <View style={styles.section}>
          <TranslatableText data={"form:phone:label"} style={styles.label} />
          <PhoneInput
            value={phone}
            onChangeText={setPhone}
            style={styles.textInput}
          />
        </View>
        <View style={styles.section}>
          <TranslatableText data={"form:password:label"} style={styles.label} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.textInput}
            textAlign={selectedLangWriteFrom}
          />
        </View>
        <View style={styles.buttonSection}>
          <RNBounceable onPress={onLoginPress} >
            {isLoading ?
              <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} /> :
              <View style={styles.buttonContained}>
                <TranslatableText style={styles.buttonTextContained} data={'common:login'} />
              </View>
            }
          </RNBounceable>
          <RNBounceable onPress={onForgotPasswordPress} >
            <TranslatableText style={styles.forgotPasswordText} data={'common:forgot-password?'} />
          </RNBounceable>
        </View>

        <View style={styles.section}>
          {/* TODO: legal consent */}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalIsVisible}
          onRequestClose={() => setModalIsVisible(!modalIsVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <PhoneField label={'form:phone:label'} value={forgotPhone} onChange={setForgotPhone} />
              <LangAwareView style={styles.forgotButtonsContainer}>
                <ButtonField label={'common:cancel'} onPress={() => setModalIsVisible(!modalIsVisible)} buttonType={'outlined'} />
                <ButtonField label={'common:confirm'} onPress={onForgotPasswordConfirm} />
              </LangAwareView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: '17%',
    gap: 30,
  },
  section: {
    width: '90%',
  },
  buttonSection: {
    width: '90%',
    gap: 20,
  },
  label: {
    fontSize: 25,
    fontWeight: '500',
    color: COLOR_PRIMARY
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
  buttonOutlined: {
    borderColor: COLOR_PRIMARY,
    backgroundColor: 'white',
    borderWidth: 0.18,
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonContained: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonTextOutlined: {
    textAlign: 'center',
    color: COLOR_PRIMARY,
    fontSize: 19,
    fontWeight: '700',
  },
  buttonTextContained: {
    textAlign: 'center',
    color: 'white',
    fontSize: 19,
    fontWeight: '700',
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    gap: 15,
  },
  forgotButtonsContainer: {
    gap: 15,
  },
});