import styled from "styled-components";

export const PicBody = styled.div<any>`
	width: 100%;

	margin-top: ${({ margintop }) => margintop};
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
`;

interface styleType {
	prevPage: number;
}

export const Pic = styled.div<styleType>`
	aspect-ratio: 1 / 1;
	transition-property: transform, backdrop-filter;
	transition-duration: 500ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition: transform 1;

	&:hover {
		transform: scale(1.1);
		z-index: 5;
	}

	&:nth-child(3n) {
		transform-origin: right;
	}
	&:nth-child(3n + 1) {
		transform-origin: left;
	}
	&:hover:nth-child(${(props) =>
				props.prevPage === 0 ? 0 : Number(props.prevPage)}) {
		transform: scale(1);
	}

	@media only screen and (max-width: ${({ theme }) => theme.mobile}) {
		&:hover {
			transform: scale(1);
		}
	}
`;
