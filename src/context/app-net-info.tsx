import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Spacing, Colors} from '../style';

interface Props {
  children: React.ReactChild | React.ReactChild[];
}
//
export const Context = React.createContext<boolean>(true);

const AppNetInfo = ({children}: Props): JSX.Element => {
  const netInfo = useNetInfo();

  return (
    <Context.Provider value={netInfo.isConnected || false}>
      {!netInfo.isConnected && (
        <>
          <SafeAreaView>
            <View style={styles.barStyle}>
              <Text style={styles.labelStyle}>No Internet Connection</Text>
            </View>
          </SafeAreaView>
        </>
      )}
      {children}
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    padding: Spacing.size5,
    backgroundColor: Colors.Text.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {color: Colors.Text.white},
});

export default AppNetInfo;
