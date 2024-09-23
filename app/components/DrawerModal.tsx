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
import {scaleWidth, scaleHeight, scaleFont} from '../utils/scale';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';
import {useDispatch} from 'react-redux';
import {closeDrawer} from '../store/drawerSlice';
import {Screen} from '../navigations/constant';
import {useNavigation} from '@react-navigation/native';
import {RootParamsProps} from '../navigations';
import {clearRestauranCode} from '../store/infoSlice';

const ic_exit = require('../assets/icons/exit.png');
const ic_invoice = require('../assets/icons/invoice.png');
const ic_printing = require('../assets/icons/printing.png');
const ic_home = require('../assets/icons/home_icon.png');

const DrawerModal = ({}: {}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootParamsProps>();

  const isDrawerOpen = useSelector(
    (state: globalStore) => state.drawer.isDrawerOpen,
  );

  const toggleModal = () => {
    dispatch(closeDrawer());
  };

  const logout = () => {
    dispatch(clearRestauranCode());
  };

  return (
    <Modal
      isVisible={isDrawerOpen}
      onBackdropPress={toggleModal}
      animationIn="zoomInUp"
      animationOut="zoomOutDown"
      backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screen.Home)}
          style={styles.button}>
          <Image source={ic_home} tintColor={'#389E0D'} style={styles.icon} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screen.Setting)}
          style={styles.button}>
          <Image
            source={ic_printing}
            tintColor={'#389E0D'}
            style={styles.icon}
          />
          <Text style={styles.text}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screen.ReceiptHistory)}
          style={styles.button}>
          <Image
            source={ic_invoice}
            tintColor={'#389E0D'}
            style={styles.icon}
          />
          <Text style={styles.text}>Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Image source={ic_exit} tintColor={'#389E0D'} style={styles.icon} />
          <Text style={styles.text}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: scaleWidth(16),
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
  button: {
    width: '100%',
    marginBottom: scaleHeight(36),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#389E0D',
    fontWeight: '600',
    fontSize: scaleFont(10),
  },
  icon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    marginRight: scaleWidth(16),
  },
});

export default DrawerModal;
