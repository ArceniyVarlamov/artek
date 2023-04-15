import React, { Suspense, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
	ZapparCamera,
	ImageTracker,
	ZapparCanvas,
	Loader,
	BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import glb from "../assets/waving.glb";
import cust from "../assets/cust.zpt";
import smit from "../assets/smit.zpt";
import sturval from "../assets/sturval.zpt";
import useRolesInfo from "../utils/useRolesInfo";

import bottle from "../img/water.png";
import oxygen from "../img/oxygen.png";
import tube from "../img/tube.png";
import star from "../img/star.png";
import useResourcesInfo from "../utils/useResourcesInfo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUsersInfo from "../utils/useUsersInfo";
import { IUserCard } from "../interfaces";
import { addOverall, removeOverall } from "../store/resourcesSlice";

let action: THREE.AnimationAction;

let col = 0;
const Model = ({num}: {num: number}) => {
	const clock = new THREE.Clock();
	const gltfs = [
		useLoader(GLTFLoader, glb) as any,
	];
	const gltf = gltfs[num]
	const mixer = new THREE.AnimationMixer(gltf.scene);

	action = mixer.clipAction(gltf.animations[0]);
	action.play()

	if (col === 0) {
		gltf.scene.rotateX(Math.PI / 2);
		++col;
	}

	useFrame(() => mixer.update(clock.getDelta()));

	return <primitive object={gltf.scene} />;
};

export default function Way() {
	const [show, setShow] = useState(true);
	const [question, setQuestion] = useState(0);
	const { roles } = useRolesInfo();
	const { water, air, food, overall } = useResourcesInfo();
	// const { users } = useUsersInfo();
	const users = [
    {
        "name": "Арсений",
        "role": "Капитан"
    },
    {
        "name": "Катя",
        "role": "Медик"
    },
    {
        "name": "Глеб",
        "role": "Импостер"
    },
    {
        "name": "Любовь",
        "role": "Штурман"
    },
    {
        "name": "Даниил",
        "role": "Программист"
    }
] as IUserCard[]

	const dispatch = useDispatch();

	let navigate = useNavigate();

	const questions = [
		{
			//! Тип вопроса
			type: "choose",
			//! Текс вопроса
			text: "!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!asf",
			//! Вариант ответа
			first: "первый вариант",
			//! Вариант ответа
			second: "второй вариант",
			//! Вариант ответа
			third: "третий вариант",
			//! Вариант ответа
			fourth: "четвёртый вариант",
			//! Ответ на вопрос
			answer: 2,
			//! Если ответ правильный для кого начислиться больше очков
			goodFor: [1, 2],
			//! Если ответ верный во сколько увеличатся очки
			howGood: 1,
			//! Если ответ неправильный для кого начислиться меньше очков
			badFor: [6, 7],
			//! Если ответ неверный во сколько уменьшатся очки
			howBad: 1,
			//! Общий бал ответа на который уменьшается или увеличивается бал в зависимости от ответа
			overall: 1,
			//! Формула вычисления баллов при верном ответе и верной роли - overall + howGood
			//! аналогично для остального
		},
		{
			type: "input",
			text: "!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!asf",
			answer: "Так правильно",
			goodFor: [3, 4],
			howGood: 1,
			badFor: [5, 7],
			howBad: 1,
			overall: 1,
		},
	];
	useEffect(() => {
		//! поменять немного на проверку на length
		if (users.length !== 5) {
			return navigate("/");
		}
	}, [navigate, users]);

	useEffect(() => {
		//! поменять немного на проверку на length
		console.log(question, questions.length);
		
		if (question === questions.length) {
			return navigate("/end");
		}
	}, [navigate, question, questions.length]);

	const visible = () => {
		setShow(true);
		action.play();
	};

	const inVisible = () => {
		setShow(false);
	};
	const answer = (flag: boolean) => {
		if (flag) {
			console.log('rqwrqwrqwrqwrqwrqwrqwrqwr');
			
			const options = roles.find(
				(item) =>
					item.name ===
					document.querySelector<HTMLSelectElement>(".question__select")?.value.split('|')[0],
			);
			console.log(options);
			
			if (questions[question].goodFor.includes(options?.id!)) {
				dispatch(addOverall((questions[question].howGood || 1) + (questions[question].overall || 1)))
			} else {
				dispatch(addOverall(questions[question].overall || 1))
			}
		} else {
			const options = roles.find(
				(item) =>
					item.name ===
					document.querySelector<HTMLSelectElement>(".question__select")?.value.split('|')[0],
			);
			console.log(options);
			if (questions[question].badFor.includes(options?.id!)) {
				dispatch(removeOverall((questions[question].howBad || 1) + (questions[question].overall || 1)))
			} else {
				dispatch(removeOverall(questions[question].overall || 1))
			}
		}
		setQuestion(question + 1);
		
	};

	const targetImages = [
		cust,
		smit,
		sturval
	]

	return (
		<>
			<BrowserCompatibility />
			<ZapparCanvas>
				<ZapparCamera />
				<Suspense fallback={null}>
					<ImageTracker
						targetImage={targetImages[question]}
						onVisible={visible}
						onNotVisible={inVisible}
					>
						{show ? (
							<React.Suspense fallback={null}>
								<Model num={question} />
							</React.Suspense>
						) : (
							<></>
						)}
					</ImageTracker>
				</Suspense>
				<directionalLight position={[2.5, 8, 5]} intensity={1.5} />
				<Loader />
			</ZapparCanvas>
			{show ? (
				questions[question]?.type === "choose" ? (
					<div className='question'>
						<div className='question__text'>{questions[question].text}</div>
						<div className='question__choose'>
							<div
								className='question__first'
								onClick={() => answer(1 === questions[question].answer)}
							>
								{questions[question]?.first}
							</div>
							<div
								className='question__second'
								onClick={() => answer(2 === questions[question].answer)}
							>
								{questions[question]?.second}
							</div>
							<div
								className='question__third'
								onClick={() => answer(3 === questions[question].answer)}
							>
								{questions[question]?.third}
							</div>
							<div
								className='question__fourth'
								onClick={() => answer(4 === questions[question].answer)}
							>
								{questions[question]?.fourth}
							</div>
						</div>
						<select className='question__select'>
							{users.map((item, i) => {
								return <option key={i}>{item.role}|{item.name}</option>;
							})}
						</select>
					</div>
				) : (
					<div className='question'>
						<div className='question__text'>{questions[question]?.text}</div>
						<textarea
							className='question__input'
							placeholder='Введите ответ сюда'
						/>
						<select className='question__select'>
							{roles.map((item, i) => {
								return <option key={`${item.id}`}>{item.name}</option>;
							})}
						</select>
						<div
							className='question__answer'
							onClick={() =>
								answer(
									document.querySelector<HTMLTextAreaElement>(".question__input")?.value ===
										questions[question].answer,
								)
							}
						>
							Ответить
						</div>
					</div>
				)
			) : (
				<></>
			)}
			<div className='resources'>
				<div className='resources__tube'>
					<img src={tube} alt='еда' />
					<p>{food}</p>
				</div>
				<div className='resources__water'>
					<img src={bottle} alt='вода' />
					<p>{water}</p>
				</div>
				<div className='resources__oxygen'>
					<img src={oxygen} alt='воздух' />
					<p>{air}</p>
				</div>
				<div className='resources__star'>
					<img src={star} alt='очки' />
					<p>{overall}</p>
				</div>
			</div>
		</>
	);
}
