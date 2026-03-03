import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const baslangicBildirimler = [
  {
    id: 1,
    baslik: 'Egzersiz Hatırlatması',
    mesaj: 'Bugünkü KOAH egzersizlerinizi yapmayı unutmayın! Düzenli egzersiz solunum kapasitenizi artırır.',
    tarih: '03.03.2026 09:00',
    okundu: false,
    tur: 'egzersiz',
  },
  {
    id: 2,
    baslik: 'Kan Şekeri Ölçümü',
    mesaj: 'Sabah açlık kan şekerinizi ölçmeyi unutmayın.',
    tarih: '03.03.2026 07:30',
    okundu: false,
    tur: 'saglik',
  },
  {
    id: 3,
    baslik: 'Beslenme Takibi',
    mesaj: 'Dünkü beslenme kaydınız eksik. Lütfen öğünlerinizi girmeyi unutmayın.',
    tarih: '02.03.2026 20:00',
    okundu: true,
    tur: 'beslenme',
  },
  {
    id: 4,
    baslik: 'Haftalık Rapor',
    mesaj: 'Bu hafta 5 gün egzersiz yaptınız. Harika ilerleme! Hedefinize sadece 2 gün kaldı.',
    tarih: '01.03.2026 18:00',
    okundu: true,
    tur: 'rapor',
  },
  {
    id: 5,
    baslik: 'Su İçme Hatırlatması',
    mesaj: 'Günlük 2.5-3 litre su tüketmeniz önerilmektedir. Bugün yeterli su içtiniz mi?',
    tarih: '01.03.2026 14:00',
    okundu: true,
    tur: 'saglik',
  },
];

const turIkon = {
  egzersiz: '🏃',
  saglik: '❤️',
  beslenme: '🍎',
  rapor: '📊',
};

const turRenk = {
  egzersiz: '#3B82F6',
  saglik: '#EF4444',
  beslenme: '#F59E0B',
  rapor: '#8B5CF6',
};

export default function BildirimlerScreen() {
  const [bildirimler, setBildirimler] = useState(baslangicBildirimler);

  const okunduIsaretle = (id) => {
    setBildirimler(bildirimler.map((b) =>
      b.id === id ? { ...b, okundu: true } : b
    ));
  };

  const tumunuOku = () => {
    setBildirimler(bildirimler.map((b) => ({ ...b, okundu: true })));
  };

  const okunmamisSayisi = bildirimler.filter((b) => !b.okundu).length;

  return (
    <View style={styles.container}>
      {/* Üst Bar */}
      {okunmamisSayisi > 0 && (
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>{okunmamisSayisi} okunmamış bildirim</Text>
          <TouchableOpacity onPress={tumunuOku}>
            <Text style={styles.tumunuOkuText}>Tümünü Okundu İşaretle</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {bildirimler.map((bildirim) => (
          <TouchableOpacity
            key={bildirim.id}
            style={[styles.card, !bildirim.okundu && styles.cardOkunmamis]}
            onPress={() => okunduIsaretle(bildirim.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardRow}>
              <View style={[styles.ikonContainer, { backgroundColor: turRenk[bildirim.tur] }]}>
                <Text style={styles.ikonText}>{turIkon[bildirim.tur]}</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.baslikRow}>
                  <Text style={styles.baslik}>{bildirim.baslik}</Text>
                  {!bildirim.okundu && <View style={styles.okunmamisDot} />}
                </View>
                <Text style={styles.mesaj} numberOfLines={2}>{bildirim.mesaj}</Text>
                <Text style={styles.tarih}>{bildirim.tarih}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  topBarText: {
    color: colors.white,
    fontSize: 13,
  },
  tumunuOkuText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardOkunmamis: {
    backgroundColor: '#FFF8F0',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ikonContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ikonText: {
    fontSize: 20,
  },
  cardContent: {
    flex: 1,
  },
  baslikRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  baslik: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  okunmamisDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.warning,
    marginLeft: 8,
  },
  mesaj: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 19,
    marginBottom: 6,
  },
  tarih: {
    fontSize: 11,
    color: colors.gray,
  },
});
