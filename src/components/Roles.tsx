import { useState } from "react";
import { IUserCard } from "../interfaces";
import cross from "../img/cross.png";
import add from "../img/add.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers } from "../store/usersSlice";
import useRolesInfo from "../utils/useRolesInfo";

export default function Roles() {
	const [users, setUsers] = useState<IUserCard[]>([]);
	const [err, setErr] = useState(false);
	const dispatch = useDispatch();
	const { roles } = useRolesInfo();

	const checkValues = (name: string, role: string): boolean => {
		let fill = name && role;
		let valid = /^[а-яА-ЯёЁ]+$/.test(name);
		let len = name.length <= 15;
		let usersLen = users.length < 5;
		console.log(fill, valid, len, usersLen);

		if (fill && valid && len && usersLen) {
			return true;
		}
		return false;
	};

	const addUser = () => {
		const name = document.querySelector<HTMLInputElement>(".roles__input");
		const role = document.querySelector<HTMLSelectElement>(".roles__select");
		if (checkValues(name?.value!, role?.value!)) {
			setUsers([...users, { name: name?.value!, role: role?.value! }]);
			setErr(false);
		} else {
			setErr(true);
			setTimeout(() => {
				setErr(false);
			}, 2000);
		}
	};

	const removeUser = (e: React.MouseEvent<HTMLDivElement>) => {
		setUsers([
			...users.slice(0, +e.currentTarget.id.slice(2)),
			...users.slice(+e.currentTarget.id.slice(2) + 1),
		]);
	};
	const send = () => {
		if (users.length === 5) {
			dispatch(addUsers(users));
		}
	};

	return (
		<div className='roles'>
			<p className='roles__title'>Выбор ролей</p>
			<div className='roles__main'>
				<input
					className='roles__input'
					placeholder='Введите своё имя'
					type='text'
				/>
				<select className='roles__select'>
					{roles.map((item, i) => {
						return <option key={`${item.id}`}>{item.name}</option>;
					})}
				</select>
				<div className='roles__add' onClick={addUser}>
					<img src={add} alt='+' />
				</div>
			</div>
			<div className='roles__users'>
				{users.map((item, i) => {
					return (
						<div className='roles__user' key={i} id={"id" + i.toString()}>
							<div className='roles__name'>{item.name}</div>
							<div className='roles__role'>{item.role}</div>
							<div
								className='roles__back'
								id={"id" + i.toString()}
								onClick={removeUser}
							>
								<img src={cross} alt='-' />
							</div>
						</div>
					);
				})}
			</div>
			{err ? <div className='roles__error'>Что-то пошло не так</div> : <></>}
			{users.slice(users.length - 5, users.length).length === 5 ? (
				<Link to='/way' onClick={send} className='roles__start'>
					Начать
				</Link>
			) : (
				<></>
			)}
		</div>
	);
}
