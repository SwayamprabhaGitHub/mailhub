import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: { open: false, emails: [], searchText: "", showSidebar: false, signedIn: false, user: null },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setOpen, setEmails, setSearchText, setShowSidebar, setUser } = appSlice.actions;
export default appSlice.reducer;
