import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { EditArrow } from "./icon";

interface InputPros {
	item?: string;
	itemValue: string | number;
	editEnable: boolean;
	register: UseFormRegisterReturn;
	required?: boolean;
	type: string;
	db: string | number;
}

const Info = styled.div`
	width: 100%;
	margin-right: 5px;
	display: flex;
	flex-direction: column;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
`;
const InfoItem = styled.div<any>`
	display: flex;
	align-items: center;
	text-align: center;
	border-bottom-width: ${(props) =>
		props.name === "nickname" ? "0px" : "2px"};
	color: gray;
	font-size: 12px;

	text-align: ${(props) => (props.type === "number" ? "center" : null)};

	@media only screen and (max-width: 768px) {
		font-size: 6px;
		line-height: 6px;
	}
	@media only screen and (max-width: 600px) {
		font-size: 6px;
		line-height: 6px;
		margin-bottom: 5px;
		padding-bottom: 5px;
	}
`;

const ReefInput = styled.input`
	width: 100%;
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
		font-size: 8px;
		line-height: 8px;
	}
`;

export default function Input({
	editEnable,
	register,
	required,
	item,
	itemValue,
	type,
	db,
}: InputPros) {
	return (
		<Info>
			<InfoItem type={type} name={db}>
				{item}
			</InfoItem>

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
