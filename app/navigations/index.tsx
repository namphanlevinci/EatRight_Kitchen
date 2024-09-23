import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screen} from './constant';
import {NavigationProp} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import MyDrawer from './Drawer';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import DrawerModal from '../components/DrawerModal';

const Stack = createNativeStackNavigator();
export type RootParamsProps = NavigationProp<any>;
const AppStack = () => {
  const restaurant_code = useSelector(
    (state: globalStore) => state.info.restaurant_code,
  );

  const isLoading = useSelector((state: globalStore) => state.global.isLoading);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Stack.Navigator
        id="AppStack"
        initialRouteName={Screen.Login}
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}>
        {!restaurant_code ? (
          <Stack.Screen
            name={Screen.Login}
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={Screen.DRAWER}
            component={MyDrawer}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>

      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
      )}
      <DrawerModal />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStack;
