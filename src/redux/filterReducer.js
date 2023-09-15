import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};
const filterSlice = createSlice({
  name: 'filter',

  initialState,

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Генератори екшенів
export const { setFilter } = filterSlice.actions;

//Селектори
// export const selectContacts = state => state.contacts.contacts.items;
export const selectFilter = state => state.filter.filter;
// Редюсер слайсу
export const filterReducer = filterSlice.reducer;
