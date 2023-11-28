import React, { useEffect, } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet, Animated, Easing, TouchableOpacity,Image, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from 'assets/images';

export const VoiceRecognitionComponent = ({setRecognizedText}:any) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const animationValue = React.useRef(new Animated.Value(0)).current;

  const startListeningAnimation = () => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1.3,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopListeningAnimation = () => {
    animationValue?.setValue(0);
    animationValue?.stopAnimation();
  };

  useEffect(() => {
   if(!permissionGranted){
    // Alert.alert("Please grant microphone permission to use voice typing");
   }
  }, [permissionGranted])
  

  const toggleRecording = async () => {
    if (isRecording) {
      stopListeningAnimation();
      Voice.stop();
    } else {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Microphone Permission',
              message: 'App needs access to your microphone.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionGranted(true);
            startListeningAnimation();
            Voice.start('en-US');
          } else {
            setPermissionGranted(false);
          }
        } else if (Platform.OS === 'ios') {
          setPermissionGranted(true);
          startListeningAnimation();
          Voice.start('en-US');
        }
      } catch (error) {
        console.error('Error requesting microphone permission:', error);
      }
    }
    setIsRecording(!isRecording);
  };

  Voice.onSpeechResults = (e) => {
    // setRecognizedText(e?.["value"][0].toString());
    console.log(e.value[0])
    setRecognizedText(e.value[0])
  };


  const styles = StyleSheet.create({
    circle:{
      flex:1,
      alignSelf: 'center',
      backgroundColor: 'rgba(27, 46, 114, 0.4)',
      width: 20,
      height: 20,
      marginLeft:-1,
      marginTop:-1,
      borderRadius: 50,
    },
    icon:{
        width: 17,
        height: 17,
        alignSelf: 'center',
        marginHorizontal: 15,
        zIndex:1
    },
    listeningAnimationContainer: {
      position:'absolute',
      transform: [
        {
          scale: animationValue?.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
          }),
        },
      ],
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={toggleRecording}>
         <Image
              resizeMode="contain"
              style={styles.icon}
              source={images.speechIcon}
            />
              {isRecording && permissionGranted && (
              <Animated.View style={styles.listeningAnimationContainer}>
                <View 
                  style={styles.circle} 
                />
              </Animated.View>
            )}
      </TouchableOpacity>
    
    </View>
  );
};





