import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cloudFlareUpload } from "../../libs/client/cloudFlareUpload";
import useMutation from "../../libs/client/useMutation";
import { CloseSvg, UploadBtnSvg } from "../icon";
import Btn from "./Btn";
import { Com } from "../styledCom";
import LoadingAnimation from "./LoadingAnimation";

const OpenUpload = styled(Com.Center)`
	z-index: 200;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	background-color: rgba(0, 0, 0, 0.6);
`;
const Uploadflex = styled(Com.Center)`
	width: 80%;
	padding: 1.2rem 1.2rem;
	min-height: 200px;
	overflow: auto;
	height: 60%;
	background-color: #fff;
	border-radius: 20px;

	justify-content: space-between;
	position: relative;
`;

const UploadModal = styled.div`
	flex-grow: 1;
	flex-flow: row wrap;
	height: 100%;
	width: 50%;
`;

const UploadImg = styled(Com.Center)`
	height: 100%;
	width: 100%;
	padding: 10px;
	border-width: 2px;
	border-style: dashed;
	border-radius: 20px;
`;

const UploadForm = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px;
	position: relative;
`;

const TextPost = styled.textarea`
	margin-top: 1rem;
	width: 100%;

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

const UploadBtn = styled.div`
	width: 50%;
	height: 35px;
	border-radius: 20px;
	background-color: black;
	color: white;
	text-align: center;
	cursor: pointer;

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
	const [avatarPreview, setAvatarPreview] =
		useState<{
			preview: string | undefined;
			fileData: object | undefined;
		}>();
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
		isLoading: false,
		error: "",
	});

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
		if (avatarPreview?.fileData != null) {
			const imageId = await cloudFlareUpload(
				uploadURL,
				avatarPreview?.fileData
			);
			uploadFn({ ...selected, avatar: imageId });

			setSelected({
				picType: "",
				animateType: "",
				coralType: "",
				description: "",
				avatar: "",
				isLoading: true,
				error: "",
			});
			router.reload();
		} else {
			setSelected((prev) => ({ ...prev, error: "사진을 선택해주세요" }));
		}
	};
	const fileRead = async (e: React.ChangeEvent) => {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) return;
		const file = input.files[0];
		const readData = URL.createObjectURL(file);
		setAvatarPreview({
			preview: readData,
			fileData: file,
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
									style={{ display: "none" }}
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

						<TextPost
							placeholder="  문구 입력..."
							onChange={onChangefn}
							rows={3}
						/>
						<Com.Center>
							<UploadBtn onClick={onValid}>
								{selected?.error !== "" ? (
									selected.error
								) : selected?.isLoading === true ? (
									<LoadingAnimation />
								) : (
									"Upload..."
								)}
							</UploadBtn>
						</Com.Center>
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
