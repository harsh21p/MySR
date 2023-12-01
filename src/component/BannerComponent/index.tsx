import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Text, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Colors} from '../../style';

const BannerComponent = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [dotWidth1, setdotWidth1] = useState(21);
  const [dotWidth2, setdotWidth2] = useState(11);
  const [dotWidth3, setdotWidth3] = useState(11);

  const [color1, setColor1] = useState(Colors.Text.blue);
  const [color2, setColor2] = useState(Colors.Button.primary);
  const [color3, setColor3] = useState(Colors.Button.primary);

  useEffect(() => {
    // Show the first item immediately when the screen starts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      // Increment the index to show the next item in the data array
      const nextIndex = (currentIndex + 1) % data.length;

      // Fade out the current item
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: false,
      }).start(() => {
        setCurrentIndex(nextIndex);

        // Update dot styles based on the current index
        updateDotStyles(nextIndex);

        // Fade in the new item after the previous item has faded out
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // Adjust the duration as needed
          useNativeDriver: false,
        }).start();
      });
    }, 10000); // 20 seconds interval

    return () => clearInterval(interval);
  }, [currentIndex, data, fadeAnim]);

  const updateDotStyles = index => {
    if (index == 0) {
      setdotWidth1(21);
      setdotWidth2(11);
      setdotWidth3(11);
      setColor1(Colors.Text.blue);
      setColor2(Colors.Button.primary);
      setColor3(Colors.Button.primary);
    } else if (index == 1) {
      setdotWidth1(11);
      setdotWidth2(21);
      setdotWidth3(11);
      setColor1(Colors.Button.primary);
      setColor2(Colors.Text.blue);
      setColor3(Colors.Button.primary);
    } else {
      setdotWidth1(11);
      setdotWidth2(11);
      setdotWidth3(21);
      setColor1(Colors.Button.primary);
      setColor2(Colors.Button.primary);
      setColor3(Colors.Text.blue);
    }
  };

  const item = data[currentIndex];
  return (
    <>
      <Animated.View style={{opacity: fadeAnim}}>
        <View style={styles.nHolderNews}>
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
        </View>

        {/* Dots */}
      </Animated.View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 30,
          marginTop: 11,
        }}>
        <Animated.View
          style={{
            width: dotWidth1,
            height: 11,
            borderRadius: 11,
            backgroundColor: color1,
          }}
        />
        <Animated.View
          style={{
            width: dotWidth2,
            height: 11,
            borderRadius: 11,
            backgroundColor: color2,
            marginHorizontal: 5,
          }}
        />
        <Animated.View
          style={{
            width: dotWidth3,
            height: 11,
            borderRadius: 11,
            backgroundColor: color3,
          }}
        />
      </View>
    </>
  );
};

export default BannerComponent;
