import { StyleSheet, View } from 'react-native';
import AppRouter from './src/Router/AppRouter';

export default function App() {
  return (
    <View style={styles.container}>
      <AppRouter/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
