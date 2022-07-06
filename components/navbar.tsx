import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import useMutation from "../libs/client/useMutation";
//import useMutation from "../../libs/client/useMutation";

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
`;
const MenuItem = styled.div`
	margin-right: 10px;
`;

const Button = {
	Container: styled.div``,

	ButtonList: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
	`,

	NaverButton: styled.img`
		width: 30px;
	`,
};

const LogOut = styled.div`
	width: 30px;
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
				clientId: "DVT02TWmt7ZH60rqocn2", // ClientID
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
				client_id: "DVT02TWmt7ZH60rqocn2", // Client ID
				client_secret: "8bS83b5YbH", // Clietn Secret
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</SearchLogo>
			</Search>
			<Menu>
				{/* 홈 버튼 */}
				<MenuItem>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
				</MenuItem>
				{/* my 프로파일 이동 */}
				<MenuItem>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						{" "}
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</MenuItem>
				{/*업로드 버튼 */}
				{userInfo?.email ? (
					<MenuItem>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</MenuItem>
				) : null}

				{/* 네이버 로그인 */}
				<MenuItem>
					<Button.Container>
						<Button.ButtonList>
							<Button.NaverButton
								src="/naver_white.png"
								onClick={handleNaverLogin}
							/>
							<div id="naverIdLogin" style={{ display: "none" }} />
						</Button.ButtonList>
					</Button.Container>
				</MenuItem>
				{/* 로그 아웃 */}
				{userInfo?.email ? (
					<MenuItem>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#000"
							strokeWidth="2"
							onClick={NaverLogout}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</MenuItem>
				) : null}
			</Menu>
		</Header>
	);
}
