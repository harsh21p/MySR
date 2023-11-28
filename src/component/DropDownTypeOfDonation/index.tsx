/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  TextInput,
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';

import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Colors} from '../../style';
import SVGIcon from '../SVGIcon';
import icons from 'assets/icons';

export const DropDownTypeOfDonation = ({onTypeSelect,value = undefined, unit = undefined, qat = undefined}) => {
  const data = {
    value: [1, 2, 3, 4, 5],
    unit: ['Kg', 'Unit', 'Gram', 'Box'],
    names: ['Packed meals', 'Cloths'],
  };
  const input = useRef<TextInput>(null);
  const [placeHolder, setPlaceHolder] = useState(value&&value+' '+qat+' '+unit);
  const [click, setClick] = useState(false);
  const [selectedType, setSelectedType] = useState(value);
  const [selectedQuantity, setSelectedQty] = useState(qat);
  const [selectedUnit, setSelectedUnit] = useState(unit);

  useEffect(() => {
    if (selectedType && selectedQuantity && selectedUnit) {
      const typeOfDonation = {
        selectedType: selectedType,
        selectedQuantity: selectedQuantity,
        selectedUnit: selectedUnit,
      };
      onTypeSelect(typeOfDonation);
    }
  }, [selectedType, selectedQuantity, selectedUnit]);
  
  return (
    <Pressable
      onPress={() => {
        input.current?.focus();
      }}
      style={[
        styles.mainView,
        {backgroundColor: click ? Colors.Generic.backgroundPopup : null},
      ]}>
      <View style={click ? styles.view2 : styles.style}>
        <TextInput
          onFocus={() => {
            setClick(!click);
          }}
          onBlur={() => {
            setClick(!click);
          }}
          ref={input}
          placeholderTextColor={
            click ? Colors.Button.primary : Colors.Text.gray
          }
          placeholder={'Type of Donation'}
          value={placeHolder}
          style={click ? styles.input1 : styles.input2}
        />
        <Pressable onPress={() => setClick(!click)} style={styles.icon}>
          <SVGIcon
            style={[
              styles.iconSvg,
              {transform: [click ? {rotate: '90deg'} : {rotate: '-90deg'}]},
            ]}
            icon={icons.backButton}
          />
        </Pressable>
      </View>
      {click ? (
        <View style={styles.flatListHolder}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.names}
            style={styles.scroll}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setSelectedType(item), setPlaceHolder(item);
                }}
                style={styles.flatListView}>
                <Text
                  style={
                    item === selectedType
                      ? styles.selectedFlatListItem
                      : styles.flatListItem
                  }>
                  {item}
                </Text>
              </Pressable>
            )}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.value}
            style={styles.scroll1}
            renderItem={({item}) => (
              <Pressable
                style={styles.flatListView}
                onPress={() => {
                  setSelectedQty(item),
                    setPlaceHolder(placeHolder + ' ' + item + ' ');
                }}>
                <Text
                  style={
                    item === selectedQuantity
                      ? styles.selectedFlatListItem
                      : styles.flatListItem
                  }>
                  {item}
                </Text>
              </Pressable>
            )}
          />
          <FlatList
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={data.unit}
            style={styles.scroll2}
            renderItem={({item}) => (
              <Pressable
                style={styles.flatListView}
                onPress={() => {
                  setSelectedUnit(item),
                    setPlaceHolder(placeHolder + item),
                    setClick(!click);
                }}>
                <Text
                  style={
                    item === selectedUnit
                      ? styles.selectedFlatListItem
                      : styles.flatListItem
                  }>
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      ) : (
        <></>
      )}
    </Pressable>
  );
};
