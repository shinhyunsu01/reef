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

const Header = styled.div`
	background-color: white;
	top: 0px;
	height: 48px;
	display: flex;
	align-items: center;
	position: fixed;
	justify-content: space-between;
	max-width: 1024px;
	width: 100%;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	z-index: 1000;
`;

const Search = styled.div`
	display: flex;
	position: relative;
	align-items: center;
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
`;

const SearchLogo = styled.div`
	position: absolute;
	padding-left: 8px;
`;

const Reef = styled.div`
	font-weight: bold;
	font-size: 27px;
`;
const Menu = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;

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
export default function Navbar() {
	const router = useRouter();
	const [userInfo, setUserinfo] = useState<UserInfo>();
	const [loginData, { loading, data, error }] = useMutation("/api/users/me");

	useEffect(() => {
		const naver = (window as any).naver;
		let naverLogin: any;

		const login = () => {
			naverLogin = new naver.LoginWithNaverId({
				clientId: process.env.NAVER_LOGIN_ID, // ClientID
				callbackUrl: "http://localhost:3000/", // Callback URL
				isPopup: false, // 팝업 형태로 인증 여부
				loginButton: { color: "green", type: 1, height: 10 },
			});

			naverLogin.init();
		};

		const getToken = () => {
			const hash = Router.asPath.split("#")[1]; // 네이버 로그인을 통해 전달받은 hash 값
			if (hash) {
				const token = hash.split("=")[1].split("&")[0]; // token값 확인
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

						// /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
						Router.push({
							pathname: "/",
							query: {
								token: token,
							},
						});
					}
				});
			}
		};

		login();
		getToken();
	}, []);

	useEffect(() => {
		if (userInfo) loginData(userInfo);
		console.log(loading, data, error);
	}, [userInfo]);

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
		if (userInfo)
			setUserinfo({
				birthyear: "",
				email: "",
				gender: "",
				age: "",
			});

		// 실제 url은 https://nid.naver.com/oauth2.0/token이지만 proxy를 적용하기 위해 도메인은 제거
		const res = await axios.get("/oauth2.0/token", {
			params: {
				grant_type: "delete",
				client_id: process.env.NAVER_LOGIN_ID, // Client ID
				client_secret: process.env.NAVER_LOGIHN_PASSWORD, // Clietn Secret
				access_token: router.query.token, // 발급된 Token 정보
				service_provider: "NAVER",
			},
		});

		if (res) {
			Router.push("/"); // 로그인 페이지로 이동
		}
	};

	return (
		<Header>
			<Reef>REEF</Reef>
			<Search>
				<SearchInput required type="text" />
				<SearchLogo>
					<SearchSvg />
				</SearchLogo>
			</Search>
			<Menu>
				<HomeSvg />
				<ProfileSvg />
				{userInfo?.email ? <UploadSvg /> : null}
				<NaverSvg onClick={handleNaverLogin} />
				{userInfo?.email ? <LogoutSvg onClick={NaverLogout} /> : null}
			</Menu>
		</Header>
	);
}
