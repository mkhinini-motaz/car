import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/common/CustomDrawer';
import RentedCarsScreen from '../screens/RentedCarsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TranslatableText from '../components/common/TranslatableText';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../constants';
import { StyleSheet } from 'react-native';

const screenOptions = (label: string, icon: (iconOptions: { focused: boolean, size: number }) => React.ReactNode) => {
  return {
      drawerActiveBackgroundColor: COLOR_PRIMARY + 'cc',
      drawerLabelStyle: styles.drawerLabel,
      drawerLabel: (labelOptions: { focused: boolean, color: string }) =>
        <TranslatableText data={label}
          style={{ color: labelOptions.focused ? 'white' : COLOR_PRIMARY, fontSize: 20, fontWeight: 500 }}
        />,
      drawerIcon: icon
  };
};

const materialIcon = (name: string) =>
  ({focused, size}) => <MaterialIcon name={name} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
;

const antIcon = (name: string) =>
  ({focused, size}) => <AntIcon name={name} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
;

const simpleLineIcon = (name: string) =>
  ({focused, size}) => <SimpleLineIcon name={name} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
;

const cartIcon = (badgeCount: number, selectedLangWriteFrom: 'left'|'right') => ({focused, size}) => {
  const badgeStyle = { ...styles.badge, [selectedLangWriteFrom]: 35, ...(focused ? styles.badgeActive : styles.badgeInactive) };
  return (<>
      <AntIcon name={'shoppingcart'} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
      {! badgeCount ? ''  :
          <View style={badgeStyle}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
      }
  </>)};

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: '', ...screenOptions('common:home', antIcon('home')) }} />
      <Drawer.Screen name="RentedCars" component={RentedCarsScreen} options={screenOptions('common:rented_cars', materialIcon('car-rental'))} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={screenOptions('common:settings', simpleLineIcon('settings'))} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: { flex: 1 },
  scaler: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
  },
  badge: {
      position: 'absolute',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 50,
      top: 0,
  },
  badgeActive: {
      backgroundColor: COLOR_SECONDARY,
  },
  badgeInactive: {
      backgroundColor: COLOR_PRIMARY,
  },
  badgeText: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
  },
  drawerLabel: {
      color: COLOR_PRIMARY,
      fontSize: 20,
  }
});