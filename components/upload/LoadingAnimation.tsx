import React from "react";
import styled from "styled-components";
import { Com } from "../styledCom";
// 42
const Svg = styled.svg`
	position: relative;

	width: 35px;
	height: 35px;
	animation: rotate 2s linear infinite;
	//background-color: red;
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
const Circle = styled.circle`
	width: 100%;
	height: 100%;
	fill: none;
	stroke-width: 5;
	stroke: #00a1ff;
	stroke-linecap: round;
	transform: translate(5px, 5px);
	stroke-dasharray: 440;
	stroke-dashoffset: 440;
	animation: animate 1s linear infinite;

	@keyframes animate {
		0%,
		100% {
			stroke-dashoffset: 440;
		}
		50% {
			stroke-dashoffset: 0;
		}
		50.1% {
			stroke-dashoffset: 880;
		}
	}
`;

const LoadingAnimation = () => {
	return (
		<Com.Center>
			<Svg>
				<Circle cx="13" cy="13" r="13" />
			</Svg>
		</Com.Center>
	);
};

// 70 13

export default LoadingAnimation;
/*


const Svg = styled.svg`
	position: relative;

	width: 150px;
	height: 150px;
	animation: rotate 2s linear infinite;

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
const Circle = styled.circle`
	width: 100%;
	height: 100%;
	fill: none;
	stroke-width: 10;
	stroke: #00a1ff;
	stroke-linecap: round;
	transform: translate(5px, 5px);
	stroke-dasharray: 440;
	stroke-dashoffset: 440;
	animation: animate 4s linear infinite;
	background-color: red;
	@keyframes animate {
		0%,
		100% {
			stroke-dashoffset: 440;
		}
		50% {
			stroke-dashoffset: 0;
		}
		50.1% {
			stroke-dashoffset: 880;
		}
	}
`;

*/
