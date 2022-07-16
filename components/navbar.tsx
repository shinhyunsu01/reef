import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import useMutation from "../libs/client/useMutation";

import {
	HomeSvg,
	LogoutSvg,
	NaverSvg,
	ProfileSvg,
	SearchSvg,
	UploadSvg,
} from "./icon";
import useUser from "../libs/client/useUser";
import Upload from "./upload/Upload";
import { Com } from "../components/styledCom";
import Link from "next/link";

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
	font-weight: bold;
	font-size: 27px;
	cursor: pointer;
	height: 48px;
`;

const Menu = styled(Com.ColCenter)`
	justify-content: flex-end;
	svg,
	img {
		margin-right: 10px;
		cursor: pointer;
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
export default function Navbar() {
	const { user } = useUser();
	const router = useRouter();
	const [uploadopen, setUploadopen] = useState(false);
	const [userInfo, setUserinfo] = useState<UserInfo>();
	const [loginData] = useMutation<MutationResult>("/api/users/me");

	const opnUpload = () => {
		setUploadopen(true);
	};
	const closeUpload = () => {
		setUploadopen(false);
	};
	useEffect(() => {
		const naver = (window as any).naver;
		let naverLogin: any;
		// http://localhost:3000
		// https://reef-nine.vercel.app/#
		const login = () => {
			naverLogin = new naver.LoginWithNaverId({
				clientId: process.env.NEXT_PUBLIC_NAVER_LOGIN_ID, // ClientID
				callbackUrl: "http://localhost:3000",
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
								pathname: `/users/${user?.id}`,
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
		loginData("");
		if (userInfo)
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
		router.reload();
	};

	return (
		<>
			<Header>
				<Reef onClick={() => router.push("/")}>REEF</Reef>
				<Search>
					<SearchInput required type="text" />
					<SearchLogo>
						<SearchSvg />
					</SearchLogo>
				</Search>
				<Menu>
					<HomeSvg onClick={() => router.push("/")} />
					{user?.email || userInfo?.email ? (
						<Link href={`/users/${user?.id}`}>
							<a>
								<ProfileSvg />
							</a>
						</Link>
					) : (
						<ProfileSvg onClick={() => router.push("/")} />
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
			`{uploadopen ? <Upload closeModal={closeUpload} /> : null}
		</>
	);
}
