import { UploadInfo } from ".prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useSWR from "swr";
import { Edit, EditPlusBtn, Save } from "../components/icon";
import Input from "../components/Input";
import Navbar from "../components/navbar";
import { cloudFlareUpload } from "../libs/client/cloudFlareUpload";
import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";

const Main = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const UserProfile = styled.div`
	height: 18rem;
	padding: 10px;
	padding-top: 80px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const UserProfileDivision = styled.div`
	height: 100%;
	width: 50%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20px;
`;

const ProfilePic = styled.div`
	height: 8rem;
	width: 8rem;
	border-radius: 8rem;
	z-index: 5;
	position: relative;
`;
const ProfileImg = styled.img`
	width: 100%;
	height: 100%;

	border-radius: 8rem;
`;
const BackProfileImg = styled.img`
	opacity: 30%;
	width: 100%;
	height: 100%;
	border-radius: 20px;
	position: absolute;
`;

const BackEditPlus = styled.div`
	z-index: 10;
	position: absolute;
	left: 0px;
	top: 0px;
	cursor: pointer;
`;
const EditPlus = styled.div`
	position: absolute;
	cursor: pointer;
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
const WaterInfo = styled.div`
	display: flex;
	margin-top: 1rem;
	width: 100%;

	@media only screen and (max-width: 600px) {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.5rem;
	}
`;

interface AquaInfoForm {
	skimmer?: string;
	watertank?: string;
	lamp?: string;
	watermotor?: string;
	temp?: number;
	ph?: number;
	salt?: number;
	alkalinity?: number;
	calcium?: number;
	mag?: number;
	nitrate?: number;
	phosphorus?: number;
	season?: number;
}
interface resPost {
	ok: boolean;
	post: UploadInfo[];
}
interface resAquaInfoForm {
	ok: boolean;
	info: AquaInfoForm;
}
const fetcher = (url: string) => fetch(url).then((response) => response.json());
const index = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();

	const { data: aquaInfoInitData, error: resError } = useSWR<resAquaInfoForm>(
		"/api/users/me/aquaedit",
		fetcher
	);
	const [aquaInfoFn, { data: aquaInfoData, loading, error }] = useMutation(
		"api/users/me/aquaedit"
	);
	const [uploadFn, { data }] = useMutation("/api/users/me");
	const { data: manyPost } = useSWR<resPost>("/api/users/me/post", fetcher);
	//console.log("manyPost", manyPost);
	const { register, handleSubmit, watch } = useForm();
	const [editOpen, setEditOpen] = useState(false);

	const baseData = [
		{
			key: "skimmer",
			name: "스키머 / 제조사",
			value: aquaInfoInitData?.info.skimmer,
		},
		{
			key: "watertank",
			name: "수조 / 하단 섬프(O,X) / 제조사",
			value: aquaInfoInitData?.info.watertank,
		},
		{ key: "lamp", name: "조명", value: aquaInfoInitData?.info.lamp },
		{
			key: "watermotor",
			name: "수류모터 / 제조사",
			value: aquaInfoInitData?.info.watermotor,
		},
	];

	const waterData = [
		{ key: "temp", name: "온도", value: aquaInfoInitData?.info.temp },
		{ key: "ph", name: "ph", value: aquaInfoInitData?.info.ph },
		{ key: "salt", name: "염도", value: aquaInfoInitData?.info.salt },
		{
			key: "alkalinity",
			name: "경도",
			value: aquaInfoInitData?.info.alkalinity,
		},
		{ key: "calcium", name: "칼슘", value: aquaInfoInitData?.info.calcium },
		{ key: "mag", name: "마그네슘", value: aquaInfoInitData?.info.mag },
		{ key: "nitrate", name: "질산염", value: aquaInfoInitData?.info.nitrate },
		{ key: "phosphorus", name: "인산염", value: aquaInfoInitData?.info.ph },
	];

	const editFn = () => {
		setEditOpen(true);
	};
	const closeFn = () => {
		if (editOpen === true) {
			setEditOpen(false);
		}
	};

	const onValid = async (all: AquaInfoForm) => {
		aquaInfoFn({ ...all });
		setEditOpen(false);
	};

	const fileRead = async (e) => {
		e.preventDefault();
		if (!e.target?.files) return;
		const { uploadURL } = await (await fetch("/api/files")).json();
		const imageId = await cloudFlareUpload(uploadURL, e.target?.files[0]);
		e.target.id === "backImg"
			? uploadFn({ backavatar: imageId })
			: uploadFn({ avatar: imageId });

		router.reload();
	};

	return (
		<Main>
			<Navbar />

			<UserProfile>
				{/*온쪽 유저 사진 */}
				<UserProfileDivision>
					{editOpen ? (
						<BackEditPlus>
							<label>
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={fileRead}
									id="backImg"
								/>
								<EditPlusBtn style={{ cursor: "pointer" }} />
							</label>
						</BackEditPlus>
					) : (
						""
					)}
					<BackProfileImg
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${user?.backavatar}/public`}
					/>
					<ProfilePic>
						{editOpen ? (
							<EditPlus>
								<label>
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={fileRead}
										id="profileImg"
									/>
									<EditPlusBtn style={{ cursor: "pointer" }} />
								</label>
							</EditPlus>
						) : (
							""
						)}
						<ProfileImg
							src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${user?.avatar}/public`}
						/>
					</ProfilePic>
				</UserProfileDivision>

				{/*오른쪽 form */}
				<UserProfileDivision>
					<form
						onSubmit={handleSubmit(onValid)}
						style={{ width: "100%", height: "100%" }}
					>
						<ProfileTop>
							<Name>{user?.nickname}</Name>

							<Edit onClick={editFn} />

							{editOpen ? (
								<button type="submit">
									<Save />
								</button>
							) : null}
						</ProfileTop>

						<div className="grid-cols-2  grid  gap-4">
							{baseData.map((v, i) => (
								<Input
									key={i}
									item={v.name}
									itemValue={v.value ? v.value : ""}
									editEnable={editOpen}
									register={register(v.key)}
									type="text"
								/>
							))}
						</div>
						<WaterInfo>
							{waterData.map((v, i) => (
								<Input
									key={i}
									item={v.name}
									itemValue={v.value ? v.value : ""}
									editEnable={editOpen}
									register={register(v.key)}
									type="number"
								/>
							))}
						</WaterInfo>
					</form>
				</UserProfileDivision>
			</UserProfile>

			{/*추후 선택 할수 있게 할 예정 */}
			<Season>
				{[1].map((_, i) => (
					<SeasonItem key={i}>Season {i + 1}</SeasonItem>
				))}
			</Season>

			<div className="grid grid-cols-3 gap-2">
				{manyPost?.post.map((data, i) => (
					<img
						key={i}
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
						className="h-50 aspect-square"
					/>
				))}
			</div>
		</Main>
	);
};

export default index;
/*

<div className="grid grid-cols-3 gap-2">
				{[1, 2, 3, 4, 5, 6].map((_, i) => (
					<img key={i} src="./reef_img.jpg" className="h-50 aspect-square" />
				))}
			</div>

*/
