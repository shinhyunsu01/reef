import { User } from ".prisma/client";
import { UploadInfo } from ".prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useSWR from "swr";
import { Edit, EditPlusBtn, Save } from "../components/icon";
import Input from "../components/Input";
import Navbar from "../components/navbar";
import { Com } from "../components/styledCom";
import { cloudFlareUpload } from "../libs/client/cloudFlareUpload";
import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";
import Image from "next/image";
import backInitImg from "../public/reef_img.jpg";

import {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	NextPage,
} from "next";
import client from "../libs/server/client";
import Link from "next/link";
import PostModal from "../components/PostModal";

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
	@media only screen and (min-width: 600px) {
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

const Pic = styled.div<any>`
	width: 100%;

	aspect-ratio: 1 / 1;
	transition-property: transform, backdrop-filter;
	transition-duration: 500ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition: transform 1;

	&:hover {
		transform: scale(1.1);
		z-index: 5;
	}
	&:nth-child(3n) {
		transform-origin: right;
	}
	&:nth-child(3n + 1) {
		transform-origin: left;
	}
	&:hover:nth-child(${(props) =>
				props.prevPost === "" ? "" : Number(props.prevPost)}) {
		transform: scale(1);
	}
	cursor: pointer;
`;

const PicBody = styled.div`
	width: 100%;
	margin-top: 10px;
	margin-left: 0;
	display: grid;
	gap: 8px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const MiniProfile = styled.div`
	display: flex;
	align-items: center;
`;
const NaverUserInfo = styled.div`
	font-weight: bold;
	font-size: 14px;
	text-align: center;
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: 600px) {
		display: none;
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
interface stateModal {
	isLoading: boolean;
	data: UploadInfo;
}

interface resAquaInfoForm {
	info: AquaInfoForm;
	userInfo: User;
	posts: UploadInfo[];
}
const Page: NextPage<resAquaInfoForm> = ({ info, userInfo, posts }) => {
	//const Page = () => {
	const router = useRouter();
	const { user } = useUser(); // middleware

	const [aquaInfoFn] = useMutation(`/api/users/${Number(router.query.id)}`);
	const [uploadFn] = useMutation("/api/users/me");
	const [prevPost, setPrevPost] = useState(0);

	useEffect(() => {
		storePathValues();
	}, [router.asPath]);

	const storePathValues = () => {
		const storage = globalThis?.sessionStorage;

		if (!storage) return;
		const prevPath = storage.getItem("currentPath") || "";
		storage.setItem("prevPath", prevPath);
		storage.setItem("currentPath", globalThis.location.pathname);

		console.log("22prev", storage.getItem("prevPath"));
	};

	const productData = [
		{
			db: "skimmer",
			name: "스키머 / 제조사",
			value: info?.skimmer ? info?.skimmer : "",
		},
		{
			db: "watertank",
			name: "수조 / 하단 섬프(O,X) / 제조사",
			value: info?.watertank,
		},
		{
			db: "lamp",
			name: "조명",
			value: info?.lamp ? info?.lamp : "",
		},
		{
			db: "watermotor",
			name: "수류모터 / 제조사",
			value: info?.watermotor ? info?.watermotor : "",
		},
	];

	const waterData = [
		{
			db: "temp",
			name: "온도",
			value: info?.temp ? info?.temp : 0,
		},
		{
			db: "ph",
			name: "ph",
			value: info?.ph ? info?.ph : 0,
		},
		{
			db: "salt",
			name: "염도",
			value: info?.salt ? info?.salt : 0,
		},
		{
			db: "alkalinity",
			name: "경도",
			value: info?.alkalinity,
		},
		{
			db: "calcium",
			name: "칼슘",
			value: info?.calcium ? info?.calcium : 0,
		},
		{
			db: "mag",
			name: "마그네슘",
			value: info?.mag ? info?.mag : 0,
		},
		{
			db: "nitrate",
			name: "질산염",
			value: info?.nitrate ? info?.nitrate : 0,
		},
		{
			db: "phosphorus",
			name: "인산염",
			value: info?.phosphorus ? info?.phosphorus : 0,
		},
	];
	const { register, handleSubmit } = useForm();
	const [editOpen, setEditOpen] = useState(false);
	const [postModal, setPostModal] = useState({
		isLoading: false,
	});

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
	const postImgClick = (i: number, resData?: UploadInfo) => {
		if (i) setPrevPost(i + 1);
		if (resData) {
			//const usserInfoData = aquaInfoInitData?.userInfo;
			//const data = { ...resData, userInfoData };
			//setPostModal((prev) => ({ ...prev, data }));
			const data = {
				postavatar: resData.avatar,
				avatar: userInfo.avatar,
				nickname: userInfo.nickname,
				coralType: resData?.coralType,
				hashtag: resData?.hashtag,
				description: resData?.description,
			};
			setPostModal((prev) => ({ ...prev, data }));
		}

		if (postModal?.isLoading === true) setPostModal({ isLoading: false });
		else setPostModal((prev) => ({ ...prev, isLoading: true }));
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
						{userInfo?.backavatar ? (
							<BackProfileImg>
								<Image
									layout="fill"
									src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${userInfo?.backavatar}/public`}
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
							{userInfo?.avatar ? (
								<ProfileImg>
									<Image
										layout="responsive"
										width={100}
										height={100}
										src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${userInfo?.avatar}/public`}
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
									itemValue={userInfo?.nickname ? userInfo?.nickname : ""}
									editEnable={editOpen}
									register={register("nickname")}
									type="text"
								/>
								<MiniProfile>
									{user?.id === Number(router?.query?.id) ? (
										<>
											<NaverUserInfo>
												{user?.gender}/{user?.age}
												<div>{user?.email}</div>
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
								</MiniProfile>
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
						<SeasonItem key={i}></SeasonItem>
					))}
				</Season>

				<PicBody>
					{posts?.map((data, i) => (
						<Pic
							key={i}
							onClick={() => {
								postImgClick(i, data);
							}}
							prevPost={prevPost}
						>
							<Image
								layout="responsive"
								width={100}
								height={100}
								src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
							/>
						</Pic>
					))}
				</PicBody>
				<PostModal post={postModal} handler={postImgClick} />
			</Main>
		</>
	);
};

//export const getServerSideProps: GetServerSideProps = () => {};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
export const getStaticProps: GetStaticProps = async (ctx) => {
	console.log("BUILDING ID INDEX");
	if (!ctx?.params?.id) {
		return {
			props: {},
		};
	}
	let queryId = +ctx.params.id.toString();
	const info = await client.aquaInfo.findFirst({
		where: {
			userId: queryId,
		},
	});
	const userInfo = await client.user.findFirst({
		where: {
			id: queryId,
		},
	});
	const posts = await client.uploadInfo.findMany({
		where: {
			userId: queryId,
		},
	});
	return {
		props: {
			info: JSON.parse(JSON.stringify(info)),
			userInfo: JSON.parse(JSON.stringify(userInfo)),
			posts: JSON.parse(JSON.stringify(posts)),
		},
	};
};

export default Page;
