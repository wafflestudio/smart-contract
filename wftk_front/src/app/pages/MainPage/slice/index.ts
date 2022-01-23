import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { Contract } from 'web3-eth-contract';

/* --- STATE --- */
export interface MainState {
  contract: Contract | null;
  account: string;
}

export const initialState: MainState = {
  contract: null,
  account: '',
};

const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setContract(state, action: PayloadAction<Contract>) {
      state.contract = action.payload;
    },
    setAccount(state, action: PayloadAction<string>) {
      state.account = action.payload;
    },
  },
});

export const { actions: mainActions } = slice;

export const useMainSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMainSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
