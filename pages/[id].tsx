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
import { Com } from "../components/styles/styledCom";
import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";
import {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	NextPage,
} from "next";
import client from "../libs/server/client";
import PostModal from "../components/PostModal";
import { Pic, PicBody } from "../components/styles/showPic.styled";
import ShowAvatar from "../components/User/avatar";
import MiniProfileEditImg from "../components/User/MiniProfileEditImg";
import Graph from "../components/User/Graph";

const Main = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const UserProfile = styled(Com.Center)`
	height: 18rem;
	padding: 10px;
	margin-top: 64px;
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

interface resAquaInfoForm {
	info: AquaInfoForm;
	userInfo: User;
	posts: UploadInfo[];
}
const Page: NextPage<resAquaInfoForm> = ({ info, userInfo, posts }) => {
	console.log("info", info);
	//const Page = () => {
	const router = useRouter();
	const { user } = useUser();

	/*
	const { data: manyPost } = useSWR<resPost>(
		typeof window === "undefined"
			? null
			: `/api/posts/${Number(router.query.id)}`,

		{ refreshInterval: 1000 }
	);*/

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

	const postImgClick = (i: number, resData?: any) => {
		if (i >= 0) {
			setPrevPost(i + 1);
		}
		if (resData) {
			let userFlag = false;
			if (user?.email) {
				userFlag = true;
			}

			const data = {
				postavatar: resData.avatar,
				avatar: userInfo.avatar,
				nickname: userInfo.nickname,
				coralType: resData?.coralType,
				hashtag: resData?.hashtag,
				description: resData?.description,
				created: resData?.updatedAt,
				userFlag: userFlag,
				postId: resData.id,
				answers: resData?.Answer,
			};
			setPostModal((prev) => ({ ...prev, data }));
		}

		if (postModal?.isLoading === true) setPostModal({ isLoading: false });
		else setPostModal((prev) => ({ ...prev, isLoading: true }));
	};

	return (
		<Main>
			<Navbar />
			<UserProfile>
				<UserProfileDivision>
					<MiniProfileEditImg
						id="backImg"
						editOpen={editOpen}
						userInfo={userInfo}
						handler={uploadFn}
						editHandler={editFn}
					/>
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

			<Graph user={user} />
			<Season>
				<SeasonItem />
			</Season>

			<PicBody margintop={"0px"}>
				{posts?.map((data, i) => (
					<Pic
						key={i}
						prevPage={prevPost}
						onClick={() => {
							postImgClick(i, data);
						}}
					>
						<ShowAvatar
							data={data?.avatar}
							layout="responsive"
							width={100}
							height={100}
							backavatar="true"
						/>
					</Pic>
				))}
			</PicBody>
			{postModal?.isLoading === true ? (
				<PostModal post={postModal} handler={postImgClick} user={user} />
			) : (
				""
			)}
		</Main>
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
		include: {
			Answer: {
				select: {
					answer: true,
					updatedAt: true,
					id: true,
					user: {
						select: {
							id: true,
							nickname: true,
							avatar: true,
						},
					},
					ReAnsWer: {
						select: {
							reanswer: true,
							updatedAt: true,
							id: true,
							user: {
								select: {
									id: true,
									nickname: true,
									avatar: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return {
		props: {
			info: JSON.parse(JSON.stringify(info)),
			userInfo: JSON.parse(JSON.stringify(userInfo)),
			posts: JSON.parse(JSON.stringify(posts)),
		},
		//revalidate: 3,
	};
};

export default Page;
