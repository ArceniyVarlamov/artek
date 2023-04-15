import { configureStore } from "@reduxjs/toolkit";
import resourcesReducer from "./resourcesSlice";
import usersReducer from "./usersSlice";
import rolesReducer from "./rolesSlice";

const store = configureStore({
  reducer: {
    resources: resourcesReducer,
    users: usersReducer,
    roles: rolesReducer,
  },
});

export default store;
