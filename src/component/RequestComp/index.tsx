import {View, Text, Image, Pressable, Platform, Linking, ActivityIndicator} from 'react-native';
import styles from './style';
import images from 'assets/images';
import SVGIcon from '../SVGIcon';
import icons from 'assets/icons';
import {ColoredButton} from '../../component/ColoredButton';
import {useState} from 'react';
import {useAuthContext} from 'context/use-auth-context';
import { Colors } from '../../style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { callUpdateHistory, updateHistoryInfo } from 'routes/History/slice/updateHistory';
import { callSendNotificationByUserId } from 'routes/Dashboard/slice/sendNotificationByUserId';

const Holder = ({text, image,type=2}: any) => {
  return (
    <View style={styles.holder}>
      <View style={styles.iconText}>
        <Image source={image} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={[styles.text,type===1&&{color:Colors.Text.blue}]}>{text}</Text>
    </View>
  );
};

const RequestComp = ({item, type, firstCall, secondCall,donationUpdate = undefined}: any) => {
  const {
    isUpdateHistoryLoading,
    updateHistorySuccess,
    updateHistoryError
  } = useAppSelector(updateHistoryInfo);
  const dispatch = useAppDispatch();

  function sendNotificationByUserId(ngoId:string,title:string,body:string) {
    const payload = {
      jwt: authData?.jwt,
      data:{
        userId : ngoId,
        title : title,
        body : body
      }
    };

    dispatch(callSendNotificationByUserId(payload));
  }

  const updateHistory = () => {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
      data: {
        status: "Canceled(Donor)",
        title: "Canceled(Donor)",
        orderId:  donationUpdate[0]?.order?.id,
        userId: authData?.userId,
        ngoId: donationUpdate[0]?.order?.ngoId,
      },
    };
    sendNotificationByUserId(donationUpdate[0]?.order?.ngoId,"Order Updated","Order Canceled by donor");
    dispatch(callUpdateHistory(payload));
  }

  if(donationUpdate !== undefined && donationUpdate.length !== 0){
    console.log("One Found :",donationUpdate[0].order.ngoId);
  }
  const [lat,setLat]=useState(item.address?.latitude);
  const [long,setLong]=useState(item.address?.longitude);

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lat},${long}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });


  const {authData} = useAuthContext();
  const [expand, setExpand] = useState(type === 1 ? false : true);
  let x;
  if ((type !== 1 ? item?.donationType : item.donation.donationType) === 'Packed meals') {
    x = images.meal;
  } else {
    x = images.cloth;
  }

  let only = '';
  let isNgoArray = undefined ;
  if(authData?.roleName === 'NGO'){
       isNgoArray = item?.donation?.ngoId?.split(',')
       if(isNgoArray.length === 1){
        only = 'Request is only for you';
    } else {
      if(isNgoArray.length > 1){
        only = `Requested multiple ngo's`;
      }
    }
  } else {
    if(item.ngoDetails.length === 1){
        only = 'Requested only one';
    } else {
      if(item.ngoDetails.length>1){
        only = `Requested multiple ngo's`;
      }
    }
  }
  

return (


  <View style={[styles.card,(item?.status !== 'pending' && item?.deliveryType === 'By Yourself')&&{
    backgroundColor:Colors.Generic.cardHighlight
  }]}>

{false ?(

  <ActivityIndicator
      size={'small'}
            color={Colors.Button.primary}
      style={styles.loader}
  />
):(
  <>
    <View style={styles.firstRow}>
      <View style={styles.holderProfile}>

        {type === 1 ? (
              <View style={styles.yellowView}>
              {!item?.profile_pic ? (
                <Text style={styles.profileName}>
                     {item?.donation.fullName?.charAt(0).toLocaleUpperCase() +
                      '' +
                      item?.donation.fullName?.charAt(1).toLocaleUpperCase()}
                </Text>
              ) : (
                <Image
                  source={{uri:item?.donation.profile_pic}}
                  style={styles.profile}
                  resizeMode="cover"
                />
              )}
            </View>
        ) : (
          <></>
        )}
        <View style={styles.colView}>
          <Text style={styles.title}>{type !== 1 ? item?.fullName : item.donation.fullName}</Text>
          {/* <Text style={styles.subTitle}>{item.bio}</Text> */}
        </View>
      </View>
      <View style={styles.type}>
        <Image source={x} resizeMode="contain" style={styles.typeOfDonation} />

        <Text style={styles.typeOfDonationText}>
          {type !== 1 ? item?.donationType : item.donation.donationType}
        </Text>
      </View>
    </View>
    {expand ? (
      <View style={styles.rowThird}>
        <View style={styles.info}>
          <View style={styles.viewHolder}>
            <Pressable onPress={()=> Linking.openURL(url)}>
              <Holder
                text={
                  item.address?.firstLine +
                  ', ' +
                  item.address?.lastLine +
                  ', ' +
                  item.address?.city
                }
                image={images.locationGray}
                type={1}
              />
            </Pressable>
            <Holder
              text={type !== 1 ? item?.deliveryTime : item.donation.deliveryTime}
              image={images.clockGray}
            />
            <Holder
              text={type !== 1 ? item?.deliveryType :item?.donation.deliveryType}
              image={images.truckGray}
            />
            <Holder
              text={
                'Package around ' +
                (type !== 1 ? item?.donationQuantity :
                item?.donation.donationQuantity )+
                ' ' +(type !== 1 ? item?.donationTypeUom :
                item?.donation.donationTypeUom)
              }
              image={images.packedGray}
            />
          </View>
        </View>
        <View style={styles.message}>
          <Holder text={type !== 1 ? item?.description : item.donation.description} image={images.commentGray} />
        </View>
      </View>
    ) : (
      <></>
    )}
    <View style={styles.secondRow}>
      <View style={styles.buttonHolder}>
        <ColoredButton
          onClick={
            // (item?.status !== 'pending' && item?.deliveryType === 'By Yourself') ? 
            // () => {
            //   console.log("Update order history")
            // } : 
            () => {
              firstCall(type === 1 && item);
            }
          }
          colorType={1}
          title={type === 1 ? 'Accept' : 
          // (item?.status !== 'pending' && item?.deliveryType === 'By Yourself' ? 'Delivered' : 
          'Update'
          //  )
          }
        />
        <View style={styles.spacer} />
        <ColoredButton
          onClick={(item?.status !== 'pending' && item?.deliveryType === 'By Yourself') ? 
          ()=>{
            updateHistory()
          }
          : 
          () =>  {
            
            secondCall(type === 1 && item)
          }
        }
          colorType={2}
          title={type === 1 ? 'Reject' : (item?.status !== 'pending' && item?.deliveryType === 'By Yourself'? 'Cancel' : 'Delete' )}
        />
      </View>
      <Text style={styles.typeOfRequest}>
        {
          only
        }
      </Text>
      {type === 1 ? (
        <Pressable
          style={styles.press}
          onPress={() => {
            setExpand(!expand);
            console.log(expand);
          }}>
          <SVGIcon
            style={[
              styles.svg,
              {
                transform: [expand ? {rotate: '90deg'} : {rotate: '-90deg'}],
              },
            ]}
            icon={icons.backButton}
          />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
    </>
    )
    
    }

    
  </View>
);
};

export default RequestComp;
