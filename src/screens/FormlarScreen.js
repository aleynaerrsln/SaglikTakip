import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';

const formItems = [
  {
    id: 'kanSekeri',
    title: 'Kan Şekeri İzlem',
    aciklama: 'Kan şekeri değerlerinizi kaydedin ve takip edin',
    emoji: '🩸',
    screen: 'KanSekeriIzlem',
  },
  {
    id: 'fizikselAktivite',
    title: 'Fiziksel Aktivite',
    aciklama: 'Günlük aktivitelerinizi ve egzersizlerinizi kaydedin',
    emoji: '🏋️',
    screen: 'FizikselAktivitelerim',
  },
  {
    id: 'beslenme',
    title: 'Beslenme Değerlendirme',
    aciklama: 'Öğünlerinizi ve besin alımınızı takip edin',
    emoji: '🥗',
    screen: 'BeslenmeEkleme',
  },
];

export default function FormlarScreen({ navigation }) {
  const handlePress = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (e) {
      // Sayfa henüz eklenmemiş
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Sağlık verilerinizi kaydedin ve takip edin</Text>

        {formItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handlePress(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.cardGlow} />
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAciklama}>{item.aciklama}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Bilgi kartı */}
        <View style={styles.bilgiCard}>
          <Text style={styles.bilgiEmoji}>💡</Text>
          <Text style={styles.bilgiText}>
            Düzenli veri girişi, doktorunuzun sizi daha iyi takip etmesine yardımcı olur.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE8EC',
  },
  bgCircle1: {
    position: 'absolute',
    top: -40,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(232,87,125,0.08)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: 60,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(232,87,125,0.06)',
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  // Form kartları - liste görünümü
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(232,87,125,0.06)',
  },
  cardGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(232,87,125,0.04)',
  },
  emojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(232,87,125,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardAciklama: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
  },
  arrow: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '300',
    marginLeft: 8,
  },
  // Bilgi kartı
  bilgiCard: {
    backgroundColor: 'rgba(232,87,125,0.08)',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bilgiEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  bilgiText: {
    flex: 1,
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 19,
  },
});
