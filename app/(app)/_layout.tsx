// _layout.tsx
import { Tabs } from 'expo-router/tabs';
import Colors from '@/constants/Colors';
import { SplashScreen } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapIcon from '@/assets/images/map.svg';
import SparklesIcon from '@/assets/images/sparkles.svg';
import MessageIcon from '@/assets/images/message.svg';
import ProfileIcon from '@/assets/images/profile.svg';

const customLightTheme = {
  dark: false,
  colors: {
    primary: Colors.purple,
    background: Colors.beige,
    card: Colors.lightBeige,
    text: Colors.darkGrey,
    border: Colors.darkGrey,
    notification: Colors.darkGrey,
    highlight: Colors.purple,
  },
};

void SplashScreen.preventAutoHideAsync();
export default function AppLayout() {
  const [currentTheme] = useState(customLightTheme);
  console.log(currentTheme);

  return (
    <Tabs
      sceneContainerStyle={styles.tabsBackground}
      screenOptions={{
        tabBarActiveTintColor: Colors.purple,
        tabBarInactiveTintColor: Colors.darkGrey,
        tabBarLabelStyle: {
          fontFamily: 'ITCAvantGardeMd',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          paddingBottom: 10,
        },
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          borderTopWidth: 0,
          justifyContent: 'center',
          height: 60,
        },
        headerStyle: {
          borderBottomWidth: 0,
          borderWidth: 0,
          borderColor: 'red',
          shadowColor: '#191919',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        headerTitleStyle: {
          fontFamily: 'ITCAvantGardeMd',
        },
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <MapIcon style={{ color }} />,
        }}
      />
      <Tabs.Screen
        name="swipe"
        options={{
          title: 'Swipe',
          tabBarIcon: ({ color }) => <SparklesIcon style={{ color }} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MessageIcon style={{ color }} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <ProfileIcon style={{ color }} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabsBackground: {
    backgroundColor: 'transparent',
  },
});
