import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './aws-exports'

import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';

import { withAuthenticator } from 'aws-amplify-react-native';


Amplify.configure({
  ...config,
  Analytics: {
    disabled: true
  }
});

const randomImages = [
  'https://i.ibb.co/Tb7n4Hc/avataaars-2.png',
  'https://i.ibb.co/T8LDkQk/avataaars-3.png',
  'https://i.ibb.co/CVqqtbP/avataaars-4.png',
  'https://i.ibb.co/qCm7886/avataaars-5.png',
  'https://i.ibb.co/mtfkBLM/avataaars-6.png',
  'https://i.ibb.co/CW6bV7H/avataaars-7.png',
  'https://i.ibb.co/K5y05C3/avataaars-8.png',
  'https://i.ibb.co/kqBhTQS/avataaars-9.png',
  'https://i.ibb.co/hYzPw3w/avataaars-10.png',
  'https://i.ibb.co/z4cG0LN/avataaars-11.png',
  'https://i.ibb.co/7bLrPsJ/avataaars-1.png',
  'https://i.ibb.co/hLQMsLF/avataaars.png'
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  useEffect(() => {

    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

      const getRandomImage = () => {
        return randomImages[Math.floor(Math.random() * randomImages.length)]
      };

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          console.log('User is already registered');
          return;
        };

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUrl: getRandomImage(),
          status: 'Hey, I am using ChatHat!'
        };

        await API.graphql(
          graphqlOperation(
            createUser,
            { input: newUser }
          )
        );
      }
    };

    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
