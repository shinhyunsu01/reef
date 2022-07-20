import { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import useMutation from "../libs/client/useMutation";

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
import { Com, Modal } from "../components/styledCom";
import Link from "next/link";
import LoginModal from "./LoginModal";
import useSWR from "swr";
import { NextPage } from "next";
import client from "../libs/server/client";

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
	position: absolute;

	cursor: text;
	&:focus-within {
		div {
			display: none;
		}
	}
`;
const SearchInput = styled.input`
	width: 256px;
	outline: 2px solid transparent;
	outline-offset: 2px;
	padding-left: 32px;
	height: 40px;
	border-width: 1px;
	border-radius: 6px;
	background-color: rgb(244 244 246);
	color: rgb(107 114 128);
	&:focus {
		color: black;
		padding-left: 16px;
	}
	@media only screen and (max-width: 500px) {
		width: 150px;
	}
	@media only screen and (max-width: 480px) {
		width: 100px;
	}
	@media only screen and (max-width: 320px) {
		width: 50px;
		margin: 0 10px;

		&:focus {
			z-index: 1000;
			width: 100px;
			color: black;
			padding-left: 16px;
		}
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
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const HashTagBtn = styled.div`
	width: 100%;
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
const SearchMiniOpen = styled.div`
	width: 256px;
	height: 100px;
	overflow: auto;

	margin-top: 150px;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	background-color: rgb(244 244 246);

	@media only screen and (max-width: 500px) {
		width: 150px;
	}
	@media only screen and (max-width: 480px) {
		width: 100px;
	}
	@media only screen and (max-width: 320px) {
		width: 100px;
	}
`;
interface UserInfo {
	age: string;
	birthyear: string;
	email: string;
	gender: string;
}
interface MutationResult {
	ok: boolean;
}

interface SearchResult {
	ok: boolean;
	users: string[];
	hashtags: string[];
}
//const Navbar: NextPage<SearchResult> = ({ users, hashtags }) => {
export default function Navbar() {
	const { user } = useUser();
	const { data: searchData, error } = useSWR<SearchResult>("/api/search");
	const router = useRouter();
	const [uploadopen, setUploadopen] = useState(false);
	const [loginopen, setLoginopen] = useState(false);
	const [userInfo, setUserinfo] = useState<UserInfo>();
	const [searchInput, setSearchinput] = useState([]);
	const [searchFlag, setsearchFlag] = useState(false);
	const [loginData] = useMutation<MutationResult>("/api/users/me");

	let hashtag: any[] = [];
	let hashtagArr;

	if (!(searchData && error)) {
		hashtagArr = searchData?.hashtags
			.map((strData: any) => {
				return strData.hashtag;
			})
			.toString()
			.split(",")
			.map((d: any) => d.slice(1));

		hashtagArr?.forEach((x: any) => {
			hashtag[x] = (hashtag[x] || 0) + 1;
		});
	}

	let output: any = [];
	const onChange = (e: any) => {
		if (hashtag) {
			let check: any[] = Object.keys(hashtag).filter((inputdata) =>
				inputdata.includes(e.target.value)
			);

			for (let cnt = 0; cnt < check.length; cnt++) {
				output[cnt] = {
					name: check[cnt],
					value: hashtag[check[cnt]],
				};
			}
			if (e.target.value != "") setsearchFlag(true);
			else setsearchFlag(false);
			setSearchinput(output);
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
				isPopup: false, // 팝업 형태로 인증 여부
				loginButton: { color: "green", type: 1, height: 10 },
			});

			naverLogin.init();
		};

		const getToken = () => {
			const hash = Router.asPath.split("#")[1]; // 네이버 로그인을 통해 전달받은 hash 값
			if (hash) {
				const token = hash.split("=")[1].split("&")[0]; // token값 확인
				if (token) {
					naverLogin.getLoginStatus((status: any) => {
						if (status) {
							// 로그인 상태 값이 있을 경우
							const { age, birthyear, email, gender } = naverLogin.user;
							setUserinfo({
								age,
								birthyear,
								email,
								gender,
							});

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
		//console.log("logout ok");
		loginData("");

		setUserinfo({
			birthyear: "",
			email: "",
			gender: "",
			age: "",
		});

		await axios.get("/oauth2.0/token", {
			params: {
				grant_type: "delete",
				client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_ID, // Client ID
				client_secret: process.env.NEXT_PUBLIC_NAVER_LOGIN_PASSWORD, // Clietn Secret
				access_token: router.query.token, // 발급된 Token 정보
				service_provider: "NAVER",
			},
		});
	};

	useEffect(() => {
		router.push("/");
	}, [userInfo]);

	return (
		<>
			<Header>
				<Reef>
					<Link href={"/"}>
						<a>REEF</a>
					</Link>
				</Reef>
				<SearchTool>
					<Search>
						<SearchInput required type="text" onChange={onChange} />
						<SearchLogo>
							<SearchSvg />
						</SearchLogo>
					</Search>
					{searchFlag ? (
						<SearchMiniOpen>
							{searchInput
								? searchInput.map((ee: any, i: any) => (
										<Link href={`/search/${ee.name}`} key={i}>
											<a>
												<HashTagBtn>
													<div>#{ee.name}</div>
													<div style={{ display: "flex" }}>{ee.value}</div>
												</HashTagBtn>
											</a>
										</Link>
								  ))
								: ""}
						</SearchMiniOpen>
					) : (
						""
					)}
				</SearchTool>
				<Menu>
					<Link href={"/"}>
						<a>
							<HomeSvg />
						</a>
					</Link>

					{user?.email || userInfo?.email ? (
						<Link href={`/${user?.id}`}>
							<a>
								<ProfileSvg />
							</a>
						</Link>
					) : (
						<ProfileSvg onClick={loginopenFn} />
					)}
					{user?.email || userInfo?.email ? (
						<UploadSvg onClick={opnUpload} />
					) : null}
					{user?.email || userInfo?.email ? (
						<NaverSvg onClick={handleNaverLogin} style={{ display: "none" }} />
					) : (
						<NaverSvg onClick={handleNaverLogin} />
					)}
					{user?.email || userInfo?.email ? (
						<LogoutSvg onClick={NaverLogout} />
					) : null}
				</Menu>
			</Header>
			{uploadopen ? <Upload closeModal={closeUpload} /> : null}
			<LoginModal
				state={loginopen}
				naverCallback={handleNaverLogin}
				loginCallback={loginopenFn}
			/>
		</>
	);
}
