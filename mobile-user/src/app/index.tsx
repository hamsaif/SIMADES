import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Colors } from '@/constants/colors';

export default function HomeScreen() {
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [assetNama, setAssetNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:3000/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaPelapor: nama,
          noHp: noHp,
          assetNama: assetNama,
          deskripsi: deskripsi,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error('Gagal kirim laporan:', errData);
        alert(`Gagal mengirim laporan: ${errData?.message ?? response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log('Laporan berhasil dikirim:', data);
      alert('Laporan berhasil dikirim!');
      setNama('');
      setNoHp('');
      setAssetNama('');
      setDeskripsi('');
    } catch (error) {
      console.error('Network error:', error);
      alert('Terjadi kesalahan jaringan. Pastikan server berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <Text style={styles.title}>SIMADES Lapor</Text>
            <Text style={styles.subtitle}>
              Sampaikan keluhan dan laporan infrastruktur, lingkungan, maupun layanan desa di sini.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Buat Laporan Baru</Text>

            {/* Nama Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Lengkap</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan nama Anda..."
                placeholderTextColor={Colors.textMuted}
                value={nama}
                onChangeText={setNama}
              />
            </View>

            {/* No HP Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nomor HP (Opsional)</Text>
              <TextInput
                style={styles.input}
                placeholder="081234567890"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                value={noHp}
                onChangeText={setNoHp}
              />
            </View>

            {/* Nama Aset Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Aset yang Dilaporkan</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Jalan Desa RT 03, Jembatan RW 02..."
                placeholderTextColor={Colors.textMuted}
                value={assetNama}
                onChangeText={setAssetNama}
              />
            </View>

            {/* Deskripsi Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Deskripsi Keluhan</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Contoh: Jalan depan masjid rusak parah dan berlubang..."
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={deskripsi}
                onChangeText={setDeskripsi}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={[
                styles.submitButton, 
                (!nama || !deskripsi || !assetNama || loading) && styles.submitButtonDisabled
              ]} 
              onPress={handleSubmit}
              disabled={!nama || !deskripsi || !assetNama || loading}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Mengirim...' : 'Kirim Laporan'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoIcon: {
    width: 64,
    height: 64,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textHeading,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.textHeading,
  },
  textArea: {
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#93c5fd',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});