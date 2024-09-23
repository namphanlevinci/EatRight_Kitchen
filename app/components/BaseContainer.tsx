import React, {ReactNode} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootParamsProps} from '../navigations';
import {CustomText} from './CustomText';
import {scaleFont, scaleHeight, scaleWidth} from '../utils/scale';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {DrawerActions} from '@react-navigation/native';

const drawer_icon = require('../assets/icons/drawer_icon.png');

interface IProps {
  title?: string;
  onBack?: () => void | null;
  children: ReactNode;
  backgroundColor?: any;
  isBack?: Boolean;
  isLoading?: Boolean;
}

const BaseContainer = ({title, children, backgroundColor}: IProps) => {
  const navigation = useNavigation<RootParamsProps>();
  const insets = useSafeAreaInsets();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaProvider
      style={[
        styles.safeArea,
        backgroundColor && {backgroundColor: backgroundColor},
        {paddingTop: insets.top},
      ]}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
          <Image
            source={drawer_icon}
            style={styles.drawerIcon}
            tintColor={'#fff'}
          />
        </TouchableOpacity>
        <CustomText style={styles.titleText} fontWeight="700">
          {title}
        </CustomText>
      </View> */}
      <View style={styles.content}>{children}</View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleHeight(50),
    borderBottomWidth: 2,
    borderColor: '#023E6B',
    backgroundColor: '#eeeeee',
  },
  drawerButton: {
    backgroundColor: '#023E6B',
    height: scaleHeight(50),
    width: scaleHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  titleText: {
    fontSize: scaleFont(12),
    marginLeft: scaleWidth(20),
  },
  content: {
    flex: 1,
  },
});

export default BaseContainer;
