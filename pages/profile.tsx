import { UploadInfo } from ".prisma/client";
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
import { Com } from "../components/styledCom";

const Main = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const UserProfile = styled(Com.Center)`
	height: 18rem;
	padding: 10px;
	padding-top: 80px;
`;

const UserProfileDivision = styled(Com.Center)`
	height: 100%;
	width: 50%;
	position: relative;
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

const ProductInfo = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;
`;

const PostImg = styled.img`
	aspect-ratio: 1 / 1;
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

const Index = () => {
	const router = useRouter();
	const { user } = useUser();

	const { data: aquaInfoInitData } = useSWR<resAquaInfoForm>(
		typeof window === "undefined" ? null : "/api/users/me/aquaedit"
	);
	const [aquaInfoFn] = useMutation("api/users/me/aquaedit");
	const [uploadFn] = useMutation("/api/users/me");
	const { data: manyPost } = useSWR<resPost>(
		typeof window === "undefined" ? null : "/api/users/me/post"
	);
	const { register, handleSubmit } = useForm();
	const [editOpen, setEditOpen] = useState(false);

	const productData = [
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
		if (editOpen === true) setEditOpen(false);
		else setEditOpen(true);
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
				{/*왼쪽 유저 사진 */}
				<UserProfileDivision>
					{editOpen ? (
						<BackEditPlus>
							<label>
								<input
									type="file"
									accept="image/*"
									style={{ display: "none" }}
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
										style={{ display: "none" }}
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

							<Edit onClick={editFn} style={{ cursor: "pointer" }} />

							{editOpen ? (
								<Save type="submit" style={{ cursor: "pointer" }} />
							) : null}
						</ProfileTop>

						<ProductInfo>
							{productData.map((v, i) => (
								<Input
									key={i}
									item={v.name}
									itemValue={v.value ? v.value : ""}
									editEnable={editOpen}
									register={register(v.key)}
									type="text"
								/>
							))}
						</ProductInfo>
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
					<PostImg
						key={i}
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
					/>
				))}
			</div>
		</Main>
	);
};

export default Index;
