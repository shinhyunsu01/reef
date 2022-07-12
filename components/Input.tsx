import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { EditArrow } from "./icon";

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
	itemValue: string | number;
	editEnable: boolean;
	register: UseFormRegisterReturn;
	required?: boolean;
	type: string;
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
const InfoItem = styled.span<any>`
	border-bottom-width: 2px;
	color: gray;
	font-size: 12px;

	text-align: ${(props) => (props.type === "number" ? "center" : null)};

	@media only screen and (max-width: 600px) {
		font-size: 8px;
		line-height: 8px;
	}
	@media only screen and (max-width: 768px) {
		font-size: 6px
		line-height: 6px;
	}
`;

const ReefInput = styled.input`
	appearance: none;
	outline: 2px solid transparent;
	outline-offset: 2px;
	background-color: transparent;

	font-weight: bold;

	&::placeholder {
		color: black;
	}

	border-bottom-color: ${(props) =>
		props.type === "number" && props.disabled === false ? "#40a940" : null};
	border-bottom-width: ${(props) =>
		props.type === "number" && props.disabled === false ? "2px" : null};

	width: ${(props) => (props.type === "number" ? "40px" : null)};
	font-size: ${(props) => (props.type === "number" ? "14px" : null)};
	text-align: ${(props) => (props.type === "number" ? "center" : null)};

	@media only screen and (max-width: 600px) {
		font-size: 0.7rem;
		line-height: 0.7rem;
	}
`;

export default function Input({
	editEnable,
	register,
	required,
	item,
	itemValue,
	type,
}: InputPros) {
	return (
		<Info>
			<InfoItem type={type}>{item}</InfoItem>

			<Item>
				{editEnable === true && type !== "number" ? <EditArrow /> : null}
				<ReefInput
					placeholder={itemValue + ""}
					required={required}
					{...register}
					disabled={!editEnable}
					type={type}
					step={type === "number" ? "0.01" : ""}
				/>
			</Item>
		</Info>
	);
}
