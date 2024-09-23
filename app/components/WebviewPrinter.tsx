import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import {scaleWidth} from '../utils/scale';
import {closeWebView} from '../store/globalSlice';
import {useDispatch} from 'react-redux';
import ViewShot from 'react-native-view-shot';

import {Printer, PrinterConstants} from 'react-native-esc-pos-printer';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';

const WebviewPrinter = forwardRef((_, ref) => {
  const webviewRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const refViewShot = useRef<ViewShot>(null);
  const deviceConnected = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );
  const isOPenWebView = useSelector(
    (state: globalStore) => state.global.isOpenWebView,
  );

  const print = async () => {
    const printerInstance = new Printer({
      target: deviceConnected.target,
      deviceName: deviceConnected.deviceName,
    });
    try {
      const result = await Promise.race([
        printerInstance.addQueueTask(async () => {
          await Printer.tryToConnectUntil(
            printerInstance,
            status => status.online.statusCode === PrinterConstants.TRUE,
          );

          await printerInstance.addFeedLine();
          await Printer.addViewShot(printerInstance, {
            viewNode: refViewShot.current as any,
          });

          await printerInstance.addCut();

          const result = await printerInstance.sendData(60000);
          await printerInstance.disconnect();
          return result;
        }),
      ]);
    } catch (err) {
      console.log({err});
    }
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setModalVisible(true);
    },
    hide: () => {
      setModalVisible(false);
    },
  }));

  useEffect(() => {
    if (isOPenWebView) {
      setTimeout(() => {
        print();
      }, 3000);
    }
  }, [isOPenWebView]);

  const toggleModal = () => {
    setModalVisible(false);
    dispatch(closeWebView());
  };

  const htmlContent = `
    <html>
      <body>
        <h1>Hello, WebView!</h1>
        <p>This is a simple HTML content rendered in a WebView.</p>
      </body>
    </html>
  `;

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}>
      <ScrollView>
        <ViewShot ref={refViewShot} style={styles.mainContainer}>
          <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            ref={webviewRef}
          />
          <TouchableOpacity onPress={print}>
            <Text>test print</Text>
          </TouchableOpacity>
        </ViewShot>
      </ScrollView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    paddingVertical: scaleWidth(16),
    width: scaleWidth(600),
    height: scaleWidth(300),
    alignSelf: 'center',
    borderRadius: 8,
  },
});

export default WebviewPrinter;
