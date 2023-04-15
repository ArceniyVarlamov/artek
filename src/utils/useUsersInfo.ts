import { useSelector } from "react-redux";
import { IRole, IUserCard } from "../interfaces";

export default function useUsersInfo() {
	const { users, command } = useSelector(
		(state: { users: { users: IUserCard[]; command: string } }) => state.users,
	);

	return { users };
}
