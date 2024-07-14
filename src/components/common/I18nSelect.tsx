import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { availableLangs, translate } from "../../i18n";
import { useLang, useSetLang } from "../../store/hooks";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { COLOR_PRIMARY } from '../../constants';

export default function I18nSelect(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLang, selectedLangWriteFrom } = useLang();
  const setLang = useSetLang();
  let items = [];
  for (let lang in availableLangs) {
    items.push({ label: translate('lang:' + lang, selectedLang), value: lang });
  }
 
  return (
    <View>
      <DropDownPicker
        rtl={selectedLangWriteFrom === 'right'}
        open={isOpen}
        value={selectedLang}
        items={items}
        setOpen={setIsOpen}
        setValue={(value) => setLang(value())}
        selectedItemLabelStyle={styles.selectedItem}
        textStyle={{ ...styles.text, textAlign: selectedLangWriteFrom }}
        containerStyle={{ borderColor: 'yellow', }}
        selectedItemContainerStyle={styles.selectedItemContainer}
        dropDownContainerStyle={styles.borderColorPrimary}
        style={styles.borderColorPrimary}
        ArrowUpIconComponent={({style}) => <Icon color={COLOR_PRIMARY} size={25} name={'arrow-up'} />}
        ArrowDownIconComponent={({style}) => <Icon color={COLOR_PRIMARY} size={25} name={'arrow-down'} />}
        TickIconComponent={({style}) => <AntIcon color={'white'} size={25} name={'check'} />}
      />
    </View>
  );
};
/*
// TODO: DropDown Picker icons
   
*/
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  selectedItem: {
    color: 'white',
    fontWeight: '600',
  },
  selectedItemContainer: {
    backgroundColor: COLOR_PRIMARY,
  },
  borderColorPrimary: {
    zIndex: 10,
    borderColor: COLOR_PRIMARY,
  }
});
