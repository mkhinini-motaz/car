import React, { ReactNode, useState } from 'react';
import { KeyboardType, StyleSheet, TextInput, View, ActivityIndicator, FlatList, Modal, SafeAreaView } from 'react-native';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../../constants";
import { useLang } from "../../store/hooks";
import TranslatableText from '../common/TranslatableText';
import { useQuery } from 'react-query';
import { alertNetworkError } from '../../support/alert';
import { debounce } from '../../support/utils';
import ButtonField from '../Form/ButtonField';
import RNBounceable from '@freakycoder/react-native-bounceable';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import LangAwareView from '../common/LangAwareView';

interface CarAvailabilityListProps {
  value?: string,
  label: string,
  onChange?: (newValue: string) => void,
  keyboardType?: KeyboardType,
  error?: boolean,
  helperText?: string,
  multiline?: boolean,
  queryKey: string|[string, { search: string }],
  modalTitle?: string,
  queryFunction: () => {}
  renderItem: ({ item }) => ReactNode
  keyExtractor: (item: any) => {}
  onSelect?: (item: any) => {}
}

function CarAvailabilityList({ label, queryKey, modalTitle, queryFunction, renderItem, keyExtractor, onSelect, error = false, helperText = '', keyboardType = undefined, multiline = false }: CarAvailabilityListProps): JSX.Element {
  const { selectedLang, selectedLangWriteFrom } = useLang();
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const debouncedSetSearch = debounce(setSearch, 700);
  let completeQueryKey;
  if (Array.isArray(queryKey)) {
    const [_key, queryParams] = queryKey;
    completeQueryKey = [_key, { ...queryParams, search  }];
  } else if (typeof queryKey === 'string' ) {
    completeQueryKey = [queryKey, { search }];
  } else {
    completeQueryKey = queryKey;
  }

  const { isLoading, data } = useQuery(completeQueryKey, queryFunction, {
    enabled: searchIsOpen,
    onError: (error) => {
      if (error.code === 'ERR_NETWORK') {
        alertNetworkError(selectedLang);
        return;
      }
    },
  });

  const closeSearch = () => {
    setSearchIsOpen(false);
    setSearch('');
    setSearchValue('');
  };

  return (
    <View className='flex-1'>
      <TranslatableText data={label} style={styles.label} />
      <ButtonField label={'common:search'} icon={<MaterialCommunityIcon name="table-search" color={'white'} size={30} />} onPress={() => setSearchIsOpen(true)} />

      <Modal
        animationType="slide"
        visible={searchIsOpen}
        className='h-full'
        onRequestClose={closeSearch}>
        {isLoading && <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />}
          <View className='pt-8 pb-40'>
            <LangAwareView className='w-full'>
              <TextInput
                value={searchValue}
                onChangeText={(newValue) => {
                  setSearchValue(newValue);
                  debouncedSetSearch(newValue);
                }}
                style={{ ...styles.textInput, ...(error ? styles.textInputError : {}) }}
                textAlign={selectedLangWriteFrom}
                keyboardType={keyboardType}
                className='w-9/12'
              />
              <MaterialIconsIcon name="search" size={30} />
              <RNBounceable onPress={closeSearch}>
                <MaterialIconsIcon name="close" size={30} />
              </RNBounceable>
            </LangAwareView>

            {modalTitle && <TranslatableText data={modalTitle} className='text-xl my-2 text-center' />}

            {! data && isLoading === false ?
              <View>
                <TranslatableText data={'common:no_data'} className='text-lg text-center' />
              </View> :
              <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => renderItem({ item })}
              />
            }

            <View className='px-5 pt-2'>
              <ButtonField label='common:close' onPress={closeSearch} icon={<MaterialIconsIcon name="close" size={30} color={'white'} />} />
            </View>
          </View>

      </Modal>
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

export default CarAvailabilityList;
