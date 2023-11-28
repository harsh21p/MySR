import {Pressable, View, Image, Text} from 'react-native';
import styles from './style';
import { useEffect, useState } from 'react';

const NotificationList = ({icon, title, subTitle,press}: any) => {

  const [click,setClick]=useState(false);
  const [lines,setLines]=useState(2);

  useEffect(() => {
    if(click){
      setLines(100)
    }else{
      setLines(2);
    }
  }, [click])

  const linesLength = subTitle?.length

  return (
    <Pressable style={styles.listItemMain} onPress={press}>
      <View style={styles.listItem}>
        <Image source={icon} style={styles.icon} resizeMode='contain'/>
        <View style={styles.colView}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={lines} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>

      {linesLength > 105 ? <Pressable onPress={()=>setClick(!click)}>
        <Text style={styles.show}>Show more</Text></Pressable>:<View style={styles.height}/>
      }
    </Pressable>
  );

};

export default NotificationList;
