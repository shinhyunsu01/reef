import React, { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
	input:checked + div {
		color: white;
		background-color: rgb(15, 23, 42);
		border-radius: 0.5rem;
		transition: all 300ms ease;
	}
`;

/*sr-only */
const Input = styled.input`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
`;
const Text = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.25rem;
	height: 2.25rem;
	font-weight: 600;

	@media all and (max-width: 600px) {
		font-size: 8px;
		padding: 0.7rem;
		height: 1rem;
	}
	@media all and (min-width: 600px) and (max-width: 768px) {
		font-size: 10px;
		padding: 0.8rem;
		height: 1rem;
	}
`;

interface labelResponse {
	text: string;
	name: string;
	handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadLabel = ({ name, text, handler }: labelResponse) => {
	return (
		<Label>
			<Input name={name} type="radio" value={text} onChange={handler} />
			<Text>{text}</Text>
		</Label>
	);
};

export default UploadLabel;
