import React, {createContext, useContext, useEffect, useState} from 'react';
import {useSavePrinter} from '../api/useSavePrinter';
import {useNotification} from './NotificationContext';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';

import {useAppState} from './useAppState';

// Tạo một interface cho trạng thái ứng dụng
interface AppState {
  isConnected: boolean;
  // Thêm các trạng thái khác nếu cần
}

// Khởi tạo context cho trạng thái ứng dụng
const AppContext = createContext<AppState>({
  isConnected: false,
  // Khởi tạo các trạng thái khác nếu cần
});

// Provider để cung cấp trạng thái cho các thành phần con
export const AppStateProvider: any = ({children}: any) => {
  const [appState, setAppState] = useState<AppState>({
    isConnected: false,
    // Khởi tạo các trạng thái khác nếu cần
  });
  const {token} = useNotification();
  const restaurant_code = useSelector(
    (state: globalStore) => state.info.restaurant_code,
  );
  const device = useSelector(
    (state: globalStore) => state.device.deviceConnected,
  );

  const {savePrinter} = useSavePrinter();

  useAppState({
    onChange: newAppState => {
      console.log('====> App To Change ' + newAppState, 'AppState');
    },

    onForeground: () => {
      console.log({}, 'App To Active');
    },

    onBackground: () => {
      savePrinter({
        code: restaurant_code as string,
        printer_name: device?.deviceName,
        fcm_token: token,
        status: 0,
      });
      console.log({}, 'App To Background ^^');
    },

    onBackForeground: () => {
      console.log({}, 'App from back To foreground');
    },

    onBackToActive: () => {},
  });
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

// Hook để sử dụng trạng thái ứng dụng trong các thành phần con
export const useAppStateContext = () => useContext(AppContext);
