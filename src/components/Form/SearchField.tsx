import React, { memo, useState } from 'react';
import { KeyboardType, StyleSheet, TextInput, View, ActivityIndicator, FlatList } from 'react-native';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../../constants";
import { useLang } from "../../store/hooks";
import TranslatableText from '../common/TranslatableText';
import { useQuery } from 'react-query';
import { alertNetworkError } from '../../support/alert';
import { debounce } from '../../support/utils';
import ButtonField from './ButtonField';
import RNBounceable from '@freakycoder/react-native-bounceable';

interface SearchFieldProps {
  value?: string,
  label: string,
  onChange?: (newValue: string) => void,
  keyboardType?: KeyboardType,
  error?: boolean,
  helperText?: string,
  multiline?: boolean,
  queryKey: string,
  queryFunction: () => {}
  renderItem: ({ item }) => {}
  keyExtractor: (item: any) => {}
  onSelect: (item: any) => {}
}

function SearchField({ label, queryKey, queryFunction, renderItem, keyExtractor, onSelect, error = false, helperText = '', keyboardType = undefined, multiline = false }: SearchFieldProps): JSX.Element {
  const { selectedLang, selectedLangWriteFrom } = useLang();
  const [searchValue, setSearchValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const debouncedSetSearch = debounce(setSearch, 700);
  const { isLoading, error: responseError, data } = useQuery([queryKey, { search }], queryFunction, {
    enabled: searchIsOpen,
    onError: (error) => {
      if (responseError.code === 'ERR_NETWORK') {
        alertNetworkError(selectedLang);
        return;
      }
    },
  });

  const onSelectedItem = (item) => {
    onSelect(item);
    setSelectedItem(item);
    setSearchIsOpen(false);
  }

  return (
    <View className='flex-1'>
      <TranslatableText data={label} style={styles.label} />
      {searchIsOpen ? 
        <TextInput
          value={searchValue}
          onChangeText={(newValue) => {
            setSearchValue(newValue);
            debouncedSetSearch(newValue);
          }}
          style={{ ...styles.textInput, ...(error ? styles.textInputError : {}) }}
          textAlign={selectedLangWriteFrom}
          keyboardType={keyboardType}
          multiline={multiline}
        />
        : ( selectedItem ?
          <RNBounceable onPress={() => setSearchIsOpen(true)}>
              {renderItem({ item: selectedItem })}
            </RNBounceable>
          :
          <ButtonField label={'common:search'} icon={<MaterialCommunityIcon name="table-search" color={'white'} size={30} />} onPress={() => setSearchIsOpen(true)} />
        )
      }

      {!helperText ? '' :
        <TranslatableText data={helperText} style={styles.helperText} />
      }

      <View className='flex-1'>
        {isLoading && <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />}
        {data && <FlatList
          data={searchIsOpen ? data : []}
          renderItem={({ item }) =>
            <RNBounceable onPress={() => onSelectedItem(item)}>
              {renderItem({ item })}
            </RNBounceable>
          }
          keyExtractor={keyExtractor}
        />}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  textInputError: {
    borderColor: COLOR_SECONDARY + '88',
  },
  label: {
    fontSize: 25,
    fontWeight: '500',
    color: COLOR_PRIMARY
  },
  helperText: {
    color: COLOR_SECONDARY,
    fontSize: 16,
    marginTop: 5,
    marginHorizontal: 5,
  },
});

export default SearchField;
