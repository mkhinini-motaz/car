import { View, StyleSheet } from 'react-native';

interface SectionProps {
  children: any;
}

export default function Section({ children }: SectionProps): JSX.Element {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    gap: 10,
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    margin: 10,
  }
});