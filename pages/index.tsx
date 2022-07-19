import { User } from ".prisma/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import Navbar from "../components/navbar";
import Link from "next/link";
import backInitImg from "../public/reef_img.jpg";
import Image from "next/image";
import { NextPage } from "next";

import client from "../libs/server/client";
import ShowAvatar from "../components/User/avatar";
import useSearch from "../libs/client/useSearch";

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

const Pic = styled.a`
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

const PicTitle = styled.div`
	display: flex;

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
`;

interface ManyUser {
	//ok: boolean;
	users: User[];
}

const Page: NextPage<ManyUser> = ({ users }) => {
	//const Page = () => {
	//const { data: manyUser, error } = useSWR<ManyUser>("/api/users");

	const router = useRouter();
	const onClick = (id: number) => {
		router.push(`/users/${id.toString()}`);
	}; /*
onClick={() => {
									onClick(data.id);
								}}
	*/
	return (
		<Main>
			<Navbar />
			<PicBody>
				{users
					? users.map((data, i) => (
							<Pic key={i}>
								<Link href={`/users/${data.id.toString()}`}>
									<a>
										<PicTitle>
											<ShowAvatar
												data={data?.avatar}
												layout="responsive"
												width={100}
												height={100}
											/>
											{data.nickname}
										</PicTitle>

										{data.backavatar ? (
											<Image
												layout="responsive"
												width={100}
												height={100}
												src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.backavatar}/public`}
											/>
										) : (
											<Image
												layout="responsive"
												width={100}
												height={100}
												src={backInitImg}
												placeholder="blur"
											/>
										)}
									</a>
								</Link>
							</Pic>
					  ))
					: ""}
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
			users: JSON.parse(JSON.stringify(manyUser)),
		},
	};
}

export default Page;
