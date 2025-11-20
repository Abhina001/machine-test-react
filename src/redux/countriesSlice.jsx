import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { COUNTRIES_API } from '../constants/api';

export const fetchCountries = createAsyncThunk(
  'countries/fetch',
  async () => {
    const res = await fetch(COUNTRIES_API);
    return await res.json();
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
