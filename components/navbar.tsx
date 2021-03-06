import { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import useMutation from "../libs/client/useMutation";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
	CloseSvg,
	HomeSvg,
	LogoutSvg,
	NaverSvg,
	ProfileSvg,
	SearchSvg,
	UploadSvg,
} from "./icon";
import useUser from "../libs/client/useUser";
import Upload from "./upload/Upload";
import { Com, Modal } from "./styles/styledCom";
import Link from "next/link";
import LoginModal from "./LoginModal";
import useSWR from "swr";
import { NextPage } from "next";
import client from "../libs/server/client";
import { User } from ".prisma/client";
import Image from "next/image";
import { BallTriangle } from "react-loader-spinner";

const Header = styled(Com.ColCenter)`
	background-color: white;
	top: 0px;
	width: 100%;
	height: 55px;

	justify-content: space-between;

	position: fixed;
	max-width: 1024px;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	z-index: 100;
`;

const Search = styled(Com.ColCenter)`
	position: relative;
	//display: flex;
	cursor: text;
	&:focus-within {
		div {
			display: none;
		}
	}
`;
const SearchInput = styled.input`
	position: relative;
	//left: 0;
	width: 256px;
	outline: 2px solid transparent;
	outline-offset: 2px;
	//padding-left: 32px;
	height: 40px;
	border-width: 1px;
	border-radius: 6px;
	background-color: rgb(244 244 246);
	color: rgb(107 114 128);
	text-align: center;
	//margin: 0 10px;

	&:focus {
		color: black;
		padding-left: 16px;
	}
	@media only screen and (max-width: 500px) {
		width: 150px;
	}
	@media only screen and (max-width: 480px) {
		width: 50px;
		&:focus {
			z-index: 1000;
			width: 150px;
			color: black;
			padding-left: 16px;
		}
	}

	/*@media only screen and (max-width: 320px) {
		width: 50px;
		margin: 0 10px;

		
	}*/
`;

const Chk = styled.div`
	position: relative;
`;
const SearchMiniOpen = styled.div`
	position: absolute;

	width: 256px;
	height: 100px;
	overflow: auto;

	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	background-color: rgb(244 244 246);

	@media only screen and (max-width: 500px) {
		width: 150px;
	}
	@media only screen and (max-width: 480px) {
		width: 150px;
	}
`;

const SearchLogo = styled.div`
	position: absolute;
	padding-left: 8px;
	@media only screen and (max-width: 320px) {
		padding-left: 16px;
	}
`;

const Reef = styled.div`
	a {
		font-weight: bold;
		font-size: 27px;
		cursor: pointer;
		height: 48px;
	}
`;

const Menu = styled(Com.ColCenter)`
	justify-content: flex-end;
	svg,
	img {
		margin-right: 10px;
		cursor: pointer;
	}
`;
const SearchTool = styled.div`
	display: flex;
	flex-direction: column;
	
	//display: flex;
	//position: relative;
	//height: 100%;
	//align-items: center;
	//justify-content: center;
s`;
const HashTagBtn = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px;

	&:hover {
		color: blue;
		cursor: pointer;
	}

	div:nth-child(1) {
		font-weight: bold;
	}
`;
const HashImg = styled.div`
	position: relative;
	width: 30px;
	height: 30px;
	img {
		border-radius: 30px;
	}
`;
const HashImgFont = styled.div`
	margin-left: 20px;
	font-weight: bold;
`;
const Flex = styled.div`
	display: flex;
