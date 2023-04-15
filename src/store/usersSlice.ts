import { createSlice } from "@reduxjs/toolkit";
import { IUserCard } from "../interfaces";

export interface IUsersState {
  users: IUserCard[],
  command: string;
}

const usersState: IUsersState = {
  users: [],
  command: ''

};

const usersSlice = createSlice({
  name: "users",
  initialState: usersState,
  reducers: {
    addUsers(state, action) {
      state.users = action.payload;
    },
    addCommand(state, action) {
      state.command = action.payload;
    },
  },
});

export const { addUsers, addCommand } = usersSlice.actions;

export default usersSlice.reducer;

