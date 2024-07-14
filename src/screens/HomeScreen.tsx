import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import I18nSelect from '../components/common/I18nSelect';
import TranslatableText from '../components/common/TranslatableText';

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TranslatableText data={'common:home'} style={{ fontSize: 30, textAlign: 'center', marginVertical: 10 }} />
        <I18nSelect />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});