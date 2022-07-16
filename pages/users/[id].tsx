import { User } from ".prisma/client";
import { UploadInfo } from ".prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useSWR from "swr";
import { Edit, EditPlusBtn, Save } from "../../components/icon";
import Input from "../../components/Input";
import Navbar from "../../components/navbar";
import { Com } from "../../components/styledCom";
import { cloudFlareUpload } from "../../libs/client/cloudFlareUpload";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";
import Image from "next/image";
import backInitImg from "../../public/reef_img.jpg";

const Main = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	margin: 0;
	padding: 0;
	flex-direction: column;
`;

const UserProfile = styled(Com.Center)`
	height: 18rem;
	padding: 10px;
	margin-top: 40px;
	width: 100%;
`;

const UserProfileDivision = styled(Com.Center)`
	height: 100%;
	width: 50%;
	position: relative;
	padding: 0 20px;

	@media only screen and (max-width: 320px) {
		padding: 0 5px;
	}
`;

const ProfilePic = styled.div`
	height: 8rem;
	width: 8rem;
	border-radius: 8rem;
	z-index: 5;
	position: relative;
`;
const ProfileImg = styled.div`
	img {
		width: 100%;
		height: 100%;
		border-radius: 8rem;
	}
`;
const BackProfileImg = styled.div`
	img {
		opacity: 30%;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		position: absolute;
	}
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
	z-index: 50;
`;

const ProfileTop = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 10px;
	justify-content: space-between;
`;

const Season = styled.div`
	display: flex;
	justify-content: center;
	font-weight: bold;
	font-size: 12px;
	border-top-width: 2px;
	margin-top: 50px;
	background-color: #fafafa;
	height: 40px;
	width: 100%;
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
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;

	@media only screen and (max-width: 480px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
`;

