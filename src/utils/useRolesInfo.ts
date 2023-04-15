import { useSelector } from "react-redux";
import { IRole } from "../interfaces";

export default function useRolesInfo() {
  const {roles} = useSelector(
    (state: { roles: {roles: IRole[]} }) => state.roles
  );
  
  return { roles };
}
