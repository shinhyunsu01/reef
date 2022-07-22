import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cloudFlareUpload } from "../../libs/client/cloudFlareUpload";
import useMutation from "../../libs/client/useMutation";
import { CloseSvg, UploadBtnSvg } from "../icon";
import Btn from "./Btn";
import { Com, Modal } from "../styledCom";
import LoadingAnimation from "./LoadingAnimation";
import { BallTriangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ModalFlex = styled(Modal.Flex)`
	width: 80%;
	height: 60%;
`;
const UploadModal = styled.div`
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
	width: 60%;
	height: 100%;
	padding: 5px;
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

	@media all and (max-width: 768px) {
		font-size: 10px;
	}
	@media all and (max-width: 480px) {
		font-size: 8px;
	}
	@media all and (min-width: 768px) {
		font-size: 16px;
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
	userId: number;
}
const Upload = ({ closeModal, userId }: responseType) => {
	const [uploadloading, setuploadloading] = useState(false);
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
		picType: "Memo",
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
		if (data === "All") {
			setSelected((prev) => ({
				...prev,
				picType: "All",
				coralType: "",
				animateType: "",
			}));
		} else {
			setSelected((prev) => ({
				...prev,
				[Object.keys(selected)[keyIndex]]: data,
			}));
		}
	};

	const onValid = async (e: any) => {
		e.preventDefault();
		setuploadloading(true);
		const { uploadURL } = await (await fetch("/api/files")).json();
		if (avatarPreview?.fileData != null) {
			const imageId = await cloudFlareUpload(
				uploadURL,
				avatarPreview?.fileData
			);
			uploadFn({ ...selected, avatar: imageId });
		} else {
			setSelected((prev) => ({ ...prev, error: "사진을 선택해주세요" }));
		}
	};
	useEffect(() => {
		if (uploadloading === true && loading === false) {
			console.log("userId", userId);

			setuploadloading(false);
			setSelected({
				picType: "",
				animateType: "",
				coralType: "",
				description: "",
				avatar: "",
				isLoading: true,
				error: "",
			});
			router.push(`/${userId}`);
			closeModal();
		}
	}, [loading]);
	const fileRead = async (e: React.ChangeEvent) => {
		e.preventDefault();
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
		<Modal.Init>
			{uploadloading ? (
				<Modal.Init>
					<BallTriangle
						height="100"
						width="100"
						color="blue"
						ariaLabel="Loading"
					/>
				</Modal.Init>
			) : (
				""
			)}

			<ModalFlex>
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
							textArr={["Memo", "All"]}
							handler={onChangefn}
						/>
						<MemoTip>
							All : 수조, 2점 이상 | Memo : 1점 에 대한 기록,노하우,메모
						</MemoTip>

						{selected.picType === "Memo" ? (
							<Btn
								title="Fish or Coral"
								labelName="animateType"
								textArr={["Fish", "Coral"]}
								handler={onChangefn}
							/>
						) : (
							""
						)}

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
								{selected?.error !== "" ? selected.error : "Upload..."}
							</UploadBtn>
						</Com.Center>
					</UploadForm>
				</UploadModal>
				<CloseModal>
					<CloseSvg onClick={closeModal} />
				</CloseModal>
			</ModalFlex>
		</Modal.Init>
	);
};

export default Upload;
