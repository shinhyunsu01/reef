import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { CheckBox, Edit } from "../components/icon";
import Input from "../components/page/Input";
import Navbar from "../components/page/navbar";

const Main = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const UserProfile = styled.div`
	padding-top: 80px;

	width: 100%;
	display: flex;
	justify-content: center;
`;

const ProfilePic = styled.div`
	height: 8rem;
	width: 8rem;
	background-color: blue;
	border-radius: 8rem;
	margin-right: 20px;
`;
const Name = styled.span`
	font-size: 20px;
	font-weight: bold;
	margin-right: 20px;
`;

const ProfileTop = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 10px;
`;

const Info = styled.div`
	margin-right: 5px;
	display: flex;
	flex-direction: column;
`;
const InfoItem = styled.span`
	border-bottom-width: 2px;
	color: gray;
	font-size: 14px;
`;

const InfoValue = styled.span`
	font-size: 14px;
	font-weight: bold;
`;
const Season = styled.div`
	display: flex;
	justify-content: space-around;
	font-weight: bold;
	font-size: 12px;
	border-top-width: 2px;
	margin-top: 50px;
	background-color: #fafafa;
	height: 40px;
`;
const SeasonItem = styled.div`
	padding-top: 7px;
	&:hover {
		margin-top: -2px;
		cursor: pointer;
		border-top-width: 2px;

		border-color: black;
	}
`;

interface InfoForm {
	skimmber?: string;
}

const index = () => {
	const { register, handleSubmit, watch } = useForm();
	const [editOpen, setEditOpen] = useState(false);

	const waterData = [
		{ key: "temp", name: "온도", value: 26 },
		{ key: "ph", name: "ph", value: 0.001 },
		{ key: "salt", name: "염도", value: 0.001 },
		{ key: "alkalinity", name: "경도", value: 0.001 },
		{ key: "calcium", name: "칼슘", value: 0.001 },
		{ key: "mag", name: "마그네슘", value: 0.001 },
		{ key: "nitrate", name: "질산염", value: 0.001 },
		{ key: "phosphorus", name: "인산염", value: 0.001 },
	];

	const editFn = () => {
		setEditOpen(true);
	};
	const closeFn = () => {
		if (editOpen === true) {
			setEditOpen(false);
		}
	};

	useEffect(() => {
		if (editOpen === true) {
		}
	}, [editOpen]);

	const onValid = (validForm: InfoForm) => {
		setEditOpen(false);
		console.log("ok", validForm);
	};
	/*
	const [state, setState] = useState({
		loading: false,
		data: undefined,
		error: undefined,
	});
	*/
	console.log("watch", watch());

	return (
		<Main>
			<Navbar />

			<UserProfile>
				<ProfilePic />
				<div>
					<form onSubmit={handleSubmit(onValid)}>
						<ProfileTop>
							<Name>Shinhyunsu</Name>
							<div onClick={editFn}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							{editOpen ? (
								<button type="submit">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-7 w-7"
										viewBox="0 0 20 20"
										fill="#40A940"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							) : null}
						</ProfileTop>

						<div className="grid-cols-2  grid  gap-4">
							<Input
								item="스키머 / 제조사"
								itemValue="마린코스트"
								editEnable={editOpen}
								register={register("skimmer", {
									required: true,
								})}
								required
								type="text"
							/>

							<Input
								item="수조 / 하단 섬프(O,X) / 제조사"
								itemValue="400x400/X/제스트"
								editEnable={editOpen}
								register={register("watertank", {
									required: true,
								})}
								required
								type="text"
							/>

							<Input
								item="조명 / 제조사"
								itemValue="오펙"
								editEnable={editOpen}
								register={register("lamp", {
									required: true,
								})}
								required
								type="text"
							/>

							<Input
								item="수류모터 / 제조사"
								itemValue="SW-15/제바오"
								editEnable={editOpen}
								register={register("watermotor", {
									required: true,
								})}
								required
								type="text"
							/>
						</div>
						<div className="flex mt-4">
							{waterData.map((v, i) => (
								<Input
									key={i}
									item={v.name}
									itemValue={v.value}
									editEnable={editOpen}
									register={register(v.key, {
										required: true,
									})}
									required
									type="number"
								/>
							))}
						</div>
					</form>
				</div>
			</UserProfile>
			<Season>
				{[1, 2, 3].map((_, i) => (
					<SeasonItem key={i}>Season {i}</SeasonItem>
				))}
			</Season>

			<div className="grid grid-cols-3 gap-2">
				{[1, 2, 3, 4, 5, 6].map((_, i) => (
					<img key={i} src="./reef_img.jpg" className="h-50 aspect-square" />
				))}
			</div>
		</Main>
	);
};

export default index;

/*
<Input
								item="온도"
								itemValue="26"
								editEnable={editOpen}
								register={register("watermotor", {
									required: true,
								})}
								required
								type="number"
							/>
							<Info>
								<InfoItem>ph</InfoItem>
								<InfoValue>0.1</InfoValue>
							</Info>
							<Info>
								<InfoItem>염도</InfoItem>
								<InfoValue>0.01</InfoValue>
							</Info>
							<Info>
								<InfoItem>경도</InfoItem>
								<InfoValue>0.01</InfoValue>
							</Info>
							<Info>
								<InfoItem>칼슘</InfoItem>
								<InfoValue>0.001</InfoValue>
							</Info>
							<Info>
								<InfoItem>마그네숨</InfoItem>
								<InfoValue>0.001</InfoValue>
							</Info>
							<Info>
								<InfoItem>질산염</InfoItem>
								<InfoValue>0.001</InfoValue>
							</Info>
							<Info>
								<InfoItem>인산염</InfoItem>
								<InfoValue>0.001</InfoValue>
							</Info>
							<Info>
								<InfoItem>암모니아</InfoItem>
								<InfoValue>0.001</InfoValue>
							</Info>
*/
