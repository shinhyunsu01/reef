import { AnyAaaaRecord } from "dns";
import styled from "styled-components";

const Button = {
	Container: styled.div``,

	ButtonList: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
	`,

	NaverButton: styled.img`
		cursor: pointer;
		width: 30px;
	`,
};

export const Edit = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			width="1.5rem"
			height="1.5rem"
			strokeWidth="2"
			{...key}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	);
};

export const EditArrow = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5rem"
			height="1.5rem"
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

export const Save = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.75rem"
			height="1.75rem"
			viewBox="0 0 20 20"
			fill="#40A940"
			{...key}
		>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	);
};
export const CheckBox = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5rem"
			height="1.5rem"
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

export const UploadSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5rem"
			height="1.5rem"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
			{...key}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
		</svg>
	);
};

export const ProfileSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.75rem"
			height="1.75rem"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
			{...key}
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

export const HomeSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.75rem"
			height="1.75rem"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
			{...key}
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
			width="1.5rem"
			height="1.5rem"
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

export const SearchSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
			{...key}
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

export const CloseSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5rem"
			height="1.5rem"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
			{...key}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	);
};

export const EditPlusBtn = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="2.5rem"
			height="2.5rem"
			viewBox="0 0 20 20"
			fill="#40A940"
			{...key}
		>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const UploadBtnSvg = (key: any) => {
	return (
		<svg
			width="3rem"
			height="3rem"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 48 48"
			aria-hidden="true"
			{...key}
		>
			<path
				d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const DeleteBtnSvg = (key: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5rem"
			height="1.5rem"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
			/>
		</svg>
	);
};
