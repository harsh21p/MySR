import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {FlatList} from 'react-native-gesture-handler';
import HistoryComp from '../../component/HistoryComp';

interface History {
  id: number;
  status: number;
  title: string;
  subTitle: string;
}

interface Props {
  History: History[];
  isCertified: boolean;
}

const HistoryNgo = ({History, isCertified}: Props): JSX.Element => {
  const lastItem = History.length;
  return (
    <View style={styles.card}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={History}
        renderItem={({item}) => (
          <HistoryComp
            status={item.status}
            title={item.title}
            subTitle={item.subTitle}
            last={lastItem === item.id}
            length={lastItem}
            isCertified={isCertified}
          />
        )}
      />
    </View>
  );
};

export default HistoryNgo;
