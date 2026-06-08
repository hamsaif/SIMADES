import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Colors } from '@/constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        SIMADES
      </Text>

      <Text style={styles.subtitle}>
        Sistem Informasi Manajemen Aset Desa
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});