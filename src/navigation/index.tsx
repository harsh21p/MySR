import {ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './rootNavigation';
import SignUpScreen from 'routes/SignUpScreen';
import routes from 'routes';
import TabBar from './tabbar';
import MySetting from 'routes/MySetting';
import MyAccount from 'routes/MyAccount';
import NGOProfile from 'routes/NGOProfile';
import Dashboard from 'routes/Dashboard';
import WelcomeScreen from 'routes/WelcomeScreen';
import LoginScreen from 'routes/LoginScreen';
import VerifyOtp from 'routes/VerifyOtp';
import ForgetPassword from 'routes/ForgetPassword';
const RootStack = createStackNavigator();
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Maps from 'routes/Maps';
import VerifyEmail from 'routes/VerifyEmail';
import AddAddress from 'routes/AddAddress';
import {useAuthContext} from 'context/use-auth-context';
import Certificate from 'routes/Certificate';
import BlogView from 'routes/BlogView';
import react, {useEffect, useState, useCallback} from 'react';
import {getStorageItem} from 'hooks/use-async-storage';
import {keys} from 'constants/async-storage-keys';
import {Colors, Spacing} from '../style';
import { useFlipper } from '@react-navigation/devtools';

const AppNavigator = () => {
  const {authData} = useAuthContext();
  const [accessToken, setAccessToken] = useState();
  const [loading, setLoading] = useState(true);
  const _getAsyncStorageData = useCallback(async () => {
    const userLoginData = await getStorageItem(keys.userLoginData);
    if (userLoginData?.jwt) {
      setAccessToken(userLoginData?.jwt);
    } else {
      setAccessToken(undefined);
    }
    setLoading(false);
  }, [accessToken]);
  useEffect(() => {
    _getAsyncStorageData();
  }, [authData?.jwt, accessToken, _getAsyncStorageData]);
 
  useFlipper(navigationRef);

  return loading ? (
    <ActivityIndicator
      size={'large'}
      color={Colors.Button.primary}
      style={{
        flex: Spacing.size1,
        zIndex: Spacing.size1,
        backgroundColor: Colors.Generic.white,
      }}
    />
  ) : (
    <BottomSheetModalProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          {accessToken && authData?.jwt ? (
            <RootStack.Group screenOptions={{headerShown: false}}>
              <RootStack.Screen name={routes.TabBar} component={TabBar} />
              <RootStack.Screen name={routes.Dashboard} component={Dashboard} />
              <RootStack.Screen name={routes.BlogView} component={BlogView} />
              <RootStack.Screen
                name={routes.AddAddress}
                component={AddAddress}
              />
              <RootStack.Screen
                name={routes.Certificate}
                component={Certificate}
              />
              <RootStack.Screen name={routes.MySetting} component={MySetting} />
              <RootStack.Screen name={routes.MyAccount} component={MyAccount} />
              <RootStack.Screen
                name={routes.NGOProfile}
                component={NGOProfile}
              />
              <RootStack.Screen name={routes.Maps} component={Maps} />
            </RootStack.Group>
          ) : (
            <RootStack.Group screenOptions={{headerShown: false}}>
              <RootStack.Screen
                name={routes.WelcomeScreen}
                component={WelcomeScreen}
              />
              <RootStack.Screen
                name={routes.LoginScreen}
                component={LoginScreen}
              />
              <RootStack.Screen
                name={routes.ForgetPassword}
                component={ForgetPassword}
              />
              <RootStack.Screen
                name={routes.SignUpScreen}
                component={SignUpScreen}
              />

              {/* <RootStack.Screen name={routes.TabBar} component={TabBar} /> */}
              <RootStack.Screen
                name={routes.VerifyEmail}
                component={VerifyEmail}
              />
              <RootStack.Screen name={routes.VerifyOtp} component={VerifyOtp} />
            </RootStack.Group>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
};
export default AppNavigator;

const styles = StyleSheet.create({
  icons: {
    height: 24,
    width: 24,
    top: 5,
  },
  activeColor: {
    color: '#0B41CD',
  },
  inactiveColor: {
    color: '#2C2C2C',
  },
});
