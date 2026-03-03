import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../constants/colors';

const anketSorulari = [
  {
    id: 1,
    soru: 'Bugün kendinizi nasıl hissediyorsunuz?',
    secenekler: ['Çok iyi', 'İyi', 'Orta', 'Kötü', 'Çok kötü'],
  },
  {
    id: 2,
    soru: 'Bugün nefes darlığı yaşadınız mı?',
    secenekler: ['Hiç yaşamadım', 'Hafif', 'Orta', 'Şiddetli'],
  },
  {
    id: 3,
    soru: 'Bugün öksürük şikayetiniz oldu mu?',
    secenekler: ['Hiç olmadı', 'Az oldu', 'Sık oldu', 'Sürekli oldu'],
  },
  {
    id: 4,
    soru: 'Bugün egzersizlerinizi yaptınız mı?',
    secenekler: ['Evet, hepsini yaptım', 'Bir kısmını yaptım', 'Hayır, yapamadım'],
  },
  {
    id: 5,
    soru: 'İlaçlarınızı düzenli kullanıyor musunuz?',
    secenekler: ['Evet, düzenli kullanıyorum', 'Bazen unutuyorum', 'Hayır, düzenli değil'],
  },
  {
    id: 6,
    soru: 'Uyku kalitenizi nasıl değerlendirirsiniz?',
    secenekler: ['Çok iyi uyudum', 'İyi uyudum', 'Kötü uyudum', 'Hiç uyuyamadım'],
  },
];

export default function AnketScreen() {
  const [cevaplar, setCevaplar] = useState({});
  const [gonderildi, setGonderildi] = useState(false);
  const [sonucModal, setSonucModal] = useState(false);

  const cevapSec = (soruId, secenek) => {
    setCevaplar({ ...cevaplar, [soruId]: secenek });
  };

  const anketGonder = () => {
    if (Object.keys(cevaplar).length < anketSorulari.length) {
      setSonucModal(true);
      return;
    }
    setGonderildi(true);
  };

  const sifirla = () => {
    setCevaplar({});
    setGonderildi(false);
  };

  if (gonderildi) {
    return (
      <View style={styles.container}>
        <View style={styles.basariContainer}>
          <Text style={styles.basariEmoji}>✅</Text>
          <Text style={styles.basariBaslik}>Anket Gönderildi!</Text>
          <Text style={styles.basariMesaj}>
            Yanıtlarınız kaydedildi. Sağlık durumunuzu düzenli olarak takip etmeniz çok önemlidir.
          </Text>
          <TouchableOpacity style={styles.tekrarBtn} onPress={sifirla}>
            <Text style={styles.tekrarBtnText}>Yeni Anket Doldur</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const tamamlanan = Object.keys(cevaplar).length;
  const toplam = anketSorulari.length;
  const yuzde = Math.round((tamamlanan / toplam) * 100);

  return (
    <View style={styles.container}>
      {/* İlerleme Barı */}
      <View style={styles.ilerlemeContainer}>
        <View style={styles.ilerlemeBar}>
          <View style={[styles.ilerlemeDolu, { width: `${yuzde}%` }]} />
        </View>
        <Text style={styles.ilerlemeText}>{tamamlanan}/{toplam} soru cevaplandı</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {anketSorulari.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.soruNumara}>Soru {index + 1}</Text>
            <Text style={styles.soruText}>{item.soru}</Text>

            <View style={styles.secenekler}>
              {item.secenekler.map((secenek) => (
                <TouchableOpacity
                  key={secenek}
                  style={[
                    styles.secenek,
                    cevaplar[item.id] === secenek && styles.secenekSecili,
                  ]}
                  onPress={() => cevapSec(item.id, secenek)}
                >
                  <View style={[styles.radio, cevaplar[item.id] === secenek && styles.radioSecili]}>
                    {cevaplar[item.id] === secenek && <View style={styles.radioIc} />}
                  </View>
                  <Text style={[styles.secenekText, cevaplar[item.id] === secenek && styles.secenekTextSecili]}>
                    {secenek}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.gonderBtn} onPress={anketGonder}>
          <Text style={styles.gonderBtnText}>Anketi Gönder</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Eksik cevap uyarısı */}
      <Modal visible={sonucModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalBaslik}>Eksik Cevap</Text>
            <Text style={styles.modalMesaj}>
              Lütfen tüm soruları cevaplayınız. ({tamamlanan}/{toplam} cevaplandı)
            </Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setSonucModal(false)}>
              <Text style={styles.modalBtnText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  ilerlemeContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  ilerlemeBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  ilerlemeDolu: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  ilerlemeText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'right',
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
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  soruNumara: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  soruText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 14,
    lineHeight: 22,
  },
  secenekler: {
    gap: 8,
  },
  secenek: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: '#FAFAFA',
  },
  secenekSecili: {
    borderColor: colors.primary,
    backgroundColor: '#FFF0F0',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSecili: {
    borderColor: colors.primary,
  },
  radioIc: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  secenekText: {
    fontSize: 14,
    color: colors.text,
  },
  secenekTextSecili: {
    color: colors.primary,
    fontWeight: '600',
  },
  gonderBtn: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  gonderBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
  // Başarı ekranı
  basariContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  basariEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  basariBaslik: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  basariMesaj: {
    fontSize: 15,
    color: colors.primaryLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  tekrarBtn: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  tekrarBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  modalBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  modalMesaj: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalBtnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
