import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app-store/store";

interface IProductFilter {
  categoryId?: number,
  productName?: string;
}

const initialState: IProductFilter = {}
const ProductFilterSlice = createSlice({
  name: 'ProductFilterReducer',
  initialState: initialState,
  reducers: {
    userClickCategory: (state, action: PayloadAction<IProductFilter>) => {
      const { categoryId } = action.payload;
      state.categoryId = categoryId;
    },
    userTyping: (state, action: PayloadAction<IProductFilter>) => {
      const { productName } = action.payload;
      state.productName = productName;
    },
  }
});

export const { userClickCategory,userTyping } = ProductFilterSlice.actions;

export const selectFilterProduct = (state: RootState) => state.filterProduct;

export default ProductFilterSlice.reducer;