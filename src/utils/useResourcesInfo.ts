import { useSelector } from "react-redux";
import { IRole } from "../interfaces";
import { IResourcesState } from '../store/resourcesSlice';

export default function useResourcesInfo() {
  const {water, air, food, overall} = useSelector(
    (state: { resources: IResourcesState }) => state.resources
  );
  
  return { water, air, food, overall };
}
