import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { cloudFlareUpload } from "../../libs/client/cloudFlareUpload";
import useMutation from "../../libs/client/useMutation";
import { CloseSvg, UploadBtnSvg } from "../icon";
import Btn from "./Btn";

const OpenUpload = styled.div`
	z-index: 15;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Uploadflex = styled.div`
	width: 80%;
	padding: 2rem 2rem;
	height: 60%;
	background-color: #fff;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
`;

const UploadModal = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const UploadImg = styled.div`
	height: 100%;
	width: 100%;
	margin-right: 2rem;
	border-width: 2px;
	border-style: dashed;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
`;

const UploadForm = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const TextPost = styled.textarea`
	margin-top: 1rem;
	width: 100%;
	height: 100%;
	border-width: 2px;
	border-radius: 0.375rem;
	margin-bottom: 20px;
`;

const CloseModal = styled.button`
	position: absolute;

	top: 0;
	right: 0;
	margin: 10px 20px;
	cursor: pointer;
`;
const MemoTip = styled.div`
	padding-bottom: 0.5rem;
	margin-top: -0.5rem;

	font-size: 14px;
	line-height: 20px;

	font-weight: 600;
	color: rgb(100 116 139);
	border-bottom-width: 2px;

	@media all and (max-width: 600px) {
		font-size: 8px;
	}
	@media all and (min-width: 600px) and (max-width: 768px) {
		font-size: 10px;
	}
`;

const UploadBtn = styled.button`
	width: 50%;
	height: 50px;
	border-radius: 20px;
	background-color: black;
	color: white;
	text-align: center;

	&:active {
		border-width: 4px;
		background-color: white;
		color: black;
	}
	@media all and (max-width: 600px) {
		height: 30px;
	}
`;
const PreviewImg = styled.img`
	display: flex;
	height: 80%;
	width: 80%;
	object-fit: fill;
	border-radius: 20px;
`;
interface responseType {
	closeModal: () => void;
}
const Upload = ({ closeModal }: responseType) => {
	const [avatarPreview, setAvatarPreview] = useState({
		preview: "",
		fileData: "",
	});
	const router = useRouter();
	const [uploadFn, { data, loading, error }] = useMutation(
		"/api/users/me/upload"
	);
	const [selected, setSelected] = useState({
		picType: "All",
		animateType: "Fish",
		coralType: "연산호",
		description: "",
		avatar: "",
	});
	// React.ChangeEvent<HTMLInputElement>
	const onChangefn = (e: any) => {
		let data = e.target.value;
		let keyIndex = 0;
		if (data === "All" || data === "Memo") {
			keyIndex = 0;
		} else if (data === "Fish" || data === "Coral") {
			keyIndex = 1;
		} else if (data === "연산호" || data === "SPS" || data === "LPS") {
			keyIndex = 2;
		} else {
			keyIndex = 3;
		}
		setSelected((prev) => ({
			...prev,
			[Object.keys(selected)[keyIndex]]: data,
		}));
	};

	const onValid = async (e: any) => {
		e.preventDefault();

		const { uploadURL } = await (await fetch("/api/files")).json();

		if (avatarPreview.fileData != null) {
			const imageId = await cloudFlareUpload(uploadURL, avatarPreview.fileData);
			uploadFn({ ...selected, avatar: imageId });
		} else uploadFn(selected);

		setSelected({
			picType: "",
			animateType: "",
			coralType: "",
			description: "",
			avatar: "",
		});
		router.reload();
	};
	const fileRead = async (e) => {
		if (!e.target?.files) return;
		const readData = URL.createObjectURL(e.target?.files[0]);
		setAvatarPreview({
			preview: readData,
			fileData: e.target?.files[0],
		});
	};

	return (
		<OpenUpload>
			<Uploadflex>
				{/* 왼쪽 업로드 사진 버튼 */}
				<UploadModal>
					<UploadImg>
						{avatarPreview?.fileData ? (
							<PreviewImg src={avatarPreview?.preview} />
						) : (
							<label>
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={fileRead}
								/>
								<UploadBtnSvg style={{ cursor: "pointer" }} />
							</label>
						)}
					</UploadImg>
				</UploadModal>

				{/* 오른쪽 업로드 form*/}
				<UploadModal>
					<UploadForm>
						<Btn
							title="사진"
							labelName="picType"
							textArr={["All", "Memo"]}
							handler={onChangefn}
						/>
						<MemoTip>
							All : 수조, 2점 이상 | Memo : 1점 에 대한 기록,노하우,메모
						</MemoTip>

						<Btn
							title="Fish or Coral"
							labelName="animateType"
							textArr={["Fish", "Coral"]}
							handler={onChangefn}
						/>

						{selected.animateType === "Coral" ? (
							<Btn
								title="산호 Type"
								labelName="coralType"
								textArr={["연산호", "SPS", "LPS"]}
								handler={onChangefn}
							/>
						) : (
							""
						)}

						<TextPost placeholder="  문구 입력..." onChange={onChangefn} />

						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<UploadBtn onClick={onValid}>Upload...</UploadBtn>
						</div>
					</UploadForm>
				</UploadModal>
				<CloseModal>
					<CloseSvg onClick={closeModal} />
				</CloseModal>
			</Uploadflex>
		</OpenUpload>
	);
};

export default Upload;
