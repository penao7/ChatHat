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
  'https://i.picsum.photos/id/104/3840/2160.jpg?hmac=Rv0qxBiYb65Htow4mdeDlyT5kLM23Z2cDlN53YYldZU',
  'https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM',
  'https://i.picsum.photos/id/1035/5854/3903.jpg?hmac=DV0AS2MyjW6ddofvSIU9TVjj1kewfh7J3WEOvflY8TM',
  'https://i.picsum.photos/id/1074/5472/3648.jpg?hmac=w-Fbv9bl0KpEUgZugbsiGk3Y2-LGAuiLZOYsRk0zo4A',
  'https://i.picsum.photos/id/1084/4579/3271.jpg?hmac=YblMazviSugJVfZsFPaFI_Vp6lBeQin62qpm8rxHruo',
  'https://i.picsum.photos/id/175/2896/1944.jpg?hmac=djMSfAvFgWLJ2J3cBulHUAb4yvsQk0d4m4xBJFKzZrs'
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  useEffect(() => {
    const fetchUser = async () => {
      // get Authenticated user from Auth

      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

      console.log('SUB', userInfo.attributes.sub);

      const getRandomImage = () => {
        return randomImages[Math.floor(Math.random() * randomImages.length)]
      };

      if (userInfo) {

        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        console.log('userData', userData);

        if (userData.data.getUser) {
          console.log('User is already registered');
          return;
        };

        console.log(getRandomImage());

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


        // get the user from Backend with the user SUB from Auth

        // If there is no user with the id, create one
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
