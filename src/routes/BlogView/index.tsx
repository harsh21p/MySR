import styles from './styles';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  Text,
} from 'react-native';
import React from 'react';
// import {useTranslation} from 'react-i18next';

import {Colors} from '../../style';
import { HeaderView } from '../../component/HeaderView';
import images from 'assets/images';

const BlogView = () => {
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.mainBody}>
        <StatusBar
          backgroundColor={Colors.Generic.statusBar}
          barStyle={'dark-content'}
        />
        <HeaderView />
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.srollView}>
              <Image source={images.news} resizeMode='cover' style={styles.image}/>
              <Text style={styles.title}>Title of the blog dsjkjk sds kjdbsa jsad hjdsba</Text>
              <Text style={styles.subTitle}>       Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba. Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba.  Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba.  Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba. Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba.  Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba.  Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba Title of the blog dsjkjk sds sdd kjdbsa jsad hjdsba Title of the blog dsjkjk sds kjdbsa jsad hjdsba.                                                    </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BlogView;
