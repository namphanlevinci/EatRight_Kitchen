import {createSlice} from '@reduxjs/toolkit';

export type deviceType = {
  deviceConnected: any;
  printerMethod: any;
};

const initialState: deviceType = {
  deviceConnected: null,
  printerMethod: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState: initialState,
  reducers: {
    saveDevice: (state, action) => {
      state.deviceConnected = action.payload;
    },
    setPrinterMethod: (state, action) => {
      state.printerMethod = action.payload;
    },
  },
});

export const {saveDevice, setPrinterMethod} = deviceSlice.actions;

export default deviceSlice.reducer;
