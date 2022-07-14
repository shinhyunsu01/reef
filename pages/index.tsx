import type { NextPage } from "next";

import styled from "styled-components";
import Navbar from "../components/navbar";

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
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
			<Navbar />
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
