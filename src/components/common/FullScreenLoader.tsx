import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLOR_PRIMARY } from "../../constants";

interface FullScreenLoaderProps {

}

function FullScreenLoader({ }: FullScreenLoaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLOR_PRIMARY} style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  indicator: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }]
  }
});

export default memo(FullScreenLoader);