import React from "react";
import styled from "styled-components";
import UploadLabel from "./Label";
import { Com } from "../styledCom";

const Line = styled(Com.ColCenter)``;

const Title = styled.div`
	width: 140px;
	font-weight: 600;
	font-size: 1.125rem;
	line-height: 1.75rem;

	@media all and (max-width: 600px) {
		width: 30px;
		font-size: 0.7rem;
		line-height: 0.7rem;
	}
	@media all and (min-width: 600px) and (max-width: 768px) {
		width: 30px;
		font-size: 0.7rem;
		line-height: 0.7rem;
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
