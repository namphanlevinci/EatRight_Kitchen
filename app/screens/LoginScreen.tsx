import {View, StyleSheet} from 'react-native';
import React from 'react';
import {CustomText} from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import {useForm, SubmitHandler} from 'react-hook-form';
import {CustomButton} from '../components';
import {scaleWidth, scaleFont} from '../utils/scale';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scaleHeight} from '../utils/scale';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../navigations/constant';
import {RootParamsProps} from '../navigations';
import {useDispatch} from 'react-redux';
import {saveRestaurantCode} from '../store/infoSlice';
import {setValueInAsyncStorage} from '../utils/asyncStorage';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigation = useNavigation<RootParamsProps>();
  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    setValueInAsyncStorage('restaurant_code', data?.code);
    dispatch(saveRestaurantCode(data?.code));
    navigation.navigate(Screen.DRAWER);
  };

  return (
    <View style={styles.wrap}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{width: scaleWidth(300)}}>
            <CustomText
              style={{
                color: '#0255BF',
                textAlign: 'center',
                marginBottom: 24,
                fontSize: 24,
              }}
              fontWeight="bold">
              EatRight Kitchen
            </CustomText>

            <CustomText
              fontWeight="700"
              style={{
                color: '#333',
                fontSize: scaleFont(8),
              }}>
              Restaurant code
            </CustomText>
            <CustomInput
              name="code"
              control={control}
              placeholder="FNB001"
              rules={{
                required: 'Please enter restaurant code',
              }}
              style={{marginTop: scaleFont(7), backgroundColor: '#EAECF0'}}
            />
            <CustomButton
              title="Enter"
              onPress={handleSubmit(onSubmit)}
              buttonStyle={{backgroundColor: '#0255BF', marginTop: 16}}
              textStyle={{fontSize: 18}}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    paddingTop: scaleHeight(60),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
});

export default LoginScreen;
