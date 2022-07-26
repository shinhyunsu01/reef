import React from "react";
import styled, { css } from "styled-components";
import { EditPlusBtn } from "../icon";

interface EditImgBtnType {
	id: string;
	handler: (e: React.ChangeEvent) => void;
}
const EditImgBtn = ({ handler, id }: EditImgBtnType) => {
	return (
		<label>
			<input
				type="file"
				accept="image/*"
				style={{ display: "none" }}
				onChange={handler}
				id={id}
			/>
			<EditPlusBtn style={{ cursor: "pointer" }} />
		</label>
	);
};

export default EditImgBtn;
