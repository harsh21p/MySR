/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  TextInput,
  View,
  Text,
  FlatList,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Colors} from '../../style';
import SVGIcon from '../SVGIcon';
import icons from 'assets/icons';

export const DropDownTypeOfDelivery = ({onTypeSelect,value = undefined}) => {
  const data = {
    value: [1, 2],
    type: ['By Yourself', 'By NGO'],
  };
  const input = useRef<TextInput>(null);
  const [placeHolder, setPlaceHolder] = useState(value&&value);
  const [click, setClick] = useState(false);
  const [selectedType, setSelectedType] = useState(value&&value);
  useEffect(() => {
    if (selectedType) {
      const typeOfDelivery = {
        selectedType: selectedType,
      };
      onTypeSelect(typeOfDelivery);
    }
  }, [selectedType]);

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
          placeholder={'Type of Delivery'}
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
            data={data.type}
            style={styles.scroll}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setSelectedType(item), setPlaceHolder(item), setClick(!click);
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
        </View>
      ) : (
        <></>
      )}
    </Pressable>
  );
};
