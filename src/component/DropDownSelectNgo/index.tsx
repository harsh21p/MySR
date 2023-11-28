/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Colors} from '../../style';
import SVGIcon from '../SVGIcon';
import icons from 'assets/icons';
import {callNearByNgo, nearByNgoInfo} from 'routes/Dashboard/slice/NearByNGO';
import Checkbox from '../CheckBox';
import {kebabCase} from 'lodash';
import {useAuthContext} from 'context/use-auth-context';
export const DropDownSelectNgo = ({
  selectedNgos,
  lat,
  long,
  item = [],
}: any) => {

  const dispatch = useAppDispatch();
  const {authData} = useAuthContext();

  const {isNearByNGOsLoading, nearByNGOsError, nearByNGOsSuccess} = useAppSelector(nearByNgoInfo);

  function getNearByNgo() {
    const payload = {
      jwt: authData?.jwt,
      radius: valueOfSlider,
      long: long,
      lat: lat,
    };
    dispatch(callNearByNgo(payload));
  }
  const [valueOfSlider, setValueOfSlider] = useState(0);
  useEffect(() => {
    getNearByNgo();
  }, [valueOfSlider])

  const [allNearByNgo, setAllNearByNgo] = useState<any>();

  useEffect(() => {
    if(nearByNGOsSuccess && nearByNGOsSuccess?.data){
      setAllNearByNgo(nearByNGOsSuccess?.data);
    }
  }, [nearByNGOsSuccess])
  

  const allNgo = {
    id: '0',
    name: "All Nearby NGO's",
  };

  const input = useRef<TextInput>(null);

  const [click, setClick] = useState(false);

  const [updated,setUpdated]= useState([]);
  const [newArray,setNewArray] = useState([]);

  useEffect(() => {
   setUpdated([]);
   setNewArray([]);


  if (item.length !== 0) {
    var newTemp = [];
    item?.map((selected: any) => {
      allNearByNgo?.map((e)=>{
          if(e.ngo_id === selected){
            newTemp.push({
              id: e?.ngo_id,
              name: e?.organization_name,
              bool: true,
            }) 
          }
      })
    });

  allNearByNgo?.map((e)=>{
      var flag = true;
      item?.map((selected: any) => {
        if(selected === e?.ngo_id){
          flag = false;
        }
      })
      if(flag){
        newTemp.push({
          id: e?.ngo_id,
          name: e?.organization_name,
          bool: false,
        }) 
      }
  })

    setUpdated(newTemp);

  } else {
    var newTemp = [];
    allNearByNgo?.map((nearBy: any) => {

        newTemp.push({
          id: nearBy.ngo_id,
            name: nearBy.organization_name,
            bool: false,
          }
        )
    });

    setUpdated(newTemp);

  }

  var newTemp = [allNgo];
  updated.map((e)=>{
    newTemp.push(e)
 })

  setNewArray(newTemp);

  }, [allNearByNgo])
  
 
  const [placeHolder, setPlaceHolder] = useState<any>();;
  const [mainArray, setMainArray] = useState<any>(
    item.length !== 0 ? item : updated,
  );

  useEffect(() => {
    let temp: Array<any> = [];
    mainArray?.map((i: any) => {
      temp.push(i?.id);
    });
    selectedNgos(temp);
    if (mainArray?.length === 1) {
      setPlaceHolder(mainArray[0]?.name);
    } else if (mainArray?.length > 1) {
      setPlaceHolder('Multiple');
      if (mainArray?.length === updated?.length) {
        setPlaceHolder("All Nearby NGO's");
      }
    }
    if (mainArray?.length === 0) {
      setPlaceHolder('Not Select');
    }
  }, [mainArray]);



  return (
    <Pressable
      onPress={() => {
        input.current?.focus();
      }}
      style={[
        styles.press,
        {backgroundColor: click ? Colors.Generic.backgroundPopup : null},
      ]}>
      <View style={click ? styles.mainView : styles.style}>
        <TextInput
          onFocus={() => {
            setClick(!click);
          }}
          editable={false}
          ref={input}
          placeholderTextColor={
            click ? Colors.Button.primary : Colors.Text.gray
          }
          placeholder={allNgo?.name}
          value={placeHolder}
          style={[
            styles.input,
            click
              ? {fontFamily: 'Poppins-Medium'}
              : {fontFamily: 'Poppins-Regular'},
          ]}
        />
        <Pressable onPress={() => setClick(!click)} style={styles.svgHolder}>
          <SVGIcon
            style={[
              styles.svg,
              {
                transform: [click ? {rotate: '90deg'} : {rotate: '-90deg'}],
              },
            ]}
            icon={icons.backButton}
          />
        </Pressable>
      </View>
      {click ? (
        <View style={styles.subView}>
          <View style={styles.nestedView}>
            <Text style={styles.subText}>{valueOfSlider} Km</Text>
            <Slider
              maximumValue={100}
              minimumValue={0}
              step={1}
              style={styles.slider}
              onValueChange={value => {
                setValueOfSlider(value);
              }}
              maximumTrackTintColor={Colors.Button.track}
              minimumTrackTintColor={Colors.Button.primary}
              thumbTintColor={Colors.Button.secondary}
            />
            <Text style={styles.subText}>100 Km</Text>
          </View>

          { isNearByNGOsLoading || nearByNGOsSuccess === undefined? (
            <ActivityIndicator
              size={'small'}
              color={Colors.Button.primary}
              style={styles.loader}
            />
          ) : (
            <Checkbox
              style={styles.scroll}
              setMainArray={setMainArray}
              data={newArray}
              setData={setNewArray}
            />
          )}
        </View>
      ) : (
        <></>
      )}
    </Pressable>
  );
};
