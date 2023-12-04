/* eslint-disable react/react-in-jsx-scope */
import styles from './styles';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
  Platform
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../style';
import React, {useEffect, useState, useRef} from 'react';
import Switch from '../../component/Switch';
import RequestComp from '../../component/RequestComp';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useAuthContext} from 'context/use-auth-context';
import {
  callDeleteDonation,
  deleteDonationClear,
  deleteDonationInfo,
} from 'routes/Dashboard/slice/deleteDonation';
import {DonationForm} from '../../component/DonationForm';
import CustomPopup from '../../component/CustomPopup';
import Icon from 'react-native-vector-icons/Entypo';
import {getDonationInfo} from 'routes/Dashboard/slice/GetDonations';
import {callGetDonation} from 'routes/Dashboard/slice/GetDonations';
import {updateDonationInfo,updateDonationClear} from 'routes/Dashboard/slice/updateDonation';
import {
  callGetHistoryByUserId,
  getHistoryByUserIdInfo,
} from './slice/getHistoryByUserId';
import {
  callGetHistoryByNgoId,
  getHistoryByNgoIdInfo,
} from './slice/getHistoryByNgoId';
import {
  callGetHistoryByOrder,
  getHistoryByOrderInfo,
} from './slice/getHistoryByOrder';
import {callUpdateHistory, updateHistoryInfo,clearUpdateHistory} from './slice/updateHistory';
import HistoryComp from '../../component/HistoryComp';
import HistoryCompNgo from '../../component/HistoryCompNgo';
import {
  callUploadCertificate,
  clearUploadCertificate,
  uploadCertificateInfo,
} from './slice/uploadCertificate';
import {bytesToMB} from 'utils/file';
import {Modalize} from 'react-native-modalize';
import ImagePicker from 'react-native-image-crop-picker';
import Constants from 'constants/file-size';
import {hp} from 'utils/commonFunctions';
import CustomModal from '../../component/Modal';
import {getAddressByIdInfo} from 'routes/Dashboard/slice/GetAddressById';
import * as RootNavigation from 'navigation/rootNavigation';
import routes from 'routes';
import {
  callDeleteCertificate,
  clearDeleteCertificate,
  deleteCertificateInfo,
} from './slice/deleteCertificate';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import { callSendNotificationByUserId } from 'routes/Dashboard/slice/sendNotificationByUserId';
import { callSendNotificationByNgoId } from 'routes/Dashboard/slice/sendNotificationByNgoId';
import { getProfileInfo } from 'routes/MyAccount/slice';
import SVGIcon from '../../component/SVGIcon';
import icons from '../../assets/icons';

