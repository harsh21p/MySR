/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {Button, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import CheckBox from 'react-native-check-box';
import styles from 'routes/SignUpScreen/styles';

const Checkbox = ({style,setMainArray,data,setData}:any) => {

  function submitLogic(){
    
      let temp: any = [];
      data.map((i: any, j: any) => {
        if (i.bool === true && j !== 0) {
          temp.push({name: i.name, id: i.id});
        }
      });
      setMainArray(temp);
  }

  return (
       
          <FlatList
            data={data}
            style={style}
            renderItem={({item, index}) => {
              if (item.name) {
                return (
                  <View>
                    <CheckBox
                      rightTextStyle={styles.textStyle}
                      rightText={`${item.name}`}
                      onClick={() => {
                        if (item.name === `All Nearby NGO's`) {
                          if (data[0].bool === false) {
                            data.map((i: any, j: any) => {
                              setData([...data, (data[j].bool = true)]);
                            });
                          } else {
                            data.map((i: any, j: any) => {
                              setData([...data, (data[j].bool = false)]);
                            });
                          }
                        } else {
                          setData([
                            ...data,
                            (data[index].bool = !data[index].bool),
                          ]);
                          setData([...data, (data[0].bool = false)]);
                        }
                        submitLogic()
                      }}
                      isChecked={item.bool}
                    />
                  </View>
                );
              }
              return null;
            }}
          />
 
  );
};
export default Checkbox;
