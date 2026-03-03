import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const egzersizler = [
  { id: 1, tarih: '16.11.2020 Pazartesi', ad: 'SOL KOL Egzersizi', tamamlandi: true },
  { id: 2, tarih: '16.11.2020 Pazartesi', ad: 'SAĞ KOL Egzersizi', tamamlandi: true },
  { id: 3, tarih: '16.11.2020 Pazartesi', ad: 'KOLLARI ÖNE KALDIRIYORUZ Egzersizi', tamamlandi: true },
  { id: 4, tarih: '16.11.2020 Pazartesi', ad: 'ISINMA HAREKETLERİ Egzersizi', tamamlandi: true },
  { id: 5, tarih: '17.11.2020 Salı', ad: 'NEFES EGZERSİZİ', tamamlandi: true },
  { id: 6, tarih: '17.11.2020 Salı', ad: 'BÜZÜK DUDAK SOLUNUMU Egzersizi', tamamlandi: true },
  { id: 7, tarih: '18.11.2020 Çarşamba', ad: 'BACAK EGZERSİZİ', tamamlandi: false },
  { id: 8, tarih: '18.11.2020 Çarşamba', ad: 'OTURARAK YÜRÜYÜŞ Egzersizi', tamamlandi: false },
];

export default function EgitimlerScreen({ navigation }) {
  const [arama, setArama] = useState('');

  const filtrelenmis = egzersizler.filter((e) =>
    e.ad.toLowerCase().includes(arama.toLowerCase()) ||
    e.tarih.toLowerCase().includes(arama.toLowerCase())
  );

  const tamamlananlar = filtrelenmis.filter((e) => e.tamamlandi);
  const tamamlanmayanlar = filtrelenmis.filter((e) => !e.tamamlandi);

  return (
    <View style={styles.container}>
      {/* Üst Yeşil Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerRed}>KOAH </Text>
          <Text style={styles.headerGreen}>EGZERSİZ</Text>
        </Text>
      </View>

      {/* İkon Bar */}
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.iconRight}>
          <Text style={styles.iconText}>✉️</Text>
          <Text style={styles.iconText}>🔔</Text>
          <Text style={styles.iconText}>👤</Text>
          <Text style={styles.iconText}>⚙️</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.content}>
        {/* Başlık */}
        <Text style={styles.pageTitle}>İçerik Listesi</Text>

        {/* Breadcrumb */}
        <View style={styles.breadcrumbBar}>
          <Text style={styles.breadcrumbIcon}>🏠</Text>
          <Text style={styles.breadcrumbText}> Kontrol Panelim  →  İçerik Listesi</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.subTitle}>İçerik Listesi</Text>

        {/* Arama */}
        <View style={styles.aramaRow}>
          <Text style={styles.aramaLabel}>Ara:</Text>
          <TextInput
            style={styles.aramaInput}
            value={arama}
            onChangeText={setArama}
            placeholder=""
          />
        </View>

        {/* Tamamlanan Egzersizler */}
        {tamamlananlar.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Tamamlanan Egzersizler</Text>
            {tamamlananlar.map((egzersiz) => (
              <View key={egzersiz.id} style={styles.egzersizItem}>
                <Text style={styles.checkIcon}>✅</Text>
                <Text style={styles.egzersizText}>
                  {egzersiz.tarih} - {egzersiz.ad} Tamamlandı.
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Bekleyen Egzersizler */}
        {tamamlanmayanlar.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Bekleyen Egzersizler</Text>
            {tamamlanmayanlar.map((egzersiz) => (
              <View key={egzersiz.id} style={styles.egzersizItem}>
                <Text style={styles.pendingIcon}>⏳</Text>
                <Text style={styles.egzersizText}>
                  {egzersiz.tarih} - {egzersiz.ad}
                </Text>
              </View>
            ))}
          </>
        )}

        {filtrelenmis.length === 0 && (
          <Text style={styles.bosText}>Sonuç bulunamadı.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRed: {
    color: '#E74C3C',
  },
  headerGreen: {
    color: '#333',
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
  },
  iconRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconText: {
    fontSize: 18,
    color: colors.white,
  },
  scrollArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  breadcrumbBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  breadcrumbIcon: {
    fontSize: 14,
  },
  breadcrumbText: {
    fontSize: 12,
    color: colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 14,
  },
  aramaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  aramaLabel: {
    fontSize: 15,
    color: colors.text,
    marginRight: 10,
  },
  aramaInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  egzersizItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checkIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  pendingIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  egzersizText: {
    fontSize: 14,
    color: '#2E7D32',
    flex: 1,
    lineHeight: 20,
  },
  bosText: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
});
