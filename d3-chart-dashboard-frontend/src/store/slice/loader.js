import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  loader: false,
};

const Loader = createSlice({
  name: "loader",
  initialState: initialValue,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setLoader } = Loader.actions;
export default Loader.reducer;
