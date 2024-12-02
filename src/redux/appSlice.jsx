import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: { open: false, emails: [], searchText: "", showSidebar: true, signedIn: false, user: null, profile: null, selectedEmailsArray: [] },
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
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setSelectedEmailsArray: (state, action) => {
      state.selectedEmailsArray = action.payload;
    }
  },
});

export const { setOpen, setEmails, setSearchText, setShowSidebar, setUser, setProfile, setSelectedEmailsArray } = appSlice.actions;
export default appSlice.reducer;
