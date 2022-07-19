import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import Image from "next/image";
import Navbar from "../../components/navbar";
import {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	NextPage,
} from "next";
import Router, { useRouter } from "next/router";
import PostModal from "../../components/PostModal";
import { useState } from "react";

import client from "../../libs/server/client";
import { UploadInfo } from ".prisma/client";

const Main = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: row;
`;

const PicBody = styled.div`
	width: 100%;
	margin-top: 64px;
	margin-left: 0;
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const Pic = styled.div`
	width: 100%;

	aspect-ratio: 1 / 1;
	transition-property: transform, backdrop-filter;
	transition-duration: 500ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition: transform 1;

	&:hover {
		transform: scale(1.1);
	}
	&:nth-child(3n) {
		transform-origin: right;
	}
	&:nth-child(3n + 1) {
		transform-origin: left;
	}
	cursor: pointer;
`;

interface hashtag extends UploadInfo {
	user: object;
}

interface hashtagForm {
	hashtag: hashtag[];
}

const Page: NextPage<hashtagForm> = (hashtagData) => {
	//const Page = () => {
	const router = useRouter();
	/*const { data: hashtagData, error } = useSWR<hashtagForm>(
		`/api/search/${router.query.pid}`
	);*/
	const [postModal, setPostModal] = useState({
		isLoading: false,
	});
	const postImgClick = (hashtagData: any) => {
		if (hashtagData) {
			const data = {
				postavatar: hashtagData.avatar,
				avatar: hashtagData?.user?.avatar,
				nickname: hashtagData?.user?.nickname,
				coralType: hashtagData?.coralType,
				hashtag: hashtagData?.hashtag,
				description: hashtagData?.description,
			};
			setPostModal((prev) => ({ ...prev, data }));
		}

		if (postModal?.isLoading === true) setPostModal({ isLoading: false });
		else setPostModal((prev) => ({ ...prev, isLoading: true }));
	};
	console.log("hashtagData", hashtagData);

	return (
		<Main>
			<Navbar />
			<PicBody>
				{hashtagData
					? hashtagData?.hashtag.map((data: any, i: any) => (
							<Pic
								key={i}
								onClick={() => {
									postImgClick(data);
								}}
							>
								<Image
									layout="responsive"
									width={100}
									height={100}
									src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
								/>
							</Pic>
					  ))
					: ""}
			</PicBody>
			<PostModal post={postModal} handler={postImgClick} />
		</Main>
	);
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
export const getStaticProps: GetStaticProps = async (ctx) => {
	console.log("BUILDING PID INDEX");
	if (!ctx?.params?.pid) {
		return {
			props: {},
		};
	}
	let arr: any = [];
	const path: any = ctx?.params?.pid || "";
	const hashtags = await client.uploadInfo.findMany({
		where: {
			hashtag: {
				not: null,
			},
		},
		include: {
			user: {
				select: {
					avatar: true,
					nickname: true,
				},
			},
		},
	});

	hashtags.map((data) => {
		if (data.hashtag?.includes(path)) {
			arr.push(data);
		}
	});

	return {
		props: {
			hashtag: JSON.parse(JSON.stringify(arr)),
		},
	};
};

export default Page;