const HistoryClick = ({
  item,
  click,
  onUploadCertificate,
  clickCertificate
}: any) => {
  const isCertified = item?.order?.certificate !== null;
  const History = item;
  const {t} = useTranslation();
  const {authData} = useAuthContext();
  const selected = click;
  const dispatch = useAppDispatch();
  const {
    isHistoryByOrderLoading,
    getHistoryByOrderSuccess,
    getHistoryByOrderError,
  } = useAppSelector(getHistoryByOrderInfo);

  const {
   profileSuccess
  } = useAppSelector(getProfileInfo);

  const {
    isGetHistoryByNgoLoading,
    getHistoryByNgoSuccess,
    getHistoryByNgoError,
  } = useAppSelector(getHistoryByNgoIdInfo);

  const {isGetHistoryLoading, getHistorySuccess, getHistoryError} =
    useAppSelector(getHistoryByUserIdInfo);

  useEffect(() => {
    if (getHistoryByOrderSuccess && getHistoryByOrderSuccess?.data) {
      let temp = [];
      var flag_c = false;
      var flag_d = false;
      getHistoryByOrderSuccess?.data.map(e => {
        if (e.status === 'Collected') {
          flag_c = true;
        }
        if (e.status === 'Distributed') {
          flag_d = true;
        }
      });

      if (flag_c && flag_d) {
        getHistoryByOrderSuccess?.data.map(e => {
          if (
            e.status !== 'Collection pending' &&
            e.status !== 'Distribution pending'
          ) {
            temp.push(e);
          }
        });
      } else {
        if (flag_c) {
          getHistoryByOrderSuccess?.data.map(e => {
            if (e.status !== 'Collection pending') {
              temp.push(e);
            }
          });
        } else {
          if (flag_d) {
            getHistoryByOrderSuccess?.data.map(e => {
              if (e.status !== 'Distribution pending') {
                temp.push(e);
              }
            });
          } else {
            getHistoryByOrderSuccess?.data.map(e => {
              temp.push(e);
            });
          }
        }
      }
      setData(temp);
    }
    if (getHistoryByOrderError && getHistoryByOrderError.error) {
      Alert.alert('Error!');
    }
  }, [getHistoryByOrderSuccess, getHistoryByOrderError]);

  const getHistoryByOrder = () => {
    const payload = {
      id: click,
    };
    dispatch(callGetHistoryByOrder(payload));
  };

  const [data, setData] = useState();

  function sendNotificationByUserId(userId:string,title:string,body:string) {
    const payload = {
      jwt: authData?.jwt,
      data:{
          userId : userId,
          title : title,
          body : body
      }
    };
    dispatch(callSendNotificationByUserId(payload));
  }

  function updateHistory(status: string, subTitle: string) {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
      data: {
        status: status,
        title: status,
        subtitle: subTitle,
        orderId: item.order.id,
        userId: History.order.userId,
        ngoId: authData?.userId,
      },
    };
    dispatch(callUpdateHistory(payload));
    sendNotificationByUserId(History.order.userId,"Order Updated","Order status Updated to "+status+" by "+profileSuccess?.organizationName)
  }

  useEffect(() => {
    if(click === item.order.id ){
      getHistoryByOrder();
    }
  }, [click]);

  const {isUpdateHistoryLoading, updateHistorySuccess, updateHistoryError} =
    useAppSelector(updateHistoryInfo);

  useEffect(() => {
    if (updateHistorySuccess && click === item.order.id) {
      getHistoryByOrder();
      dispatch(clearUpdateHistory());
    }
    if ((updateHistorySuccess && updateHistorySuccess?.error) || updateHistoryError) {
      Alert.alert('Error! Please try again');
    }
  }, [updateHistorySuccess, updateHistoryError]);

  const clickDeleteCertificate = val => {
    const payload = {
      id: val,
    };
    clickCertificate(payload);
  };
  const onView = item => {
    const response =
      authData?.roleName === 'NGO'
        ? getHistoryByNgoSuccess?.data
        : getHistorySuccess?.data;
    const clickedItem = response?.filter(e => e.order.id === item?.orderId);
    const isDeletedOrderId = item?.orderId;
    const filteredCertificate = clickedItem[0]?.order?.certificate;
    if (filteredCertificate) {
      RootNavigation.navigate(routes.Certificate, {
        certificate: filteredCertificate,
        isDelete: clickDeleteCertificate,
        isNgo: authData?.roleName === 'NGO' ? true : false,
        isDeletedOrderId: isDeletedOrderId,
        downloadCertificate: downloadCertificate,
      });
    }
  };
  const uploadCertificate = item => {
    onUploadCertificate(item);
  };


  const downloadCertificate = certificateLink => {
    saveToCameraRoll(certificateLink);
  };
  const saveToCameraRoll = image => {
    if (Platform.OS === 'android') {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'jpg',
      })
        .fetch('GET', image)
        .then(res => {
          CameraRoll.saveToCameraRoll(res)
            .then(Alert.alert('Success', 'Photo saved to camera roll!'))
            .catch(err => console.log('err:', err));
        });
    } else {
      CameraRoll.saveToCameraRoll(image).then(
        Alert.alert('Success', 'Photo saved to camera roll!'),
      );
    }
  };
  

  return (
    <View style={styles.card}>
      {click === item.order.id ? (
        isHistoryByOrderLoading ||
        getHistoryByOrderSuccess === undefined ||
        isUpdateHistoryLoading ? (
          <ActivityIndicator
            size={'small'}
            color={Colors.Button.primary}
            style={styles.loader}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) =>
              authData?.roleName === 'NGO' && index === data?.length - 1 ? (
                <HistoryCompNgo
                  none={false}
                  uploadCertificate={() => uploadCertificate(item)}
                  status={item.status === null ? '' : item.status}
                  title={item.title === null ? item.status : item.title}
                  subTitle={item.subtitle === null ? '' : item.subtitle}
                  last={index === data?.length - 1}
                  length={data?.length}
                  isCertified={isCertified}
                  update={updateHistory}
                  onView={() => onView(item)}
                />
              ) : (
                <HistoryComp
                  onView={() => onView(item)}
                  status={item.status === null ? '' : item.status}
                  title={item.title === null ? item.status : item.title}
                  subTitle={item.subtitle === null ? '' : item.subtitle}
                  last={index === data?.length - 1}
                  length={data?.length}
                  isCertified={isCertified}
                />
              )
            }
          />
        )
      ) : authData?.roleName !== 'NGO' ? (
        <HistoryComp
          // onView={onView}
          status={History.latestHistory?.status}
          title={
            History.latestHistory?.title === null
              ? History.latestHistory?.status
              : History.latestHistory?.title
          }
          subTitle={
            History.latestHistory?.subtitle === null
              ? ''
              : History.latestHistory?.subtitle
          }
          last={true}
          length={1}
          isCertified={isCertified}
        />
      ) : (
        <HistoryCompNgo
          status={History.latestHistory?.status}
          title={
            History.latestHistory?.title === null
              ? History.latestHistory?.status
              : History.latestHistory?.title
          }
          subTitle={
            History.latestHistory?.subtitle === null
              ? ''
              : History.latestHistory?.subtitle
          }
          last={true}
          length={1}
          none={true}
          isCertified={isCertified}
          update={updateHistory}
          // onView={onView}
          // uploadCertificate={() => uploadCertificate(History.latestHistory)}
        />
      )}
    </View>
  );
};

