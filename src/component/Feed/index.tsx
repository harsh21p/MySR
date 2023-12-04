import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList, Image, Pressable} from 'react-native';
import styles from './style';
import images from 'assets/images';
import {Colors} from '../../style';
import LinearGradient from 'react-native-linear-gradient';
import routes from 'routes';
import * as RootNavigation from 'navigation/rootNavigation';
import {useAppDispatch} from '../../redux/hooks';
import {clearProfile} from 'routes/MyAccount/slice';
import {useAuthContext} from 'context/use-auth-context';
import SVGIcon from '../../component/SVGIcon';
import icons from 'assets/icons';
import BannerComponent from '../../component/BannerComponent';

const Feed = ({type, dataNearby}: any): JSX.Element => {
  const dispatch = useAppDispatch();

  const {authData} = useAuthContext();

  const dataBlog = [
    {
      blogImg: images.blog,
      name: '“Manoshakti: My Moment of Joy” – Illuminating Young Lives',
      subTitle:
        'Manoshakti: Illuminating Young Lives Through a Year Long Program for Underprivileged Children In a world marked by disparities, a beacon of hope shines bright through a transformative initiative...',
    },
    {
      blogImg: images.blog1,
      name: 'Yuvashree – active learner and passionate about sports',
      subTitle:
        'Yuvashree, a class 8th student, the eldest in a four-member family from Padappai, Chennai, was unable to express herself and froze when asked to come up in front of her class or on stage. An active learner and passionat...',
    },
    {
      blogImg: images.blog2,
      name: 'Dignity kits enhance enrolment and keep girls in school',
      subTitle:
        'The COVID-19 pandemic and extreme poverty have added to the challenges female students’ face living in a predominantly patriarchal society. One of the impacts is on menstruating girls. Menstrual absorbents are essential for self-respect, physical and psychosocial...',
    },
    {
      blogImg: images.blog3,
      name: 'Education in COVID times: A multi-front issue',
      subTitle:
        'School closures due to the COVID-19 pandemic has pushed lesser privileged children and families into multidimensional poverty. The schools shut down has deprived them not only of education but also healthcare...',
    },
  ];

  // const [item, setItem] = useState<News>();

  var newsData = [
    {
      image: images.news,
      title: 'Uttarkashi tunnel collapse',
      subTitle:
        'The rescue operation is in final stages and trapped workers in Silkyara Tunnel will be out in...',
    },
    {
      image: images.news2,
      title: 'Firefighters, army douse',
      subTitle:
        'Firefighters and army personnel have extinguished a fire that ripped through a...',
    },
    {
      image: images.blog2,
      title: 'COVID-19 virus may survive',
      subTitle:
        'The length of time the COVID-19 virus may survive on foods was revealed by a study...',
    },
  ];
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollMain}>
      <View style={styles.scroll}>
        <>
          <Text style={styles.feedTitleOne}>
            Nearby {type !== 1 ? 'organization’s' : 'donor’s'}
          </Text>
          {dataNearby?.length == 0 ? (
            <View style={styles.innerView}>
              <SVGIcon
                style={styles.donateNowEl}
                icon={icons.notFound}
                key={'icon'}
              />
            </View>
          ) : (
            <FlatList
              data={dataNearby}
              horizontal={true}
              style={styles.scrollNearby}
              ListFooterComponent={<View style={{width: 20}}></View>}
              renderItem={({item}) => (
                <Pressable
                  style={styles.nHolder}
                  onPress={() => {
                    dispatch(clearProfile());
                    RootNavigation.navigate(routes.NGOProfile, {
                      data:
                        authData?.roleName === 'NGO'
                          ? item.users_id
                          : item.user_id,
                    });
                  }}>
                  <View style={styles.yellowView}>
                    {item?.profile_pic === undefined ||
                    item?.profile_pic == 'null' ||
                    item?.profile_pic === null ? (
                      <Text style={styles.profileName}>
                        {type === 1
                          ? item?.first_name?.charAt(0).toLocaleUpperCase() +
                            item?.last_name?.charAt(0).toLocaleUpperCase()
                          : item?.organization_name
                              ?.charAt(0)
                              .toLocaleUpperCase() +
                            item?.organization_name
                              ?.charAt(1)
                              .toLocaleUpperCase()}
                      </Text>
                    ) : (
                      <Image
                        source={{uri: item?.profile_pic}}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <Text style={styles.name}>
                    {type === 1
                      ? item?.first_name + ' ' + item?.last_name
                      : item?.organization_name}
                  </Text>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>

        <>
          <Text style={styles.feedTitleOne}>News</Text>

          {/* <View style={styles.nHolderNews}>
            <View style={styles.nNHolder}>
              <Image
                source={item?.image}
                style={styles.newsImg}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[Colors.Gradient.newsTop, Colors.Gradient.newsBottom]}
                style={styles.grd}>
                <Text style={styles.newsTitle}>{item?.title}</Text>
                <Text style={styles.newsSubTitle}>{item?.subTitle}</Text>
              </LinearGradient>
            </View>
          </View> */}

          <BannerComponent data={newsData} />

          <Text style={styles.feedTitleOne}>Blogs posted</Text>
          <FlatList
            data={dataBlog}
            horizontal={true}
            style={styles.scrollNearby}
            ListFooterComponent={<View style={{width: 20}}></View>}
            renderItem={({item}) => (
              <View style={styles.blogView}>
                <Image
                  source={item.blogImg}
                  style={styles.blogImg}
                  resizeMode="cover"
                />
                <Text numberOfLines={2} style={styles.blogTitle}>
                  {item.name}
                </Text>
                <Text numberOfLines={4} style={styles.blogSub}>
                  {item?.subTitle}
                </Text>
                <Text style={styles.blogSee}>see more</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </>
      </View>
    </ScrollView>
  );
};

export default Feed;
