import type { NextPage } from "next";

import styled from "styled-components";

const Main = styled.div`
	width: 100%;
	justify-content: center;
	display: flex;
`;

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
`;

const Logo = styled.img`
	height: 36px;
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

const Menu = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Pic = styled.div`
	padding-top: 64px;
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const PicImage = styled.img`
	aspect-ratio: 1 / 1;
	width: 320px;

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
`;

const index = () => {
	return (
		<Main>
			<Header>
				<Logo src="./reef_logo.png" />
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
					<div>
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
					</div>
					<div>
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
					</div>
				</Menu>
			</Header>
			<Pic>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
					<PicImage key={i} src="/reef_img.jpg" />
				))}
			</Pic>
		</Main>
	);
};

export default index;

/*


*/
