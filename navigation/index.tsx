import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, Image, Text } from 'react-native';
import { View } from 'react-native';
import Colors from '../constants/Colors';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import HeaderComponent from './Header';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: 'ChatHat',
          headerRight: () => (
            <View style={styles.headerRightStyle}>
              <Octicons name="search" size={24} color='black' />
              <MaterialCommunityIcons name="dots-vertical" size={24} />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          headerTitle:
            () => {
              return (
                <HeaderComponent params={route.params} />
              )
            },
          headerTitleAlign: 'left',
          headerTitleContainerStyle: {
            left: 45
          }
        })}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator >
  );
}

const styles = StyleSheet.create({
  headerRightStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginRight: 10
  },
})
