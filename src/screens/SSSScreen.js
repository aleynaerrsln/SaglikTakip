import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const sorular = [
  {
    id: 1,
    soru: 'KOAH nedir?',
    cevap: 'KOAH (Kronik Obstrüktif Akciğer Hastalığı), akciğerlerdeki hava yollarının daralması ve akciğer dokusunun hasar görmesi sonucu oluşan kronik bir solunum yolu hastalığıdır. Nefes darlığı, kronik öksürük ve balgam en sık görülen belirtileridir.',
  },
  {
    id: 2,
    soru: 'KOAH egzersizleri ne işe yarar?',
    cevap: 'KOAH egzersizleri solunum kaslarını güçlendirir, nefes darlığını azaltır, fiziksel dayanıklılığı artırır ve günlük yaşam kalitesini iyileştirir. Düzenli egzersiz, hastalığın ilerlemesini yavaşlatmaya yardımcı olur.',
  },
  {
    id: 3,
    soru: 'Günde kaç kez egzersiz yapmalıyım?',
    cevap: 'Hekiminizin önerisi doğrultusunda günde en az 1-2 kez, her seansta 15-30 dakika egzersiz yapmanız önerilir. Egzersiz süresini ve yoğunluğunu zamanla kademeli olarak artırabilirsiniz.',
  },
  {
    id: 4,
    soru: 'Egzersiz sırasında nefes darlığı hissedersem ne yapmalıyım?',
    cevap: 'Egzersizi durdurun ve büzük dudak solunumu tekniğini uygulayın: Burnunuzdan yavaşça nefes alın, dudaklarınızı büzerek ağızdan yavaşça verin. Nefes darlığı geçene kadar dinlenin. Şiddetli nefes darlığında hekiminize başvurun.',
  },
  {
    id: 5,
    soru: 'Kan şekeri takibi neden önemli?',
    cevap: 'KOAH hastaları arasında diyabet riski yüksektir. Düzenli kan şekeri takibi, olası komplikasyonları erken tespit etmenizi ve tedavi planınızı buna göre ayarlamanızı sağlar.',
  },
  {
    id: 6,
    soru: 'Beslenme takibi neden gerekli?',
    cevap: 'Doğru beslenme, KOAH yönetiminin önemli bir parçasıdır. Yeterli kalori ve protein alımı solunum kaslarının güçlenmesine, bağışıklık sisteminin desteklenmesine ve genel sağlığın korunmasına yardımcı olur.',
  },
  {
    id: 7,
    soru: 'Uygulamadaki verileri nasıl paylaşabilirim?',
    cevap: 'Formlar bölümünden girdiğiniz tüm veriler (kan şekeri, fiziksel aktivite, beslenme) kaydedilir. Kontrol muayenelerinizde bu verileri doktorunuzla paylaşabilirsiniz.',
  },
];

export default function SSSScreen() {
  const [acikSoru, setAcikSoru] = useState(null);

  const toggleSoru = (id) => {
    setAcikSoru(acikSoru === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>Merak ettiğiniz soruların cevapları</Text>

      {sorular.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => toggleSoru(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.soruRow}>
            <View style={styles.soruNumara}>
              <Text style={styles.numaraText}>{item.id}</Text>
            </View>
            <Text style={styles.soruText}>{item.soru}</Text>
            <Text style={styles.okIcon}>{acikSoru === item.id ? '▲' : '▼'}</Text>
          </View>

          {acikSoru === item.id && (
            <View style={styles.cevapContainer}>
              <View style={styles.cevapDivider} />
              <Text style={styles.cevapText}>{item.cevap}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  soruRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soruNumara: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numaraText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  soruText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  okIcon: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 8,
  },
  cevapContainer: {
    marginTop: 12,
  },
  cevapDivider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 12,
  },
  cevapText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 22,
  },
});
