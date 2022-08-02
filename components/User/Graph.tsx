import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import { Com } from "../styles/styledCom";
import { useRouter } from "next/router";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Flex = styled.div`
	width: 100%;
	display: flex;
	//justify-content: space-between;
	justify-content: center;
	align-items: center;
	@media only screen and (max-width: ${({ theme }) => theme.mobile}) {
		flex-direction: column;
	}
`;
const ColFlex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const DropFlex = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const Chart = styled.div`
	width: 100%;
`;
const DropInput = styled.input`
	margin: 0 10px;
	background-color: #fff;
	width: 200px;
	height: 60px;
	box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
	padding-left: 20px;
`;
const SaveBtn = styled.div`
	padding: 5px;
	width: 70%;

	background-color: black;
	color: white;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;
`;

const Graph = ({ user }: any) => {
	const router = useRouter();
	const options = ["2022-07-02", "2022-07-02", "2022-07-02", "추가"];
	const waterOptions = ["PH", "소금", "CAL", "추가"];
	const [data, setData] = useState({
		element: "",
		date: "",
		data: "",
	});

	useEffect(() => {
		console.log("data", data);
	}, [data]);
	console.log("rerender", user);
	return (
		<>
			<Flex>
				<Chart>
					<ApexChart
						type="line"
						series={[
							{
								name: "hello",
								data: [1, 2, 3, 4, 5, 6],
							},
							{
								name: "aello",
								data: [6, 5, 4, 3, 2, 1],
							},
						]}
						options={{
							chart: {
								height: "100%",
								width: "100%",
							},
						}}
					/>
				</Chart>
				{user?.id === Number(router?.query?.id) ? (
					<ColFlex>
						<DropFlex>
							<Dropdown
								options={waterOptions}
								title="원소"
								size="sm"
								handler={setData}
							/>
							<Dropdown
								options={options}
								title="날짜"
								size=""
								handler={setData}
							/>
							<DropInput placeholder="데이터" />
						</DropFlex>
						<SaveBtn>Save...</SaveBtn>
					</ColFlex>
				) : (
					""
				)}
			</Flex>
		</>
	);
};

export default Graph;
/*
<div style={{ width: "50%" }}>
				<ApexChart
					type="line"
					series={[
						{
							name: "hello",
							data: [1, 2, 3, 4, 5, 6],
						},
						{
							name: "aello",
							data: [6, 5, 4, 3, 2, 1],
						},
					]}
					options={{
						chart: {
							height: "100%",
							width: "100%",
						},
					}}
				/>
			</div>
			<div>adf</div>

*/
