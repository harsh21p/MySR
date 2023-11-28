import {View, Text, FlatList, Pressable, Image} from 'react-native';
import styles from './style';
import images from 'assets/images';
import {ScrollView} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import routes from 'routes';
import * as RootNavigation from 'navigation/rootNavigation';
import { clearProfile } from 'routes/MyAccount/slice';
import { useAppDispatch } from '../../redux/hooks';
import {useAuthContext} from 'context/use-auth-context';
const SearchDropDown = ({dataNearby, search , ngo, setSearch}: any) => {
  const [searchList, setSearchList] = useState<any>([]);

  const {authData} = useAuthContext();

  useEffect(() => {
    if (search.length > 0) {
      let tempData = dataNearby?.filter((item, index) => {
        let item1 = ngo ? item.first_name.toLowerCase() : item.organization_name.toLowerCase();
        let tempsearch = search.toLowerCase();
        if (item1.includes(tempsearch)) {
          return item;
        }
      });
   
      if (search.length == 0) {
        setSearchList([]);
      }
      setSearchList(tempData);
      // dataNearby.forEach(i=>console.log(i))
    }
  }, [search]);
  const dispatch = useAppDispatch();

  return search.length > 0 ? (
    <View style={styles.card}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}

      <Text style={styles.title}>
        Nearby {ngo ? 'donor’s':'organization’s' }
      </Text>

      {searchList?.length > 0 ? (
        <FlatList
          data={searchList}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollNearby}
          renderItem={({item}) => (
            <Pressable
              style={styles.nHolder}
              onPress={() => {
                setSearch('');
                dispatch(clearProfile());
                RootNavigation.navigate(routes.NGOProfile,{data: authData?.roleName === 'NGO' ?  item.users_id : item.user_id});
              }}>
                <View style={styles.yellowView}>
                 {item?.profile_pic === undefined || item?.profile_pic == 'null' || item?.profile_pic === null ? (
                  <Text style={styles.profileName}>
                    {ngo
                      ? item?.first_name?.charAt(0).toLocaleUpperCase() +
           
                        item?.last_name?.charAt(0).toLocaleUpperCase()
                      : item?.organization_name?.charAt(0).toLocaleUpperCase() +
             
                        item?.organization_name?.charAt(1).toLocaleUpperCase()}
                  </Text>
                ) : (
                  <Image
                    source={{uri:item?.profile_pic}}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
                </View>
              <Text style={styles.name}>{ ngo ? item.first_name+' '+item.last_name : item.organization_name}</Text>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={{color:'#000'}}>Not Found</Text>
      )}

      {/* <Text style={styles.titleSecond}>News</Text>
      <FlatList
            data={dataNearby}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          
            style={styles.scrollNearby}
            renderItem={({item}) => 
              <Pressable style={styles.nHolder}
                onPress={()=>{
                  console.log(item.ngo_id);
                }}>
                  <Image source={images.news} style={styles.image} resizeMode='cover'/>
                  <Text style={styles.nameHeadline}>{item.organization_name}</Text>
              </Pressable>
            }
            showsHorizontalScrollIndicator={false}
        />

    <Text style={styles.titleSecond}>Blogs</Text>
      <FlatList
            data={dataNearby}
            horizontal={false}
            style={styles.scrollNearby}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => 
              <Pressable style={styles.nHolder}
                onPress={()=>{
                  console.log(item.ngo_id);
                }}>
                  <Image source={images.news} style={styles.image} resizeMode='cover'/>
                  <Text style={styles.nameHeadline}>{item.organization_name}</Text>
              </Pressable>
            }
            showsHorizontalScrollIndicator={false}
        /> */}
      {/* </ScrollView> */}
    </View>
  ) : (
    <></>
  );
};

export default SearchDropDown;
