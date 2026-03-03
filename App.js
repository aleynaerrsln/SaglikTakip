import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from './src/constants/colors';

import AnasayfaScreen from './src/screens/AnasayfaScreen';
import FormlarScreen from './src/screens/FormlarScreen';
import GunlukHedeflerScreen from './src/screens/GunlukHedeflerScreen';
import KanSekeriIzlemScreen from './src/screens/KanSekeriIzlemScreen';
import FizikselAktivitelerimScreen from './src/screens/FizikselAktivitelerimScreen';
import BeslenmeEklemeScreen from './src/screens/BeslenmeEklemeScreen';
import EgitimlerScreen from './src/screens/EgitimlerScreen';
import SSSScreen from './src/screens/SSSScreen';
import BildirimlerScreen from './src/screens/BildirimlerScreen';
import AnketScreen from './src/screens/AnketScreen';
import IlacHatirlaticiScreen from './src/screens/IlacHatirlaticiScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Anasayfa"
          component={AnasayfaScreen}
          options={{ title: 'Anasayfa' }}
        />
        <Stack.Screen
          name="Formlar"
          component={FormlarScreen}
          options={{ title: 'Formlar' }}
        />
        <Stack.Screen
          name="GunlukHedefler"
          component={GunlukHedeflerScreen}
          options={{ title: 'Günlük Hedefler' }}
        />
        <Stack.Screen
          name="KanSekeriIzlem"
          component={KanSekeriIzlemScreen}
          options={{ title: 'Kan Şekeri İzlemlerim' }}
        />
        <Stack.Screen
          name="FizikselAktivitelerim"
          component={FizikselAktivitelerimScreen}
          options={{ title: 'Fiziksel Aktivitelerim' }}
        />
        <Stack.Screen
          name="BeslenmeEkleme"
          component={BeslenmeEklemeScreen}
          options={{ title: 'Beslenme Ekleme Formu' }}
        />
        <Stack.Screen
          name="Egitimler"
          component={EgitimlerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SSS"
          component={SSSScreen}
          options={{ title: 'Sıkça Sorulan Sorular' }}
        />
        <Stack.Screen
          name="Bildirimler"
          component={BildirimlerScreen}
          options={{ title: 'Bildirimler' }}
        />
        <Stack.Screen
          name="Anket"
          component={AnketScreen}
          options={{ title: 'Anket' }}
        />
        <Stack.Screen
          name="IlacHatirlatici"
          component={IlacHatirlaticiScreen}
          options={{ title: 'İlaç Hatırlatıcı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
