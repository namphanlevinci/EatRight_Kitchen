import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {scaleWidth} from '../utils/scale';
import ViewShot from 'react-native-view-shot';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';
import {Printer, PrinterConstants} from 'react-native-esc-pos-printer';
import {useConnectPrinter} from '../api/useConnectPrinter';

const CustomModal = ({
  isModalVisible,
  toggleModal,
  data,
}: {
  isModalVisible: boolean;
  toggleModal: any;
  data: any;
}) => {
  const ref = useRef<ViewShot>(null);
  const device = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );

  const [deviceConnected, setDevice] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const onCompleteDiscover = () => {
    print();
  };
  const {discoverBeforePrint} = useConnectPrinter(onCompleteDiscover);

  useEffect(() => {
    setDevice(device);
  }, [device]);

  const print = async () => {
    try {
      setLoading(true);
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
            uri: data,
          },
          width: 420,
          mode: PrinterConstants.MODE_MONO,
          brightness: 0.1,
          halftone: PrinterConstants.HALFTONE_THRESHOLD,
        });
        await printerInstance.addFeedLine();
        await printerInstance.addCut();
        const result = await printerInstance.sendData(60000);
        await printerInstance.disconnect();
        return result;
      });
      setLoading(false);
    } catch (err) {
      console.log({err});
      setLoading(false);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      animationIn="zoomInUp"
      animationOut="zoomOutDown"
      backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <ViewShot ref={ref} captureMode="mount">
            <View style={styles.mainContainer}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                  uri: data,
                }}
              />
            </View>
          </ViewShot>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={discoverBeforePrint}
            style={styles.printButton}>
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={styles.printText}>Print</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
    position: 'relative',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: scaleWidth(16),
    width: scaleWidth(600),
    alignSelf: 'center',
    borderRadius: 8,
  },
  image: {
    width: scaleWidth(700),
    height: 1800,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    width: scaleWidth(200),
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleWidth(55),
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
    fontSize: scaleWidth(17),
  },
  printButton: {
    backgroundColor: '#0B66E4',
    width: scaleWidth(200),
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleWidth(55),
    borderRadius: 8,
    marginTop: 8,
    marginLeft: 8,
  },
  printText: {
    color: 'white',
    fontWeight: '600',
    fontSize: scaleWidth(17),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '900',
    fontSize: 30,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scaleWidth(36),
  },
  row: {
    flexDirection: 'row',
    width: '50%',
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  boldText: {
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 24,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomModal;
