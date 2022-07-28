import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Com } from "./styles/styledCom";

const MainFlex = styled(Com.Flex)`
	height: 50px;
	margin-top: 60px;
	padding: 20 20px;
	border-bottom-width: 1px;
	border-top-width: 1px;
	align-items: center;
`;
const Item = styled.span<any>`
	padding: 5px 15px;
	font-size: 14px;
	cursor: pointer;

	background-color: ${({ color }) => color};
	border-radius: 30px;

	margin: 0 10px;

	&:hover {
		outline-style: solid;
		outline-width: 1px;
		outline-color: #aee4ff;
	}
`;

const Category = () => {
	const item = [
		{ color: "#b6e3e9", value: "All" },
		{ color: "#ffd6da", value: "Fish" },
		{ color: "#d9f1f1", value: "LPS" },
		{ color: "#e1f7e7", value: "SPS" },
	];
	return (
		<MainFlex>
			{item.map((data, i) => (
				<Link key={i} href={`/search/${data.value}`}>
					<a>
						<Item color={data.color}>#{data.value}</Item>
					</a>
				</Link>
			))}
		</MainFlex>
	);
};

export default Category;
