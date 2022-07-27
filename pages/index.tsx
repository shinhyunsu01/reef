import { User } from ".prisma/client";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "../components/navbar";
import Link from "next/link";
import backInitImg from "../public/reef_img.jpg";
import Image from "next/image";
import { NextPage } from "next";
import client from "../libs/server/client";
import ShowAvatar from "../components/User/avatar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PicBody, Pic } from "../components/styles/showPic.styled";

const Main = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;
`;

const PicTitle = styled.div<any>`
	display: flex;
	position: relative;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	position: absolute;
	border-bottom-right-radius: 20px;
	padding-right: 10px;

	@media only screen and (max-width: 320px) {
		font-size: 5px;
		position: static;
		color: black;
		background-color: white;
		align-items: end;
		border-width: 2px;
		border-radius: 5px 5px 0 0;
	}

	@media only screen and (max-width: 480px) {
		font-size: 5px;
		position: static;
		color: black;
		background-color: white;
		align-items: end;
		border-width: 2px;
		border-radius: 5px 5px 0 0;
	}
	z-index: 1;

	div {
		display: flex;
		align-items: center;
		font-weight: bold;
		font-size: 18px;
		@media only screen and (max-width: ${({ theme }) => theme.mobile}) {
			font-size: 12px;
		}
	}
`;

interface ManyUser {
	//ok: boolean;
	users: User[];
}

const Page: NextPage<ManyUser> = ({ users }) => {
	//const Page = () => {
	//const { data: manyUser, error } = useSWR<ManyUser>("/api/users");

	const [prevLink, setPrevLink] = useState(0);
	const router = useRouter();
	useEffect(() => {
		storePathValues();
	}, [router.asPath]);

	let readPrev: any;
	const storePathValues = () => {
		const storage = globalThis?.sessionStorage;

		if (!storage) return;
		const prevPath = storage.getItem("currentPath") || "";

		storage.setItem("prevPath", prevPath);
		storage.setItem("currentPath", globalThis.location.pathname);

		readPrev = storage.getItem("prevPath");

		users.forEach((data, i) => {
			if (data.id === Number(readPrev.substr(1))) {
				setPrevLink(Number(i + 1));
			}
		});
	};
	//
	return (
		<Main>
			<Navbar />
			<PicBody margintop={"64px"}>
				{users.map((data, i) => (
					<Pic key={i} prevPage={prevLink}>
						<Link href={`/${data.id}`}>
							<a>
								<PicTitle>
									<ShowAvatar data={data?.avatar} layout="fill" avatar="true" />
									<div>{data.nickname}</div>
								</PicTitle>

								<ShowAvatar
									data={data?.backavatar}
									layout="responsive"
									width={100}
									height={100}
									backavatar="true"
								/>
							</a>
						</Link>
					</Pic>
				))}
			</PicBody>
		</Main>
	);
};

export async function getStaticProps() {
	console.log("BUILDING MAIN INDEX");
	const manyUser = await client.user.findMany({
		select: {
			id: true,
			nickname: true,
			avatar: true,
			backavatar: true,
		},
	});

	return {
		props: {
			users: manyUser, //JSON.parse(JSON.stringify(manyUser)),
		},
	};
}

export default Page;
