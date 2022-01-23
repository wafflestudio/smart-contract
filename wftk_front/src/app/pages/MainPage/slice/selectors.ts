import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.main || initialState;

export const selectMain = createSelector([selectSlice], state => state);

export const selectContract = createSelector(
  [selectSlice],
  state => state.contract,
);
