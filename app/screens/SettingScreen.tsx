import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import BaseContainer from '../components/BaseContainer';
import {CustomText} from '../components/CustomText';
import {useForm} from 'react-hook-form';
import {scaleWidth, scaleFont} from '../utils/scale';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';
import {useConnectPrinter} from '../api/useConnectPrinter';

const radio_checked = require('../assets/icons/radio_checked.png');
const radio_uncheck = require('../assets/icons/radio_uncheck.png');

const printerMethods = [
  {
    key: 'Bluetooth',
    label: 'Bluetooth',
    isDisabled: false,
  },
  {
    key: 'LAN',
    label: 'LAN',
    isDisabled: true,
  },
  {
    key: 'USB',
    label: 'USB',
    isDisabled: true,
  },
];

const SettingScreen = () => {
  const {
    formState: {errors},
  } = useForm<FormData>();
  const deviceConnected = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );
  const printerMethod = useSelector(
    (state: globalStore) => state.device.printerMethod,
  );

  const {selectMethod} = useConnectPrinter();

  return (
    <BaseContainer title="Setting" isBack={false} backgroundColor="#F8F9FC">
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View>
            <CustomText style={styles.title} fontWeight="bold">
              Connect Printer By
            </CustomText>
            <View>
              {printerMethods.map(printer => (
                <TouchableOpacity
                  key={printer.key}
                  onPress={() =>
                    printer.isDisabled ? () => {} : selectMethod(printer.key)
                  }
                  style={[
                    styles.item,
                    {opacity: printer.isDisabled ? 0.2 : 1},
                  ]}>
                  <Image
                    source={radio_checked}
                    style={[
                      styles.iconMethod,
                      {
                        tintColor:
                          printerMethod == printer.key ? '#92C741' : 'grey',
                      },
                    ]}
                    resizeMode="contain"
                  />
                  <CustomText fontWeight="700" style={styles.labelMethod}>
                    {printer.label}
                  </CustomText>
                </TouchableOpacity>
              ))}

              <CustomText
                style={[styles.title, {marginTop: 24}]}
                fontWeight="bold">
                Devices
              </CustomText>
              {deviceConnected && (
                <CustomText
                  fontWeight="700"
                  style={[styles.labelMethod, {marginLeft: 0}]}>
                  {deviceConnected?.deviceName}
                </CustomText>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(8),
    backgroundColor: '#F8F9FC',
    paddingLeft: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleWidth(16),
  },
  title: {
    color: '#02ABC5',
    marginBottom: 16,
    fontSize: 24,
  },

  iconMethod: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  labelMethod: {
    color: '#333',
    fontSize: scaleFont(8),
    marginLeft: scaleWidth(12),
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default SettingScreen;
