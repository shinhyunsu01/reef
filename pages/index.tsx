import { User } from ".prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import styled from "styled-components";
import useSWR from "swr";
import Navbar from "../components/navbar";
import Link from "next/link";

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
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
const BackImage = styled.img`
	width: 100%;
	height: 100%;
`;

const AvatarImage = styled.img`
	height: 5rem;
	width: 5rem;
	border-radius: 5rem;
	margin-right: 1rem;

	@media only screen and (max-width: 450px) {
		height: 2rem;
		width: 2rem;
		border-radius: 2rem;
	}
`;

const AvatarDiv = styled.div`
	height: 5rem;
	width: 5rem;
	border-radius: 5rem;
	margin-right: 1rem;
	background-color: blue;

	@media only screen and (max-width: 450px) {
		height: 2rem;
		width: 2rem;
		border-radius: 2rem;
	}
`;

const PicTitle = styled.div`
	display: flex;
	padding: 5px;
	background-color: rgba(255, 255, 255, 0.5);
	color: black;
	position: absolute;
	border-bottom-right-radius: 20px;
`;
interface ManyUser {
	ok: boolean;
	users: User[];
}

const Index = () => {
	const router = useRouter();
	const { data, error } = useSWR<ManyUser>("/api/users");

	const onClick = (data: any) => {};

	return (
		<Main>
			<Navbar />

			<PicBody>
				{data?.ok
					? data?.users.map((data, i) => (
							<Pic key={i}>
								<Link href={`/users/${data.id}`}>
									<a>
										<PicTitle>
											{data?.avatar ? (
												<AvatarImage
													src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
												/>
											) : (
												<AvatarDiv />
											)}
											{data.nickname}
										</PicTitle>
										{data.backavatar ? (
											<BackImage
												src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.backavatar}/public`}
											/>
										) : (
											<BackImage key={i} src="/reef_img.jpg" />
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

export default Index;
/*

{data?.ok
					? data?.users.map((data, i) => (
							<Pic key={i}>
								<Link href={`/users/${data.id}`}>
									<a>
										<Check>
											{data?.avatar ? (
												<AvatarImage
													src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
												/>
											) : (
												<AvatarDiv />
											)}
											{data.nickname}
										</Check>
										{data.backavatar ? (
											<BackImage
												src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.backavatar}/public`}
											/>
										) : (
											<BackImage key={i} src="/reef_img.jpg" />
										)}
									</a>
								</Link>
							</Pic>
					  ))
					: ""}

*/

/*
<Main>
			<Navbar />

			<Body>
				{data?.ok
					? data?.users.map((data, i) => (
							<Pic key={i}>
								<Link href={`/users/${data.id}`}>
									<a>
										<Check>
											{data?.avatar ? (
												<AvatarImage
													src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.avatar}/public`}
												/>
											) : (
												<AvatarDiv />
											)}
											{data.nickname}
										</Check>
										{data.backavatar ? (
											<BackImage
												src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.backavatar}/public`}
											/>
										) : (
											<BackImage key={i} src="/reef_img.jpg" />
										)}
									</a>
								</Link>
							</Pic>
					  ))
					: ""}
			</Body>
		</Main>
*/
