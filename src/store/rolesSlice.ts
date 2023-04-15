import { createSlice } from "@reduxjs/toolkit";
import { IRole } from "../interfaces";

export interface IRolesState {
  roles: IRole[];
}

const rolesState: IRolesState = {
  roles: [
    {
      name: 'Капитан',
      id: 1,
      water: 10,
      air: 10,
      food: 10,
    },
    {
      name: 'Штурман',
      id: 2,
      water: 10,
      air: 10,
      food: 10,
    },
    {
      name: 'Медик',
      id: 3,
      water: 10,
      air: 10,
      food: 10,
    },
    {
      name: 'Импостер',
      id: 4,
      water: 10,
      air: 10,
      food: 10,
    },
    {
      name: 'Борт-механик',
      id: 5,
      water: 10,
      air: 10,
      food: 10,
    },
    {
      name: 'Программист',
      id: 6,
      water: 10,
      air: 10,
      food: 10,
    },
    {
      name: 'Кто-то',
      id: 7,
      water: 10,
      air: 10,
      food: 10,
    },
  ],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: rolesState,
  reducers: {
    addRoles(state, action) {
      state.roles = action.payload
    },
  },
});

export const { addRoles } = rolesSlice.actions;

export default rolesSlice.reducer;
