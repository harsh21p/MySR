/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AuthProvider from 'context/use-auth-context';
import NotificationProvider from 'context/app-notification-context';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs(); 
const ReduxApp = () => (
  <Provider store={store}>
    <NotificationProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </NotificationProvider>
  </Provider>
);
AppRegistry.registerComponent(appName, () => ReduxApp);

