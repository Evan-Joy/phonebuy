import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app-store/store";
import { Funcs } from "../utils";

interface ICommonReducer {
  totalQuantity: number,

}

const initialState: ICommonReducer = {
  totalQuantity:Funcs.count_QuantityProduct() ,
}
const CommonSlice = createSlice({
  name: 'CommonReducer',
  initialState: initialState,
  reducers: {
    updateQuantity: (state) => {
      const quantity = Funcs.count_QuantityProduct()
      state.totalQuantity= quantity
    },
    
  }
});

export const { updateQuantity } = CommonSlice.actions;

export const selectCommon = (state: RootState) => state.commonReducer;

export default CommonSlice.reducer;