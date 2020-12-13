import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import HeaderComponent from './Header';
import ContactsScreen from '../screens/ContactsScreen';

import { Auth } from 'aws-amplify';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log('error signing out', err);
    }
  };

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
              <TouchableOpacity onPress={() => signOut()}>
                <MaterialCommunityIcons name="logout" size={30} />
              </TouchableOpacity>
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
                <HeaderComponent
                  name={route.params.name}
                  id={route.params.chatRoomId}
                  imageUrl={route.params.imageUrl}
                />
              );
            },
          headerTitleAlign: 'left',
          headerTitleContainerStyle: {
            left: 45
          }
        })}
      />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator >
  );
}

const styles = StyleSheet.create({
  headerRightStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 60,
    marginRight: 10
  },
});
