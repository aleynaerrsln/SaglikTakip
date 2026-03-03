import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

export default function KayitOlScreen({ navigation }) {
  const [adSoyad, setAdSoyad] = useState('');
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  const [sifreGizli, setSifreGizli] = useState(true);

  const kayitOl = async () => {
    if (!adSoyad.trim() || !kullaniciAdi.trim() || !sifre.trim()) {
      Alert.alert('Uyarı', 'Tüm alanları doldurunuz.');
      return;
    }

    if (sifre !== sifreTekrar) {
      Alert.alert('Uyarı', 'Şifreler eşleşmiyor.');
      return;
    }

    if (sifre.length < 4) {
      Alert.alert('Uyarı', 'Şifre en az 4 karakter olmalıdır.');
      return;
    }

    try {
      const kullanici = {
        adSoyad: adSoyad.trim(),
        kullaniciAdi: kullaniciAdi.trim(),
        sifre: sifre,
      };
      await AsyncStorage.setItem('kayitliKullanici', JSON.stringify(kullanici));

      Alert.alert(
        'Kayıt Başarılı',
        'Hesabınız oluşturuldu. Giriş yapabilirsiniz.',
        [{ text: 'Giriş Yap', onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      Alert.alert('Hata', 'Kayıt sırasında bir sorun oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Üst Kısım */}
        <View style={styles.ustKisim}>
          <View style={styles.dekorDaire1} />
          <View style={styles.dekorDaire2} />

          <View style={styles.illustrationContainer}>
            <View style={styles.outerGlow} />
            <View style={styles.innerCircle}>
              <Text style={styles.illustrationEmoji}>👶</Text>
            </View>
          </View>

          <Text style={styles.appTitle}>Hesap Oluştur</Text>
          <Text style={styles.appSubtitle}>Sağlık takibinize hemen başlayın</Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          {/* Ad Soyad */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIconText}>👤</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Ad Soyad</Text>
              <TextInput
                style={styles.input}
                value={adSoyad}
                onChangeText={setAdSoyad}
                placeholder="Adınız ve soyadınız"
                placeholderTextColor="#BBBBBB"
              />
            </View>
          </View>

          {/* Kullanıcı Adı */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIconText}>📧</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
              <TextInput
                style={styles.input}
                value={kullaniciAdi}
                onChangeText={setKullaniciAdi}
                placeholder="Kullanıcı adınızı belirleyin"
                placeholderTextColor="#BBBBBB"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Şifre */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.sifreRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={sifre}
                  onChangeText={setSifre}
                  placeholder="En az 4 karakter"
                  placeholderTextColor="#BBBBBB"
                  secureTextEntry={sifreGizli}
                />
                <TouchableOpacity
                  style={styles.gozBtn}
                  onPress={() => setSifreGizli(!sifreGizli)}
                >
                  <Text style={styles.gozIcon}>{sifreGizli ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Şifre Tekrar */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIconText}>🔐</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Şifre Tekrar</Text>
              <TextInput
                style={styles.input}
                value={sifreTekrar}
                onChangeText={setSifreTekrar}
                placeholder="Şifrenizi tekrar giriniz"
                placeholderTextColor="#BBBBBB"
                secureTextEntry={sifreGizli}
              />
            </View>
          </View>

          {/* Kayıt Ol Butonu */}
          <TouchableOpacity style={styles.kayitBtn} onPress={kayitOl} activeOpacity={0.8}>
            <Text style={styles.kayitBtnText}>KAYIT OL</Text>
          </TouchableOpacity>

          {/* Giriş Yap */}
          <View style={styles.girisRow}>
            <Text style={styles.girisText}>Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.girisLink}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  ustKisim: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
    paddingTop: 50,
    paddingBottom: 16,
  },
  dekorDaire1: {
    position: 'absolute',
    top: 30,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  dekorDaire2: {
    position: 'absolute',
    bottom: 20,
    right: -10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    marginBottom: 12,
  },
  outerGlow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: {
    fontSize: 45,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 36,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  inputIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 14,
  },
  inputIconText: {
    fontSize: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEEEEE',
    fontSize: 15,
    color: colors.text,
    paddingVertical: 8,
  },
  sifreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gozBtn: {
    padding: 8,
    marginLeft: 4,
  },
  gozIcon: {
    fontSize: 18,
  },
  kayitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  kayitBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  girisRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  girisText: {
    fontSize: 14,
    color: colors.gray,
  },
  girisLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
