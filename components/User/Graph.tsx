import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import { Com } from "../styles/styledCom";
import { useRouter } from "next/router";
import useMutation from "../../libs/client/useMutation";
import useSWR from "swr";
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
	width: 50%;
	@media only screen and (max-width: ${({ theme }) => theme.mobile}) {
		width: 100%;
	}
`;
const DropInput = styled.input`
	margin: 0 10px;
	background-color: #fff;
	width: 200px;
	height: 60px;
	box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
	padding-left: 20px;

	@media only screen and (max-width: ${({ theme }) => theme.mobile}) {
		width: 100px;
	}
`;
const SaveBtn = styled.div`
	width: 100px;
	padding: 5px;
	margin: 5px;

	background-color: black;
	color: white;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;
`;

const Graph = ({ user }: any) => {
	//const inputRef = useRef<any>(null);

	const router = useRouter();
	//const options = ["2022-07-02", "2022-07-02", "2022-07-02", "추가"];
	//const waterOptions = ["PH", "소금", "CAL", "추가"];
	const [clientData, setClientData] = useState({
		element: "",
		date: "",
		graphdata: "",
		mode: "create",
	});
	const [useInputText, setuseInputText] = useState("");

	const [graphFn] = useMutation(`/api/graph/${router.query.id}`);
	const { data: useSwrData, mutate } = useSWR(`/api/graph/${router.query.id}`);

	let serverGraph: any[];
	const [showData, setshowData] = useState<any>([
		{
			name: "1ph",
			data: [1],
		},
	]);
	const [xshowData, xsetshowData] = useState<any>([""]);
	const [options, setoptions] = useState<any>([]);
	const [dateoptions, setdateoptions] = useState<any>([]);

	useEffect(() => {
		if (useSwrData?.ok) {
			//문자열을 숫자로 변경
			let xlenMax = 0;
			let totalOptions: any = [];
			serverGraph = useSwrData.graph.map((swrdata: any) => {
				return {
					element: swrdata.element,
					graphdata: swrdata.graphdata?.split(",").map((ee: any) => Number(ee)),
					date: swrdata.date?.split(","),
				};
			});

			//초기에 배열만 있고 데이터가 없을 경우

			setshowData(
				serverGraph.map((swrdata: any) => {
					if (xlenMax < swrdata.date?.length || xlenMax === 0) {
						xlenMax = swrdata.date?.length;
						if (swrdata.date === undefined) {
							xsetshowData([0]);
						} else xsetshowData(swrdata.date);
					}

					totalOptions.push(swrdata.element);
					//if (swrdata.date === undefined) xlenMax = 0;
					//else xlenMax = swrdata.date?.length;

					if (swrdata?.graphdata === undefined) {
						return {
							name: swrdata.element,
							data: [0],
						};
					} else {
						return {
							name: swrdata.element,
							data: swrdata.graphdata,
						};
					}
				})
			);
			//}
			totalOptions.push("추가");
			setoptions(totalOptions);
		}
	}, [useSwrData]);

	const onClick = (e: any) => {
		let result = showData;
		let xresult = xshowData;

		if (e.target.id === "edit") {
			showData.map((showdata: any, i: any) => {
				if (showdata.name === clientData.element) {
					let flag = false;

					//데이터가 있으면 수정 사항 만 저장
					xresult.map((ee: any, ii: any) => {
						if (ee === clientData.date) {
							result[i].data[ii] = Number(useInputText);
							flag = true;
						}
					});
					//데이터가 없으면 새로 만듬
					if (!flag) {
						result[i].data.push(Number(useInputText));
						xresult.push(clientData.date);
					}

					graphFn({
						element: showdata.name,
						graphdata: result[i].data.toString(),
						date: xresult.toString(),
					});
					setuseInputText("");
				}
			});
			//create
			if (!options.includes(clientData.element)) {
				setshowData((prev: any) => [
					...prev,
					{
						name: clientData.element,
						data: [Number(useInputText)],
					},
				]);

				graphFn({
					element: clientData.element,
					graphdata: useInputText,
					date: clientData.date,
				});
				let remakeOptions = options;
				remakeOptions.pop();
				remakeOptions.push(clientData.element);
				remakeOptions.push("추가");
				if (xshowData.includes(clientData.date) === false) {
					xsetshowData((prev: any) => [...prev, clientData.date]);
				}

				setoptions(remakeOptions);
				setuseInputText("");
			}
		} else if (e.target.id === "del") {
			showData.map((showdata: any, i: any) => {
				if (showdata.name === clientData.element) {
					graphFn({
						element: showdata.name,
						date: clientData.date,
						del: true,
					});
				}
			});
		}
	};

	const onChange = (e: any) => {
		setuseInputText(e.target.value);
	};

	useEffect(() => {
		if (useSwrData) {
			serverGraph = useSwrData?.graph?.map((swrdata: any) => {
				return {
					element: swrdata.element,
					graphdata: swrdata.graphdata?.split(",").map((ee: any) => Number(ee)),
					date: swrdata.date?.split(","),
				};
			});
			serverGraph?.map((swrdata: any) => {
				if (clientData.element === swrdata.element) {
					if (swrdata.date !== undefined) {
						let arr;
						arr = swrdata.date;
						arr.push("추가");
						setdateoptions(arr);
					}
				}
			});
		}

		if (dateoptions.length === 0) {
			setdateoptions(["추가"]);
		}
	}, [clientData]);

	return (
		<>
			<Flex>
				<Chart>
					<ApexChart
						type="line"
						series={showData}
						options={{
							chart: {
								height: "100%",
								width: "100%",
							},
							xaxis: {
								categories: xshowData,
							},
						}}
					/>
				</Chart>
				{user?.id === Number(router?.query?.id) ? (
					<ColFlex>
						<DropFlex>
							<Dropdown
								options={options}
								title="원소"
								size="sm"
								handler={setClientData}
							/>
							<Dropdown
								options={dateoptions}
								title="날짜"
								size=""
								handler={setClientData}
							/>
							<DropInput
								value={useInputText}
								placeholder="데이터"
								onChange={onChange}
							/>
						</DropFlex>
						<Com.Flex>
							<SaveBtn onClick={onClick} id="edit">
								Save
							</SaveBtn>
							<SaveBtn onClick={onClick} id="del">
								Delete
							</SaveBtn>
						</Com.Flex>
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
