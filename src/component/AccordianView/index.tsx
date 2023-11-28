import {View, Text, Pressable, Platform} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Spacing} from '../../style';
import styles from './style';

export interface AccordianProp {
  isOpen: boolean;
  toggleOpen: (any) => void;
  title: string;
  children: JSX.Element;
}

const AccordianView = ({
  isOpen,
  toggleOpen,
  title,
  children,
}: AccordianProp) => {
  return (
    <Pressable onPress={toggleOpen}>
      <View style={!isOpen? styles.appBar : styles.appBar2}>
        <View style={!isOpen?styles.row:styles.row2}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Icon
            name={isOpen ? 'expand-less' : 'expand-more'}
            size={Spacing.size25}
            style={styles.iconView}
            color={Colors.Button.primary}
          />
        </View>
      { isOpen && <View style={styles.bodyView}>{children}</View>}
      </View>
    </Pressable>
  );
};

export default AccordianView;