const History = () => {
  const {getAddressByIdSuccess} = useAppSelector(getAddressByIdInfo);

  const [selectedHistoryId, setSelectedHistoryId] = useState();
  const [lat, setLat] = useState(getAddressByIdSuccess?.data[0]?.latitude);
  const [long, setLong] = useState(getAddressByIdSuccess?.data[0]?.longitude);

  const {t} = useTranslation();
  const [itemSelected, setItemSelected] = useState<any>();
  const dispatch = useAppDispatch();
  const {authData} = useAuthContext();
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [type, setType] = useState(true);
  const [uploadedCertificate, setCertificate] = useState();
  const pickerRef = useRef<Modalize>(null);


 useEffect(() => {
   if (uploadedCertificate && selectedHistoryId) {
     let formDataPayload = new FormData();
     formDataPayload.append('certificate', {
       uri: uploadedCertificate?.path,
       type: uploadedCertificate?.mime,
       name: uploadedCertificate?.path.split('/').pop() || 'image.jpg',
     });
     const payload = {
       id: selectedHistoryId,
       accessToken: authData?.jwt,
       data: formDataPayload,
     };
     dispatch(callUploadCertificate(payload));
   }
 }, [uploadedCertificate]);




  const {
    isUploadCertificateLoading,
    uploadCertificateSuccess,
    uploadCertificateError,
  } = useAppSelector(uploadCertificateInfo);
  const toggleModal = () => {
    setOpenAddAddressModal(!openAddAddressModal);
  };
  const {
    isDeleteCertificateLoading,
    deleteCertificateSuccess,
    deleteCertificateError,
  } = useAppSelector(deleteCertificateInfo);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const toggleDeleteClose = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const clickCertificate = payload => {
    dispatch(callDeleteCertificate(payload));
  };
  const onClickUploadCertificate = val => {
    setSelectedHistoryId(val?.orderId);
    pickerRef?.current?.open();
  };
  useEffect(() => {
    if (deleteCertificateSuccess && deleteCertificateSuccess?.message) {
      Alert.alert('Certificate Deleted Successfully');
      dispatch(clearDeleteCertificate());
      getHistoryForNgo();
      RootNavigation.goBack();
    } else if (
      (deleteCertificateSuccess && deleteCertificateSuccess?.error) ||
      deleteCertificateError
    ) {
      Alert.alert('Error! Please try again');
    }
  }, [deleteCertificateSuccess, deleteCertificateError]);

  useEffect(() => {
    if (uploadCertificateSuccess && uploadCertificateSuccess?.message) {
      Alert.alert('Certificate uploaded successfully');
      setCertificate();
      setSelectedHistoryId();
      getHistoryForNgo();
    }
    if (
      (uploadCertificateSuccess && uploadCertificateSuccess?.error) ||
      uploadCertificateError
    ) {
      Alert.alert('Error! Please try again');
      setCertificate();
      setSelectedHistoryId();
    }
    dispatch(clearUploadCertificate());
  }, [uploadCertificateSuccess, uploadCertificateError]);

  useEffect(() => {
    if (uploadedCertificate && selectedHistoryId) {
      let formDataPayload = new FormData();
      // formDataPayload.append('certificate', uploadedCertificate);
      formDataPayload.append('certificate', {
        uri: uploadedCertificate?.path,
        type: uploadedCertificate?.mime,
        name: uploadedCertificate?.path.split('/').pop() || 'image.jpg',
      });
      const payload = {
        id: selectedHistoryId,
        accessToken: authData?.jwt,
        data: formDataPayload,
      };
      dispatch(callUploadCertificate(payload));
    }
  }, [uploadedCertificate]);

  const getDocument = async (type: string) => {
    if (type === 'cameraPhoto') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
      }).then(file => {
        const sizeInMB = bytesToMB(file.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setCertificate(file);
        } else {
          Alert.alert('Photo size cannot be greater than 10 MB');
        }
      });
    } else if (type === 'libraryPhoto') {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        const sizeInMB = bytesToMB(image.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setCertificate(image);
        } else {
          Alert.alert('Document size cannot be greater than 10 MB');
        }
      });
    }
    closeModal();
  };

  function sendNotificationByNgoId(userId:string,title:string,body:string) {
    const payload = {
      jwt: authData?.jwt,
      data:{
        ngoId : userId,
          title : title,
          body : body
      }
    };
    dispatch(callSendNotificationByNgoId(payload));
  }

  const {
    profileSuccess
   } = useAppSelector(getProfileInfo);

  const onDeleteDonation = () => {
    const payload = {
      id: itemSelected?.id,
      jwt: authData?.jwt,
    };
    itemSelected?.ngoDetails?.map((e:any)=>{
      sendNotificationByNgoId(e?.id,"Request Deleted","Donation request deleted by "+profileSuccess?.firstName)
    })
    dispatch(callDeleteDonation(payload));
    toggleDeleteClose();
  };

  const getHistoryForUser = () => {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetHistoryByUserId(payload));
  };

  const closeModal = () => {
    pickerRef.current?.close();
  };

  const getHistoryForNgo = () => {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetHistoryByNgoId(payload));
  };

  const reverseObj = (item: any) => {
    setClick(item[item.length - 1]?.order?.id);
    let i = item.length - 1;
    const temp: never[] | ((prevState: never[]) => never[]) = [];
    while (i >= 0) {
      temp.push(item[i]);
      i--;
    }
    setData(temp);
  }

  const [click, setClick] = useState('');
  const [selected, setSelected] = useState();

  const select = (id:any) =>{
    setSelected(id)
  }

  const [dataOfDonation,setDataOfDonation] = useState<any>([]);

  const resultList = () =>{
    let result = [];
    getDonationSuccess?.map((i, j) => {
      if (i?.status == 'pending') {
        result.push(i);
      } else {
        if (i.deliveryType == 'By Yourself') {
          data?.filter((item, index) => {
            if (i?.id == item?.order?.donationId) {
              if (item?.latestHistory?.status == 'Collection pending') {
                result.push(i);
              }
            }
          });
        }
      }
    });
    return result;
  }
  const {isGetHistoryLoading, getHistorySuccess, getHistoryError} =
    useAppSelector(getHistoryByUserIdInfo);
  const {
    isGetHistoryByNgoLoading,
    getHistoryByNgoSuccess,
    getHistoryByNgoError,
  } = useAppSelector(getHistoryByNgoIdInfo);

  const getDonation = () => {
    const payload = {
      id: authData?.userId,
    };
    dispatch(callGetDonation(payload));
  };

  const {deleteDonationError, deleteDonationSuccess, isDeleteLoading} =
    useAppSelector(deleteDonationInfo);
  const {isGetDonationLoading, getDonationSuccess, getDonationError} =
    useAppSelector(getDonationInfo);
  const {isUpdateLoading,updateDonationSuccess} = useAppSelector(updateDonationInfo);
  
  const {isUpdateHistoryLoading, updateHistorySuccess, updateHistoryError} =
    useAppSelector(updateHistoryInfo);


  const [data, setData] = useState([]);

  useEffect(() => {
    if(updateHistorySuccess){
      if(authData?.roleName === 'NGO'){
        getHistoryForNgo();
      }else{
        getDonation();
      } 
    }
  }, [updateHistorySuccess])
  

  useEffect(() => {
    if(authData?.roleName !== 'NGO' && (deleteDonationSuccess)){
      getDonation();
      dispatch(updateDonationClear());
    }
  }, [deleteDonationSuccess]);

  useEffect(() => {
    if(authData?.roleName !== 'NGO' && getDonationSuccess === undefined){
      getDonation();
    }
  }, []);

  useEffect(() => {
    if (deleteDonationSuccess && deleteDonationSuccess?.message) {
      Alert.alert(deleteDonationSuccess?.message);
      dispatch(deleteDonationClear());
    }
    if (
      (deleteDonationSuccess && deleteDonationSuccess?.error) ||
      deleteDonationError
    ) {
      Alert.alert('Error! Please try again');
      dispatch(deleteDonationClear());
    }
  }, [deleteDonationSuccess, deleteDonationError]);

  useEffect(() => {
    if ((getDonationSuccess && getDonationSuccess?.error) || getDonationError) {
      Alert.alert('Error! Please try again');
      dispatch(deleteDonationClear());
    } 
    if(getDonationSuccess ){
      getHistoryForUser();
    }
  }, [getDonationSuccess,getDonationError]);

  useEffect(() => {
    if (
      getHistoryByNgoSuccess === undefined &&
      isGetHistoryByNgoLoading === false &&
      authData?.roleName === 'NGO'
    ) {
      getHistoryForNgo();
    }
  }, [getHistoryByNgoSuccess, getHistorySuccess]);

  useEffect(() => {
    if (getHistorySuccess) {
      reverseObj(getHistorySuccess?.data);
    }
    if ((getHistorySuccess && getHistorySuccess?.error) || getHistoryError) {
      Alert.alert('Error! Please try again');
    }
  }, [getHistorySuccess, getHistoryError]);
  useEffect(() => {
    if (getHistoryByNgoSuccess && getHistoryByNgoSuccess?.data) {
      reverseObj(getHistoryByNgoSuccess?.data);
    }
    if (
      (getHistoryByNgoSuccess && getHistoryByNgoSuccess?.error) ||
      getHistoryByNgoError
    ) {
      Alert.alert('Error! Please try again');
    }
  }, [getHistoryByNgoSuccess, getHistoryByNgoError]);


  useEffect(() => {
    setDataOfDonation(resultList());
  }, [data])
  

  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.mainBody}>
        <StatusBar
          backgroundColor={Colors.Generic.statusBar}
          barStyle={'dark-content'}
        />
        {authData?.roleName !== 'NGO' && (
          <View style={styles.mainHolder}>
            <Switch
              titleFirst={'History'}
              titleSecond={'Request’s'}
              setType={setType}
              type={type}
            />
          </View>
        )}

        <View style={[styles.mainView, authData?.roleName !== 'NGO'?{maxHeight: Platform.OS==='ios'? '89%':'89%'}:{}]}>
          {type ? (
            (authData?.roleName !== 'NGO' ? isGetHistoryLoading : isGetHistoryByNgoLoading) ||
            isDeleteCertificateLoading ||
            isUploadCertificateLoading ? (
              <ActivityIndicator
                size={'large'}
                color={Colors.Button.primary}
                style={styles.loader}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                style={styles.padding}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => {
                      setClick(item.order.id);
                    }}>
                    <HistoryClick
                      item={item}
                      click={click}
                      clickCertificate={clickCertificate}
                      onUploadCertificate={val => onClickUploadCertificate(val)}
                
                    />
                  </Pressable>
                )}
              />
            )
          ) : isDeleteLoading || isUpdateLoading || isUpdateHistoryLoading ||  (authData?.roleName !== 'NGO' ? isGetHistoryLoading === undefined : isGetHistoryByNgoLoading === undefined) ? (
            <ActivityIndicator
              size={'large'}
              color={Colors.Button.primary}
              style={styles.loader}
            />
          ) : (
            
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dataOfDonation}
              ListEmptyComponent={
                <View style={styles.innerView}>
                  <SVGIcon
                    style={styles.donateNowEl}
                    icon={icons.notFound}
                    key={'icon'}
                  />
                  <Text style={styles.notFound}>Not found</Text>
                </View>
              }
              style={styles.padding}
              renderItem={({item}) => (
                <RequestComp
                  setSelected={select}
                  selected={selected}
                  firstCall={() => {
                    setItemSelected(item);
                    toggleModal();
                  }}
                  secondCall={() => {
                    setItemSelected(item);
                    toggleDeleteClose();
                  }}
                  type={2}
                  item={item}
                  donationUpdate={
                    data?.filter((e:any) => 
                      (
                        e?.latestHistory.status 
                        === 'Collection pending' && 
                        e.order.donationId === item.id 
                        && item?.deliveryType === 'By Yourself'
                        )
                    )
                  }
                />
              )}
            />
          )}
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={openAddAddressModal}
          onRequestClose={toggleModal}>
          <View style={styles.center}>
            <View style={styles.cardView}>
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <View style={styles.close}>
                  <Icon
                    name="cross"
                    size={25}
                    onPress={toggleModal}
                    color={Colors.Button.primary}
                  />
                </View>
                <Text style={styles.popupTitle}>Update Donation</Text>

                {lat === undefined || lat === null ? (
                  <ActivityIndicator
                    size={'large'}
                    color={Colors.Button.primary}
                    style={styles.loader}
                  />
                ) : (
                  <DonationForm
                    type={1}
                    item={itemSelected}
                    close={toggleModal}
                    latPrimary={lat}
                    longPrimary={long}
                  />
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={openDeleteModal}
          onRequestClose={toggleDeleteClose}>
          <View style={styles.center}>
            <CustomPopup
              title={t('common:delete')}
              description={t('common:deleteRequest')}
              closeModal={toggleDeleteClose}
              isDelete={true}
              type={'delete'}
              yesClicked={onDeleteDonation}
              noClicked={toggleDeleteClose}
            />
          </View>
        </Modal>
        <CustomModal
          modalStyle={styles.modalStyle}
          children={
            <View style={styles.uploadDocModalView}>
              <View style={styles.modalContainer}>
                <View style={styles.viewStyle}>
                  <Text
                    style={styles.text}
                    onPress={() => getDocument('cameraPhoto')}>
                    {t('common:photoUploadLabel')}
                  </Text>
                </View>
                <Text
                  style={styles.text}
                  onPress={() => getDocument('libraryPhoto')}>
                  {t('common:libraryUploadLabel')}
                </Text>
                <Text style={styles.cancelText} onPress={closeModal}>
                  {t('common:cancelUploadLabel')}
                </Text>
              </View>
            </View>
          }
          modalizeRef={pickerRef}
          height={hp(30)}
        />
      </SafeAreaView>
    </>
  );
};

export default History;
