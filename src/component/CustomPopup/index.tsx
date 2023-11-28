import {View, Text, Pressable, Image} from 'react-native';
import React  from 'react';
import styles from './styles';
import images from 'assets/images';
import {useTranslation} from 'react-i18next';
export interface CustomPopupProps {
  title: string;
  description?: string;
  buttonTitle?: string;
  isDelete?: boolean;
  type?: string;
  passwordModal?: string;
  yesClicked?: () => void;
  noClicked?: () => void;
  closeModal?: () => void;
}
const CustomPopup = ({
  title,
  description,
  buttonTitle,
  isDelete,
  type,
  yesClicked,
  noClicked,
  closeModal,
}: CustomPopupProps) => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainView}>
      {type === 'success' ? (
        <Image source={images.success} style={styles.iconView} />
      ) : type === 'error' ? (
        <Image source={images.error} style={styles.iconView1} />
      ) : type === 'logout' ? (
        <Image source={images.logout} style={styles.iconView} />
      ) : (
        <Image source={images.error} style={styles.iconView1} />
      )}
      <Text style={styles.mainTitle}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      {isDelete ? (
        <View style={styles.row}>
          <Pressable style={styles.btnView} onPress={yesClicked}>
            <Text style={styles.text}>{t('common:yes')}</Text>
          </Pressable>
          <Pressable style={styles.btnView1} onPress={noClicked}>
            <Text style={styles.whiteText}>{t('common:no')}</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.btnView2} onPress={closeModal}>
          <Text>{buttonTitle}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CustomPopup;
