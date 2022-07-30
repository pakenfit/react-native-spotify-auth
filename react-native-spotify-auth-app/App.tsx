import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoadingProvider from './src/components/Loading';
import ToastProvider from './src/components/Toast';
import RootNavigation from './src/navigations/RootNavigation';
import { Routes } from './src/navigations/routes';

const linking = {
  prefixes: ['reactnativespotifyauthapp://'],
  config: {
    screens: {
      [Routes.WELCOME]: {
        path: 'authorized/:data',
        parse: {
          data: (data: string) => data,
        },
      },
    },
  },
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ToastProvider>
              <LoadingProvider>
                <RootNavigation />
              </LoadingProvider>
            </ToastProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PortalProvider>
    </NavigationContainer>
  );
};

export default App;
