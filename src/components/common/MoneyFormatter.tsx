import React, { memo } from 'react';
import { StyleSheet, View, Text, TextStyle } from 'react-native';
import { LOCAL, LOCAL_CURRENCY } from "../../constants";
import { translate } from "../../i18n";
import { useLang, useSelector } from "../../store/hooks";
import { formatMoneyDisplay } from '../../support/utils';

interface MoneyFormatterProps {
  data: number,
  style?: TextStyle,
  className?: string,
}

function MoneyFormatter({ data, style }: MoneyFormatterProps): JSX.Element {
  const formatter = new Intl.NumberFormat(LOCAL, {
    style: 'currency',
    currency: LOCAL_CURRENCY,
  });

  const { selectedLang, selectedLangWriteFrom } = useLang();

  return (
    <Text style={style}>
      {formatMoneyDisplay(data, selectedLang, selectedLangWriteFrom)}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default memo(MoneyFormatter)
