import {createSlice} from '@reduxjs/toolkit';

export type globalLoadingType = {
  isLoading: boolean;
  isOpenWebView: boolean;
  dataPrint: any;
};

const initialState: globalLoadingType = {
  isLoading: false,
  isOpenWebView: false,
  dataPrint: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    showLoader: state => {
      state.isLoading = true;
    },
    hideLoader: state => {
      state.isLoading = false;
    },
    openWebView: state => {
      state.isOpenWebView = true;
    },
    closeWebView: state => {
      state.isOpenWebView = false;
    },
    setDataPrint: (state, action) => {
      state.dataPrint = action.payload;
    },
  },
});

export const {showLoader, hideLoader, openWebView, closeWebView, setDataPrint} =
  globalSlice.actions;

export default globalSlice.reducer;
