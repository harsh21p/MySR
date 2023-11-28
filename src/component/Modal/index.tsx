import React, {RefObject} from 'react';
import {ViewStyle} from 'react-native';
import styles from './style';

import {Modalize} from 'react-native-modalize';

export interface ModalProps {
  children: JSX.Element;
  modalStyle?: ViewStyle;
  height?: number;
  snapPoints?: number;
  modalizeRef: RefObject<Modalize>;
}

const Modal = ({
  modalStyle,
  children,
  height,
  snapPoints,
  modalizeRef,
}: ModalProps) => {
  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={height}
      modalStyle={[styles.modal, modalStyle]}
      snapPoint={snapPoints}
      useNativeDriver={true}>
      {children}
    </Modalize>
  );
};

export default Modal;
