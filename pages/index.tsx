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

const Body = styled.div`
	padding-top: 64px;
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
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
`;

const AvatarDiv = styled.div`
	height: 5rem;
	width: 5rem;
	border-radius: 5rem;
	margin-right: 1rem;
	background-color: blue;
`;

const Pic = styled.a`
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

const Check = styled.div`
	height: 5rem;

	display: flex;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	position: absolute;
	border-bottom-right-radius: 20px;
`;
interface ManyUser {
	ok: boolean;
	users: User[];
}

const Index = () => {
	/*const { data, error } = useSWR<ManyUser>(
		typeof window === "undefined" ? null : "/api/posts"
	);*/
	const router = useRouter();
	const { data, error } = useSWR<ManyUser>("/api/posts");

	const onClick = (data: any) => {};

	return (
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
	);
};

export default Index;
