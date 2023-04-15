import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCommand } from "../store/usersSlice";

export default function Command() {
	const [show, setShow] = useState(false);
	const [command, setCommand] = useState("");
	const [date, setDate] = useState("");
  const dispatch = useDispatch()
	useEffect(() => {
		if (command && date) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [command, date]);

	return (
		<div className='start'>
			<div className='start__form'>
				<div className='start__title'>Команда</div>
				<input
					className='start__input1'
					onChange={(event: any) => setCommand(event.target.value)}
					type='text'
					placeholder='Название команды'
				/>
				<div className='start__subtitle'>О лагере и смене</div>
				<select className='start__select'>
					<option>Морской</option>
					<option>Лазурный</option>
					<option>Кипарисный</option>
					<option>Полевой</option>
					<option>Речной</option>
					<option>Янтарный</option>
					<option>Хрустальный</option>
					<option>Озерный</option>
				</select>
				<select className='start__select'>
					<option>1 смена</option>
					<option>2 смена</option>
					<option>3 смена</option>
					<option>4 смена</option>
				</select>
				<div className='start__subtitle'>Дата смены</div>
				<input
					className='start__input2'
					onChange={(event: any) => setDate(event.target.value)}
					type='date'
				/>
				{show ? (
					<Link to='/roles' className='start__next' onClick={() => dispatch(addCommand(command))}>
						Продолжить
					</Link>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
