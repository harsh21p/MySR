import {
  View,
  FlatList,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import RequestComp from '../RequestComp';
import {useAuthContext} from 'context/use-auth-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  callUpdateRequest,
  updateRequestClear,
  updateRequestInfo,
} from 'routes/Dashboard/slice/UpdateRequest';
import {Colors} from '../../style';
import * as RootNavigation from 'navigation/rootNavigation';
import styles from './style';
import routes from 'routes';
import {callSendNotificationByUserId} from 'routes/Dashboard/slice/sendNotificationByUserId';
import {getProfileInfo} from 'routes/MyAccount/slice';
import {callGetHistoryByNgoId} from 'routes/History/slice/getHistoryByNgoId';
import {callGetHistoryByUserId} from 'routes/History/slice/getHistoryByUserId';
import {clearGetRequests} from 'routes/Dashboard/slice/GetRequests';
import SVGIcon from '../../component/SVGIcon';
import icons from '../../assets/icons';

const Requests = ({data}: any) => {
  const {authData} = useAuthContext();
  const dispatch = useAppDispatch();
  const {isUpdateRequestLoading, updateRequestSuccess, updateRequestError} =
    useAppSelector(updateRequestInfo);
  const {pro} = useAppSelector(getProfileInfo);
  const {profileSuccess} = useAppSelector(getProfileInfo);

  const getHistoryForNgo = () => {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetHistoryByNgoId(payload));
  };

  const getHistoryForUser = () => {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetHistoryByUserId(payload));
  };

  const acceptRequest = id => {
    const payload = {
      id: id?.donation?.id,
      data: {
        ngoId: authData?.userId,
        status: 'accepted',
      },
    };
    sendNotificationByUserId(
      id?.donation?.userId,
      'Request accepted',
      'Donation request for ' +
        id?.deliveryTime +
        ' is accepted by ' +
        profileSuccess?.organizationName,
    );
    dispatch(callUpdateRequest(payload));
  };

  const rejectRequest = id => {
    const payload = {
      id: id?.donation?.id,
      data: {
        ngoId: authData?.userId,
        status: 'rejected',
      },
    };
    sendNotificationByUserId(
      id?.donation?.userId,
      'Request rejected',
      profileSuccess?.organizationName + ' rejected the donation request',
    );
    dispatch(callUpdateRequest(payload));
  };

  function sendNotificationByUserId(
    userId: string,
    title: string,
    body: string,
  ) {
    const payload = {
      jwt: authData?.jwt,
      data: {
        userId: userId,
        title: title,
        body: body,
      },
    };

    dispatch(callSendNotificationByUserId(payload));
  }

  useEffect(() => {
    if (updateRequestSuccess) {
      if (updateRequestSuccess !== undefined) {
        if (authData?.roleName !== 'NGO') {
          getHistoryForUser();
        }
        if (authData?.roleName === 'NGO') {
          getHistoryForNgo();
        }
      }
    }
    if (updateRequestSuccess?.error || updateRequestError) {
      Alert.alert('Error!, Please try again');
    }
    dispatch(updateRequestClear());
  }, [updateRequestSuccess, updateRequestError]);

  return (
    <View style={styles.mainContainer}>
      {isUpdateRequestLoading && (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        ListEmptyComponent={
          <View style={styles.innerView}>
            <SVGIcon
              style={styles.donateNowEl}
              icon={icons.notFound}
              key={'icon'}
            />
            {/* <Text style={styles.notFound}>Not found</Text> */}
          </View>
        }
        style={{paddingTop: 10}}
        renderItem={({item}) => (
          <RequestComp
            type={1}
            DATA={data}
            item={item}
            firstCall={acceptRequest}
            secondCall={rejectRequest}
          />
        )}
      />
    </View>
  );
};

export default Requests;
