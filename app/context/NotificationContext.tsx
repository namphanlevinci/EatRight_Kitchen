import React, {createContext, useContext, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, View} from 'react-native';
import {getValueFromAsyncStorage} from '../utils/asyncStorage';
import {useSelector, useDispatch} from 'react-redux';
import {globalStore} from '../store/store';
import {setDataPrint} from '../store/globalSlice';

export interface Notification {
  id: string;
  title: string;
  message: string;
}

interface NotificationContextProps {
  token: string;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider: any = ({children}: any) => {
  const dispatch = useDispatch();
  const [token, setToken] = React.useState('');
  const deviceConnected = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );

  const onBackgroundMessage = async (data: any) => {
    console.log('on background message : ', data);
    if (data) {
      dispatch(setDataPrint(data?.notification?.body));
    }
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      requestNotificationPermission();

      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        try {
          await messaging()?.registerDeviceForRemoteMessages();
          const fcmToken = await messaging().getToken();
          setToken(fcmToken);
          console.log('FCM token', fcmToken);
        } catch (error) {
          const fcmTokenStorage = await getValueFromAsyncStorage('fcmToken');
          setToken(fcmTokenStorage);
          console.log('FCM token', fcmTokenStorage);
          console.log('Error', error);
        }
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Provisional Permission granted');
      } else {
        console.log('Permission denied');
      }
    };
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) {}
      }
    };
    requestUserPermission();

    messaging().onMessage(async data => {
      dispatch(setDataPrint(data?.notification?.body));
    });

    messaging().setBackgroundMessageHandler(onBackgroundMessage);

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.data,
          );
        }
      });
  }, []);
  return (
    <NotificationContext.Provider
      value={{
        token,
      }}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>{children}</View>
      </View>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};
