import {useEffect, useState} from 'react';
import {usePrintersDiscovery} from 'react-native-esc-pos-printer';
import {useSavePrinter} from '../api/useSavePrinter';
import {useNotification} from '../context/NotificationContext';
import {useDispatch, useSelector} from 'react-redux';
import {saveDevice} from '../store/deviceSlice';
import {showLoader, hideLoader} from '../store/globalSlice';
import {globalStore} from '../store/store';
import {setPrinterMethod} from '../store/deviceSlice';
import {Alert} from 'react-native';

export const useConnectPrinter = (onComplete = () => {}) => {
  const dispatch = useDispatch();

  const {start, isDiscovering, printers} = usePrintersDiscovery();
  const {token} = useNotification();
  const restaurant_code = useSelector(
    (state: globalStore) => state.info.restaurant_code,
  );
  const [isStartDiscover, setStartDiscover] = useState(false);
  const printerMethod = useSelector(
    (state: globalStore) => state.device.printerMethod,
  );
  const device = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );

  const {savePrinter} = useSavePrinter();

  const onCompleteDiscover = () => {
    saveLocalDevice();
  };

  const discoverDevice = () => {
    if (isDiscovering) {
      dispatch(showLoader());
    } else {
      if (isStartDiscover) {
        setStartDiscover(false);
        onCompleteDiscover();
      }
      dispatch(hideLoader());
    }
  };

  const saveLocalDevice = () => {
    if (printers && printers?.length > 0) {
      const printer = printers?.[0];
      if (printer && token) {
        savePrinter({
          code: restaurant_code as string,
          printer_name: printer?.deviceName,
          fcm_token: token,
          status: 1,
        });
      }
      onComplete();
      dispatch(saveDevice(printers?.[0]));
    } else {
      Alert.alert('CANNOT CONNECT PRINTER');
      savePrinter({
        code: restaurant_code as string,
        printer_name: device?.deviceName ?? 'No device',
        fcm_token: token,
        status: 0,
      });
    }
  };

  useEffect(() => {
    discoverDevice();
  }, [isDiscovering]);

  const selectMethod = (method: string) => {
    dispatch(setPrinterMethod(method));
    if (method == 'Bluetooth') {
      setStartDiscover(true);
      start();
    }
  };

  const discoverBeforePrint = () => {
    selectMethod('Bluetooth');
  };

  return {
    selectMethod,
    discoverBeforePrint,
  };
};
