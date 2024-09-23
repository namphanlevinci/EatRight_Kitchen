import {createSlice} from '@reduxjs/toolkit';

export type drawerType = {
  isDrawerOpen: boolean;
};

const initialState: drawerType = {
  isDrawerOpen: false,
};

const infoSlice = createSlice({
  name: 'drawer',
  initialState: initialState,
  reducers: {
    openDrawer: state => {
      state.isDrawerOpen = true;
    },
    closeDrawer: state => {
      state.isDrawerOpen = false;
    },
  },
});

export const {openDrawer, closeDrawer} = infoSlice.actions;

export default infoSlice.reducer;
