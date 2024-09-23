import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import SettingScreen from '../screens/SettingScreen';
import ReceiptHistoryScreen from '../screens/ReceiptHistoryScreen';
import {scaleHeight, scaleFont, scaleWidth} from '../utils/scale';
import {Screen} from './constant';
import {useDispatch} from 'react-redux';
import {clearRestauranCode} from '../store/infoSlice';
import HomeScreen from '../screens/HomeScreen';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {RootParamsProps} from './index';

const Drawer = createDrawerNavigator();

const ic_exit = require('../assets/icons/exit.png');
const ic_invoice = require('../assets/icons/invoice.png');
const ic_printing = require('../assets/icons/printing.png');
const ic_home = require('../assets/icons/home_icon.png');
const ic_caimuong = require('../assets/icons/icon_caimuong.png');

function MyDrawer() {
  return (
    <View style={{flex: 1}}>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <CustomDrawerContent {...props} />}
        initialRouteName="Home">
        <Drawer.Screen name={Screen.Home} component={HomeScreen} />
        <Drawer.Screen name={Screen.Setting} component={SettingScreen} />
        <Drawer.Screen
          name={Screen.ReceiptHistory}
          component={ReceiptHistoryScreen}
        />
      </Drawer.Navigator>
      <BottomRight />
    </View>
  );
}

const BottomRight = () => {
  const navigation = useNavigation<RootParamsProps>();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity
      onPress={toggleDrawer}
      style={{
        position: 'absolute',
        bottom: scaleWidth(24),
        right: scaleWidth(24),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <Image
        source={ic_caimuong}
        style={{
          resizeMode: 'contain',
          width: scaleWidth(35),
          height: scaleWidth(35),
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearRestauranCode());
  };
  return (
    <DrawerContentScrollView
      style={styles.drawerScrollView}
      contentContainerStyle={styles.drawerContent}
      {...props}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Screen.Home)}
          style={styles.button}>
          <Image source={ic_home} tintColor={'#fff'} style={styles.icon} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Screen.Setting)}
          style={styles.button}>
          <Image source={ic_printing} tintColor={'#fff'} style={styles.icon} />
          <Text style={styles.text}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Screen.ReceiptHistory)}
          style={styles.button}>
          <Image source={ic_invoice} tintColor={'#fff'} style={styles.icon} />
          <Text style={styles.text}>Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Image source={ic_exit} tintColor={'#fff'} style={styles.icon} />
          <Text style={styles.text}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerScrollView: {
    flex: 1,
    height: '100%',
    padding: 0,
    backgroundColor: '#02ABC5',
  },
  drawerContent: {
    padding: 0,
  },
  container: {
    padding: 20,
    flex: 1,
    height: scaleHeight(414),
    backgroundColor: '#02ABC5',
    marginTop: -scaleHeight(5),
    paddingTop: 40,
  },
  button: {
    width: '100%',
    marginBottom: scaleHeight(36),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scaleFont(10),
  },
  icon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    marginRight: scaleWidth(16),
  },
});

export default MyDrawer;
