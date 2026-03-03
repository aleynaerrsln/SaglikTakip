import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from '../constants/colors';

const motivasyonlar = [
  'Bugün kendinize ve bebeğinize güzel bir gün hediye edin!',
  'Her adım sağlıklı bir gebelik için atılmış bir adımdır.',
  'Siz güçlüsünüz, bebeğiniz şanslı!',
  'Sağlıklı anne, mutlu bebek demektir.',
  'Bugün de harika bir iş çıkaracaksınız!',
  'Kendinize zaman ayırmayı unutmayın.',
  'Her gün yeni bir başlangıçtır.',
];

const menuKategoriler = [
  {
    baslik: 'Sağlık Takibi',
    items: [
      { id: 'formlar', title: 'Formlar', emoji: '📋', screen: 'Formlar' },
      { id: 'bmiHesaplayici', title: 'BMI Hesaplayıcı', emoji: '⚖️', screen: 'BMIHesaplayici' },
      { id: 'ilacHatirlatici', title: 'İlaç Hatırlatıcı', emoji: '💊', screen: 'IlacHatirlatici' },
    ],
  },
  {
    baslik: 'Egzersiz & Aktivite',
    items: [
      { id: 'egitimler', title: 'Eğitimler', emoji: '🩺', screen: 'Egitimler' },
      { id: 'nefesEgzersizi', title: 'Nefes Egzersizi', emoji: '🌬️', screen: 'NefesEgzersizi' },
      { id: 'gunlukHedefler', title: 'Günlük Hedefler', emoji: '🥗', screen: 'GunlukHedefler' },
    ],
  },
  {
    baslik: 'Bilgi & Destek',
    items: [
      { id: 'sss', title: 'SSS', emoji: '❓', screen: 'SSS' },
      { id: 'anket', title: 'Anket', emoji: '📊', screen: 'Anket' },
      { id: 'bildirimler', title: 'Bildirimler', emoji: '🔔', screen: 'Bildirimler' },
    ],
  },
];

const getSelamlama = () => {
  const saat = new Date().getHours();
  if (saat < 6) return 'İyi Geceler';
  if (saat < 12) return 'Günaydın';
  if (saat < 18) return 'İyi Günler';
  return 'İyi Akşamlar';
};

const getTarih = () => {
  const gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const d = new Date();
  return `${gunler[d.getDay()]}, ${d.getDate()} ${aylar[d.getMonth()]}`;
};

const getMotivason = () => {
  const idx = new Date().getDate() % motivasyonlar.length;
  return motivasyonlar[idx];
};

export default function AnasayfaScreen({ navigation, route }) {
  const kullaniciAdi = route.params?.kullaniciAdi || 'Kullanıcı';

  const handlePress = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (e) {
      // Sayfa henüz eklenmemiş
    }
  };

  const cikisYap = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Giris' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Dekoratif arka plan */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selamlama + Çıkış */}
        <View style={styles.selamlamaArea}>
          <View>
            <Text style={styles.selamlamaText}>{getSelamlama()},</Text>
            <Text style={styles.kullaniciText}>{kullaniciAdi} 👋</Text>
            <Text style={styles.tarihAltiText}>{getTarih()}</Text>
          </View>
          <TouchableOpacity style={styles.cikisBtn} onPress={cikisYap} activeOpacity={0.7}>
            <Text style={styles.cikisEmoji}>👤</Text>
            <Text style={styles.cikisText}>Çıkış</Text>
          </TouchableOpacity>
        </View>

        {/* Motivasyon kartı */}
        <View style={styles.motivasyonCard}>
          <View style={styles.motivasyonGlow1} />
          <View style={styles.motivasyonGlow2} />
          <Text style={styles.motivasyonEmoji}>🤰</Text>
          <View style={styles.motivasyonContent}>
            <Text style={styles.motivasyonBaslik}>Günün Mesajı</Text>
            <Text style={styles.motivasyonText}>{getMotivason()}</Text>
          </View>
        </View>

        {/* Kategoriler ve menü kartları */}
        {menuKategoriler.map((kategori) => (
          <View key={kategori.baslik} style={styles.kategoriContainer}>
            <Text style={styles.kategoriBaslik}>{kategori.baslik}</Text>
            <View style={styles.menuGrid}>
              {kategori.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuCard}
                  onPress={() => handlePress(item.screen)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardGlow} />
                  <View style={styles.emojiContainer}>
                    <Text style={styles.menuEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE8EC',
  },
  // Dekoratif arka plan daireleri
  bgCircle1: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(232,87,125,0.08)',
  },
  bgCircle2: {
    position: 'absolute',
    top: 300,
    left: -60,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(232,87,125,0.05)',
  },
  bgCircle3: {
    position: 'absolute',
    bottom: 100,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(232,87,125,0.06)',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 30,
  },
  // Selamlama
  selamlamaArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  selamlamaText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '500',
  },
  kullaniciText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  tarihAltiText: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 4,
  },
  cikisBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  cikisEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  cikisText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  // Motivasyon kartı
  motivasyonCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  motivasyonGlow1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  motivasyonGlow2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  motivasyonEmoji: {
    fontSize: 44,
    marginRight: 14,
  },
  motivasyonContent: {
    flex: 1,
  },
  motivasyonBaslik: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  motivasyonText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '600',
    lineHeight: 22,
  },
  // Kategoriler
  kategoriContainer: {
    marginBottom: 20,
  },
  kategoriBaslik: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  // Menü kartı
  menuCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(232,87,125,0.06)',
  },
  cardGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(232,87,125,0.04)',
  },
  emojiContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(232,87,125,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  menuEmoji: {
    fontSize: 28,
  },
  menuText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
