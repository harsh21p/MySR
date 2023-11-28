import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from 'routes';
import {Image, Platform} from 'react-native';
import Dashboard from 'routes/Dashboard';
import MySetting from 'routes/MySetting';
import History from 'routes/History';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../style';
import images from '../assets/images';
import TabSelected from '../component/TabSelected';

const TabBar = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={routes.Dashboard}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        keyboardHidesTabBar: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingHorizontal: 20,
          height: Platform.OS === 'android' ? 65 : 90,
          alignItems: 'center',
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[Colors.Gradient.tabBarTop, Colors.Gradient.tabBarBottom]}
            style={{
              height: '100%',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          />
        ),
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let x;
          if (route.name === routes.Dashboard) {
            iconName = focused
              ? (x = <TabSelected image={images.homeSelected} label={'Home'} />)
              : (x = (
                  <Image source={images.home} style={{width: 24, height: 24}} />
                ));
          } else if (route.name === routes.History) {
            iconName = focused
              ? (x = (
                  <TabSelected
                    image={images.historySelected}
                    label={'History'}
                  />
                ))
              : (x = (
                  <Image
                    source={images.history}
                    style={{width: 24, height: 24}}
                  />
                ));
          } else if (route.name === routes.MySetting) {
            iconName = focused
              ? (x = (
                  <TabSelected
                    image={images.settingsSelected}
                    label={'Settings'}
                  />
                ))
              : (x = (
                  <Image
                    source={images.settings}
                    style={{width: 24, height: 24}}
                  />
                ));
          }
          return x;
        },
      })}>
      <Tab.Screen name={routes.Dashboard} component={Dashboard} />
      <Tab.Screen name={routes.History} component={History} />
      <Tab.Screen name={routes.MySetting} component={MySetting} />
    </Tab.Navigator>
  );
};
export default TabBar;
