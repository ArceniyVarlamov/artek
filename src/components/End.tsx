import bottle from "../img/water.png";
import oxygen from "../img/oxygen.png";
import tube from "../img/tube.png";
import star from "../img/star.png";
import useResourcesInfo from "../utils/useResourcesInfo";
import { useEffect } from "react";
import useUsersInfo from "../utils/useUsersInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { againResourses } from "../store/resourcesSlice";
import { againUsers } from "../store/usersSlice";

export default function Command() {

  const { users } = useUsersInfo();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
		//! поменять немного на проверку на length
		if (users.length !== 5) {
			return navigate("/");
		}
	}, [navigate, users]);

  const end = () => {
    dispatch(againResourses())
    dispatch(againUsers())
  }

	const { water, air, food, overall } = useResourcesInfo();

	return (
		<div className='end'>
			<div className='end__title'>Итоги</div>
			<div className='end__resaults'>
				<div className='end__food'>
					<p>{food}</p>
					<img src={tube} alt='food' />
				</div>
				<div className='end__water'>
					<p>{water}</p>
					<img src={bottle} alt='water' />
				</div>
				<div className='end__air'>
					<p>{air}</p>
					<img src={oxygen} alt='air' />
				</div>
				<div className='end__points'>
					<p>{overall}</p>
					<img src={star} alt='points' />
				</div>
			</div>
			<Link to='/' onClick={end} className='end__ok'>Заново</Link>
		</div>
	);
}
