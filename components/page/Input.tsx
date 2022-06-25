import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { Edit } from "./icon";

/*
interface ReefInput {
	skimmer?: string;
	watertank?: string;
	lamp?: string;
	watermotor?: string;
	temp?: number;
	ph?: number;

	salt?: number;
	alkalinity?: number; //알칼리키 , 경도
	calcium?: number; //칼슘
	mag?: number; //마그네슘

	nitrate?: number; //질산염
	phosphorus?: number; // 인산염
}
*/

interface InputPros {
	item: string;
	itemValue: string;
	editEnable: boolean;
	register: UseFormRegisterReturn;
	required?: boolean;
}

const Info = styled.div`
	margin-right: 5px;
	display: flex;
	flex-direction: column;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
`;
const InfoItem = styled.span`
	border-bottom-width: 2px;
	color: gray;
	font-size: 14px;
`;

const ReefInput = styled.input`
	outline: 2px solid transparent;
	outline-offset: 2px;
	background-color: transparent;

	font-weight: bold;

	&::placeholder {
		color: black;
	}
`;

export default function Input({
	editEnable,
	register,
	required,
	item,
	itemValue,
}: InputPros) {
	return (
		<Info>
			<InfoItem>{item}</InfoItem>
			<Item>
				{editEnable ? null : <Edit />}
				<ReefInput
					placeholder={itemValue}
					required={required}
					{...register}
					disabled={editEnable}
				/>
			</Item>
		</Info>
	);
}
