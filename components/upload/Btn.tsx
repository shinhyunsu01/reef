import React from "react";
import styled from "styled-components";
import UploadLabel from "./Label";
import { Com } from "../styles/styledCom";

const Line = styled(Com.ColCenter)``;

const Title = styled.div`
	display: flex;
	width: 140px;
	font-size: 12px;
	@media all and (max-width: 768px) {
		font-size: 10px;
		width: 40px;
	}
	@media all and (max-width: 480px) {
		font-size: 8px;
		width: 20px;
	}
	@media all and (min-width: 768px) {
		font-size: 16px;
		width: 60px;
	}
`;
const Question = styled(Com.ColCenter)`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

interface BtnInputForm {
	title: string;
	labelName: string;
	textArr: string[];
	handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Btn = ({ title, labelName, textArr, handler }: BtnInputForm) => {
	return (
		<Line>
			<Title>{title}</Title>
			<Question>
				{textArr.map((data, i) => (
					<UploadLabel key={i} name={labelName} text={data} handler={handler} />
				))}
			</Question>
		</Line>
	);
};

export default Btn;
