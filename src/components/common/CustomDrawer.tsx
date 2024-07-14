import React, { memo, useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { alertConfirmLogout } from "../../support/alert";
import { setUserToken } from "../../support/auth";
import { useUser, useLang, useSetUser } from "../../store/hooks";
import { translate } from "../../i18n";
import { COLOR_PRIMARY } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { DrawerDescriptorMap, DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

interface CustomDrawerProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}

function CustomDrawer(props: CustomDrawerProps): JSX.Element {
  const setUser = useSetUser();
  const { selectedLang } = useLang();

  const onLogoutPress = useCallback(() => {
    alertConfirmLogout(
      selectedLang,
      () => setUserToken('')
        .then(() => setUser({}))
    );
  }, []);

  return (
    <DrawerContentScrollView {...props}>

      <DrawerItemList {...props} />
      <DrawerItem icon={() => <Icon size={24 * 1.4}
        name={'logout'}
        color={COLOR_PRIMARY} />}
        label={translate('common:logout', selectedLang)}
        labelStyle={styles.label}
        onPress={onLogoutPress}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLOR_PRIMARY,
    fontSize: 20,
  },
});

export default memo(CustomDrawer);