`;

interface UserInfo {
	age: string;
	birthyear: string;
	email: string;
	gender: string;
}
interface MutationResult {
	ok: boolean;
	user?: User;
}

interface SearchResult {
	ok: boolean;
	users: User[];
	hashtags: string[];
}
//const Navbar: NextPage<SearchResult> = ({ users, hashtags }) => {
export default function Navbar() {
	const Ref = useRef<any>(null);
	const { data: user, mutate } = useSWR("/api/users/me");
	const { data: serverData, error } = useSWR<SearchResult>("/api/search");

	const router = useRouter();
	const [uploadopen, setUploadopen] = useState(false);
	const [loginopen, setLoginopen] = useState(false);
	const [loginloading, setLoginloading] = useState(false);

	const [searchInput, setSearchinput] = useState([]);
	const [searchData, setsearchData] = useState("");

	const [searchFlag, setsearchFlag] = useState(false);

	const [loginData, { data: logindataa }] =
		useMutation<MutationResult>("/api/users/me");

	let hashtag: any[] = [];
	let users: any[] = [];
	let hashtagArr;
	let usersArr;

	//?????? ????????? -> ?????? ?????? ?????? array ??? ??????
	if (!(serverData && error)) {
		hashtagArr = serverData?.hashtags
			.map((strData: any) => {
				return strData.hashtag;
			})
			.toString()
			.split(",")
			.map((d: any) => d.slice(1));

		hashtagArr?.forEach((x: any) => {
			hashtag[x] = (hashtag[x] || 0) + 1;
		});

		serverData?.users.map((searchUsers: any) => {
			if (searchUsers.nickname === null) users.push("");
			else users.push(searchUsers.nickname.toLowerCase());
		});
	}

	let output: any = [];
	const onChange = (e: any) => {
		setsearchData(e.target.value);
		if (hashtag) {
			let check: any[] = Object.keys(hashtag).filter((inputdata) =>
				inputdata.includes(e.target.value)
			);

			for (let cnt = 0; cnt < check.length; cnt++) {
				output[cnt] = {
					name: check[cnt],
					type: "post",
					value: hashtag[check[cnt]],
				};
			}
		}
		if (users) {
			let check: any[] = users.filter((inputdata) =>
				inputdata.includes(e.target.value)
			);

			for (let cnt = 0; cnt < check.length; cnt++) {
				let usersLength = serverData?.users.length || 0;

				let saveAvatar = "";
				let id = 0;
				for (let count = 0; count < usersLength; count++) {
					if (serverData?.users[count].nickname?.toLowerCase() === check[cnt]) {
						if (serverData?.users[count].avatar) {
							saveAvatar = serverData?.users[count].avatar || "";
							id = serverData?.users[count].id || 0;
						} else {
							saveAvatar = "";
							id = 0;
						}

						break;
					}
				}

				output[cnt] = {
					name: check[cnt],
					type: "user",
					id: id,
					avatar: saveAvatar,
				};
			}
		}
		if (e.target.value !== "") setsearchFlag(true);
		else setsearchFlag(false);

		setSearchinput(output);
	};
	const onKeyPress = (e: any) => {
		if (e.key === "Enter") {
			setsearchFlag(false);

			router.push(`/search/${searchData}`);
		}
	};

	const opnUpload = () => {
		setUploadopen(true);
	};
	const closeUpload = () => {
		setUploadopen(false);
	};
	const loginopenFn = () => {
		if (loginopen === false) setLoginopen(true);
		else setLoginopen(false);
	};
	useEffect(() => {
		const naver = (window as any).naver;
		let naverLogin: any;
		// http://localhost:3000
		// https://reef-nine.vercel.app
		const login = () => {
			naverLogin = new naver.LoginWithNaverId({
				clientId: process.env.NEXT_PUBLIC_NAVER_LOGIN_ID, // ClientID
				callbackUrl: "https://reef-nine.vercel.app",
				isPopup: false, // ?????? ????????? ?????? ??????
				loginButton: { color: "green", type: 1, height: 10 },
			});

			naverLogin.init();
		};

		const getToken = () => {
			const hash = Router.asPath.split("#")[1]; // ????????? ???????????? ?????? ???????????? hash ???
			if (hash) {
				const token = hash.split("=")[1].split("&")[0]; // token??? ??????
				if (token) {
					naverLogin.getLoginStatus((status: any) => {
						if (status) {
							// ????????? ?????? ?????? ?????? ??????
							const { age, birthyear, email, gender } = naverLogin.user;
							/*setUserinfo({
								email,
							});*/
							setLoginloading(true);
							loginData({ age, birthyear, email, gender });

							router.push({
								pathname: `/`,
							});
						}
					});
				}
			}
		};

		login();
		getToken();
	}, []);

	const handleNaverLogin = () => {
		if (
			document &&
			document?.querySelector("#naverIdLogin")?.firstChild &&
			window !== undefined
		) {
			const loginBtn: any = document.getElementById("naverIdLogin")?.firstChild;
			loginBtn.click();
		}
	};

	const NaverLogout = async () => {
		await axios.get("/oauth2.0/token", {
			params: {
				grant_type: "delete",
				client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_ID, // Client ID
				client_secret: process.env.NEXT_PUBLIC_NAVER_LOGIN_PASSWORD, // Clietn Secret
				access_token: router.query.token, // ????????? Token ??????
				service_provider: "NAVER",
			},
		});
		loginData("");
		mutate({ ok: true }, false);
	};

	useEffect(() => {
		if (logindataa?.user?.email) {
			mutate(
				{
					ok: true,
					user: { email: logindataa.user.email, id: logindataa.user.id },
				},
				false
			);
			setLoginloading(false);
		}
	}, [logindataa, user]);

	useEffect(() => {
		document.addEventListener("mousedown", clickModalOutside);
		return () => {
			document.removeEventListener("mousedown", clickModalOutside);
		};
	});
	const clickModalOutside = (event: any) => {
		if (!Ref.current.contains(event.target)) setsearchFlag(false);
	};

	useEffect(() => {
		setsearchFlag(false);
	}, [router.asPath]);
	const initdefaultValue = router.asPath.split("/search/")[1]
		? decodeURI(router.asPath.split("/search/")[1])
		: "";
	return (
		<>
			{loginloading ? (
				<Modal.Init>
					<BallTriangle
						height="100"
						width="100"
						color="blue"
						ariaLabel="Loading"
					/>
				</Modal.Init>
			) : (
				""
			)}

			<Header>
				<Reef>
					<Link href={"/"}>
						<a>REEF</a>
					</Link>
				</Reef>
				<SearchTool ref={Ref}>
					<Chk>
						<SearchInput
							required
							type="text"
							onChange={onChange}
							defaultValue={initdefaultValue}
							onKeyPress={onKeyPress}
						/>
						{searchFlag ? (
							<SearchMiniOpen>
								{searchInput
									? searchInput.map((ee: any, i: any) => (
											<>
												{ee.type === "post" ? (
													<Link href={`/search/${ee.name}`} key={i}>
														<a>
															<HashTagBtn>
																<div>#{ee.name}</div>
																<div style={{ display: "flex" }}>
																	{ee.value}
																</div>
															</HashTagBtn>
														</a>
													</Link>
												) : (
													<Link href={`/${ee.id}`} key={i}>
														<a>
															<HashTagBtn>
																<Flex>
																	<HashImg>
																		<Image
																			layout="fill"
																			width={100}
																			height={100}
																			src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${ee?.avatar}/public`}
																		/>
																	</HashImg>
																	<HashImgFont>{ee.name}</HashImgFont>
																</Flex>
															</HashTagBtn>
														</a>
													</Link>
												)}
											</>
									  ))
									: ""}
							</SearchMiniOpen>
						) : (
							""
						)}
					</Chk>
				</SearchTool>
				<Menu>
					<Link href={"/"}>
						<a>
							<HomeSvg />
						</a>
					</Link>

					{user?.user?.email ? (
						<ProfileSvg
							onClick={() => {
								router.push(`/${user?.user.id}`);
							}}
						/>
					) : (
						<ProfileSvg onClick={loginopenFn} />
					)}
					{user?.user?.email ? <UploadSvg onClick={opnUpload} /> : null}
					{user?.user?.email ? (
						<NaverSvg onClick={handleNaverLogin} style={{ display: "none" }} />
					) : (
						<NaverSvg onClick={handleNaverLogin} />
					)}
					{user?.user?.email ? <LogoutSvg onClick={NaverLogout} /> : null}
				</Menu>
			</Header>
			{uploadopen ? (
				<Upload closeModal={closeUpload} userId={user?.user?.id} />
			) : null}
			<LoginModal
				state={loginopen}
				naverCallback={handleNaverLogin}
				loginCallback={loginopenFn}
			/>
		</>
	);
}