const PostImg = styled.div`
	img {
		aspect-ratio: 1 / 1;
	}
`;
const End = styled.div`
	display: flex;
	align-items: center;
`;
const NaverUserInfo = styled.div`
	font-weight: bold;
	font-size: 14px;
	text-align: center;
	@media only screen and (max-width: 600px) {
		font-size: 0.7rem;
		line-height: 0.7rem;
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

	nickname?: string;
}
interface resPost {
	ok: boolean;
	post: UploadInfo[];
}
interface resAquaInfoForm {
	ok: boolean;
	info: AquaInfoForm;
	userInfo: User;
}

const Index = () => {
	const router = useRouter();
	const { user } = useUser(); // middleware

	const { data: aquaInfoInitData } = useSWR<resAquaInfoForm>(
		typeof window === "undefined"
			? null
			: `/api/users/${Number(router.query.id)}`
	);
	const { data: manyPost } = useSWR<resPost>(
		typeof window === "undefined"
			? null
			: `/api/posts/${Number(router.query.id)}`
	);

	const [aquaInfoFn] = useMutation(`/api/users/${Number(router.query.id)}`);
	const [uploadFn] = useMutation("/api/users/me");

	const productData = [
		{
			db: "skimmer",
			name: "스키머 / 제조사",
			value: aquaInfoInitData?.info?.skimmer
				? aquaInfoInitData?.info.skimmer
				: "",
		},
		{
			db: "watertank",
			name: "수조 / 하단 섬프(O,X) / 제조사",
			value: aquaInfoInitData?.info?.watertank,
		},
		{
			db: "lamp",
			name: "조명",
			value: aquaInfoInitData?.info?.lamp ? aquaInfoInitData?.info?.lamp : "",
		},
		{
			db: "watermotor",
			name: "수류모터 / 제조사",
			value: aquaInfoInitData?.info?.watermotor
				? aquaInfoInitData?.info?.watermotor
				: "",
		},
	];

	const waterData = [
		{
			db: "temp",
			name: "온도",
			value: aquaInfoInitData?.info?.temp ? aquaInfoInitData?.info?.temp : 0,
		},
		{
			db: "ph",
			name: "ph",
			value: aquaInfoInitData?.info?.ph ? aquaInfoInitData?.info?.ph : 0,
		},
		{
			db: "salt",
			name: "염도",
			value: aquaInfoInitData?.info?.salt ? aquaInfoInitData?.info?.salt : 0,
		},
		{
			db: "alkalinity",
			name: "경도",
			value: aquaInfoInitData?.info?.alkalinity,
		},
		{
			db: "calcium",
			name: "칼슘",
			value: aquaInfoInitData?.info?.calcium
				? aquaInfoInitData?.info?.calcium
				: 0,
		},
		{
			db: "mag",
			name: "마그네슘",
			value: aquaInfoInitData?.info?.mag ? aquaInfoInitData?.info?.mag : 0,
		},
		{
			db: "nitrate",
			name: "질산염",
			value: aquaInfoInitData?.info?.nitrate
				? aquaInfoInitData?.info?.nitrate
				: 0,
		},
		{
			db: "phosphorus",
			name: "인산염",
			value: aquaInfoInitData?.info?.phosphorus
				? aquaInfoInitData?.info?.phosphorus
				: 0,
		},
	];
	const { register, handleSubmit } = useForm();
	const [editOpen, setEditOpen] = useState(false);

	const editFn = () => {
		if (editOpen === true) setEditOpen(false);
		else setEditOpen(true);
	};

	const onValid = async (all: AquaInfoForm) => {
		if (all?.nickname) {
			uploadFn({ nickname: all.nickname });
		}
		aquaInfoFn({ ...all });
		setEditOpen(false);
	};

	const fileRead = async (e: React.ChangeEvent) => {
		e.preventDefault();
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) return;
		const file = input.files[0];

		const { uploadURL } = await (await fetch("/api/files")).json();
		const imageId = await cloudFlareUpload(uploadURL, file);
		e.target.id === "backImg"
			? uploadFn({ backavatar: imageId })
			: uploadFn({ avatar: imageId });

		router.reload();
	};
	return (
		<>
			<Main>
				<Navbar />
				<UserProfile>
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
						{aquaInfoInitData?.userInfo?.backavatar ? (
							<BackProfileImg>
								<Image
									layout="fill"
									src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${aquaInfoInitData?.userInfo?.backavatar}/public`}
								/>
							</BackProfileImg>
						) : (
							<BackProfileImg>
								<Image layout="fill" src={backInitImg} placeholder="blur" />
							</BackProfileImg>
						)}

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
							{aquaInfoInitData?.userInfo?.avatar ? (
								<ProfileImg>
									<Image
										layout="responsive"
										width={100}
										height={100}
										src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${aquaInfoInitData?.userInfo?.avatar}/public`}
									/>
								</ProfileImg>
							) : (
								<ProfilePic style={{ backgroundColor: "blue" }} />
							)}
						</ProfilePic>
					</UserProfileDivision>

					<UserProfileDivision>
						<form
							onSubmit={handleSubmit(onValid)}
							style={{ width: "100%", height: "100%" }}
						>
							<ProfileTop>
								<Input
									db="nickname"
									itemValue={
										aquaInfoInitData?.userInfo?.nickname
											? aquaInfoInitData?.userInfo?.nickname
											: ""
									}
									editEnable={editOpen}
									register={register("nickname")}
									type="text"
								/>
								<End>
									{user ? (
										<>
											<NaverUserInfo>
												{user?.gender}/{user?.age}/{user?.email}
											</NaverUserInfo>

											<Edit onClick={editFn} style={{ cursor: "pointer" }} />

											{editOpen ? (
												<button type="submit">
													<Save style={{ cursor: "pointer" }} />
												</button>
											) : null}
										</>
									) : (
										""
									)}
								</End>
							</ProfileTop>

							<ProductInfo>
								{productData.map((v, i) => (
									<Input
										key={i}
										db={i}
										item={v.name}
										itemValue={v.value ? v.value : ""}
										editEnable={editOpen}
										register={register(v.db)}
										type="text"
									/>
								))}
							</ProductInfo>
							<WaterInfo>
								{waterData.map((v, i) => (
									<Input
										key={i}
										db={i}
										item={v.name}
										itemValue={v.value ? v.value : ""}
										editEnable={editOpen}
										register={register(v.db)}
										type="number"
									/>
								))}
							</WaterInfo>
						</form>
					</UserProfileDivision>
				</UserProfile>

				<Season>
					{[1].map((_, i) => (
						<SeasonItem key={i}>Season {i + 1}</SeasonItem>
					))}
				</Season>

				<div className="grid grid-cols-3 gap-2">
					{manyPost?.post?.map((data, i) => (
						<PostImg key={i}>
							<Image
								layout="responsive"
								width={100}
								height={100}
								src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
							/>
						</PostImg>
					))}
				</div>
			</Main>
		</>
	);
};

export default Index;
/*<UserProfile>
				
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
						{aquaInfoInitData?.userInfo?.backavatar ? (
							<BackProfileImg
								src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${aquaInfoInitData?.userInfo?.backavatar}/public`}
							/>
						) : (
							<BackProfileImg src="/reef_img.jpg" />
						)}

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
							{aquaInfoInitData?.userInfo?.avatar ? (
								<ProfileImg
									src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${aquaInfoInitData?.userInfo?.avatar}/public`}
								/>
							) : (
								<ProfilePic style={{ backgroundColor: "blue" }} />
							)}
						</ProfilePic>
					</UserProfileDivision>

					
					<UserProfileDivision>
						<form
							onSubmit={handleSubmit(onValid)}
							style={{ width: "100%", height: "100%" }}
						>
							<ProfileTop>
								<Input
									db="nickname"
									itemValue={
										aquaInfoInitData?.userInfo?.nickname
											? aquaInfoInitData?.userInfo?.nickname
											: ""
									}
									editEnable={editOpen}
									register={register("nickname")}
									type="text"
								/>
								<End>
									{user ? (
										<>
											<NaverUserInfo>
												{user?.gender}/{user?.age}/{user?.email}
											</NaverUserInfo>

											<Edit onClick={editFn} style={{ cursor: "pointer" }} />

											{editOpen ? (
												<button type="submit">
													<Save style={{ cursor: "pointer" }} />
												</button>
											) : null}
										</>
									) : (
										""
									)}
								</End>
							</ProfileTop>

							<ProductInfo>
								{productData.map((v, i) => (
									<Input
										key={i}
										db={i}
										item={v.name}
										itemValue={v.value ? v.value : ""}
										editEnable={editOpen}
										register={register(v.db)}
										type="text"
									/>
								))}
							</ProductInfo>
							<WaterInfo>
								{waterData.map((v, i) => (
									<Input
										key={i}
										db={i}
										item={v.name}
										itemValue={v.value ? v.value : ""}
										editEnable={editOpen}
										register={register(v.db)}
										type="number"
									/>
								))}
							</WaterInfo>
						</form>
					</UserProfileDivision>
				</UserProfile>

				
				<Season>
					{[1].map((_, i) => (
						<SeasonItem key={i}>Season {i + 1}</SeasonItem>
					))}
				</Season>

				<div className="grid grid-cols-3 gap-2">
					{manyPost?.post?.map((data, i) => (
						<PostImg
							key={i}
							src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
						/>
					))}
				</div>
*/
