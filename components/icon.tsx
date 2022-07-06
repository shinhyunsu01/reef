import styled from "styled-components";

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

export const Edit = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="#40A940"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M13 5l7 7-7 7M5 5l7 7-7 7"
			/>
		</svg>
	);
};

export const CheckBox = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="#40A940"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M13 5l7 7-7 7M5 5l7 7-7 7"
			/>
		</svg>
	);
};

export const UploadSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
		</svg>
	);
};

export const ProfileSvg = () => {
	return (
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
	);
};

export const HomeSvg = () => {
	return (
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
	);
};

export const LogoutSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="#000"
			strokeWidth="2"
			{...key}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
			/>
		</svg>
	);
};

export const SearchSvg = () => {
	return (
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
	);
};

export const NaverSvg = (key: any) => {
	return (
		<Button.Container>
			<Button.ButtonList>
				<Button.NaverButton src="/naver_white.png" {...key} />
				<div id="naverIdLogin" style={{ display: "none" }} />
			</Button.ButtonList>
		</Button.Container>
	);
};
