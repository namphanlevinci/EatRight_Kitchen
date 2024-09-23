import {createSlice} from '@reduxjs/toolkit';

export type infoType = {
  restaurant_code: string | null;
};

const initialState: infoType = {
  restaurant_code: null,
};

const infoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    saveRestaurantCode: (state, action) => {
      state.restaurant_code = action.payload;
    },
    clearRestauranCode: state => {
      state.restaurant_code = null;
    },
  },
});

export const {saveRestaurantCode, clearRestauranCode} = infoSlice.actions;

export default infoSlice.reducer;
