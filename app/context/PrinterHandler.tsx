import React, {createContext, useEffect} from 'react';
import {View} from 'react-native';
import {
  Printer,
  PrinterConstants,
  PrinterAddPulseDrawerType,
} from 'react-native-esc-pos-printer';
import {useSelector, useDispatch} from 'react-redux';
import {globalStore} from '../store/store';
import {setDataPrint} from '../store/globalSlice';
import {useConnectPrinter} from '../api/useConnectPrinter';

export interface Notification {}

interface NotificationContextProps {}

const PrinterHandler = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const PrinterProvider: any = ({children}: any) => {
  const device = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );

  const onCompleteDiscover = () => {
    print(dataPrint);
  };
  const {discoverBeforePrint} = useConnectPrinter(onCompleteDiscover);

  const dispatch = useDispatch();

  const [deviceConnected, setDevice] = React.useState<any>(null);

  useEffect(() => {
    setDevice(device);
  }, [device]);

  const dataPrint = useSelector((state: globalStore) => state.global.dataPrint);

  const print = async (data: any) => {
    try {
      const printerInstance = new Printer({
        target: deviceConnected.target,
        deviceName: deviceConnected.deviceName,
      });

      const res = await printerInstance.addQueueTask(async () => {
        await Printer.tryToConnectUntil(
          printerInstance,
          status => status.online.statusCode === PrinterConstants.TRUE,
        );
        // await printerInstance.addText(data);
        await printerInstance.addImage({
          source: {
            uri: dataPrint,
          },
          width: 420,
          mode: PrinterConstants.MODE_MONO,
          brightness: 0.1,
          halftone: PrinterConstants.HALFTONE_THRESHOLD,
        });
        await printerInstance.addFeedLine();
        await printerInstance.addCut();
        const result = await printerInstance.sendData();
        await printerInstance.disconnect();
        dispatch(setDataPrint(null));
        return result;
      });
    } catch (err) {
      console.log({err});
    }
  };

  const openCashier = async () => {
    try {
      const printerInstance = new Printer({
        target: deviceConnected.target,
        deviceName: deviceConnected.deviceName,
      });

      const res = await printerInstance.addQueueTask(async () => {
        await Printer.tryToConnectUntil(
          printerInstance,
          status => status.online.statusCode === PrinterConstants.TRUE,
        );

        await printerInstance.addPulse({
          drawer: PrinterAddPulseDrawerType.DRAWER_2PIN,
        });
        const result = await printerInstance.sendData();
        await printerInstance.disconnect();
        dispatch(setDataPrint(null));
        return result;
      });
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    if (dataPrint == 'OPEN_CASHIER') {
      openCashier();
    } else if (dataPrint) {
      discoverBeforePrint();
    }
  }, [dataPrint]);

  return (
    <PrinterHandler.Provider value={{}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>{children}</View>
      </View>
    </PrinterHandler.Provider>
  );
};
