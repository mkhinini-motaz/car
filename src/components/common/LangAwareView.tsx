import React, { memo } from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { useLang, useSelector } from "../../store/hooks";

interface LangAwareViewProps {
  style?: ViewStyle|ViewStyle[],
  direction?: 'row' | 'column',
  className?: string,
  children?: any,
}

function LangAwareView({ style, direction = 'row', className = '', children }: LangAwareViewProps): JSX.Element {
  const { selectedLangWriteFrom } = useLang();
  return (
    <View style={[{
      flexDirection: direction + (selectedLangWriteFrom === 'right' ? '-reverse' : ''),
    }, style]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default memo(LangAwareView);
