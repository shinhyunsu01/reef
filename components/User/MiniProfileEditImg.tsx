import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { cloudFlareUpload } from "../../libs/client/cloudFlareUpload";
import { EditPlusBtn } from "../icon";
import backInitImg from "../../public/reef_img.jpg";
import ShowAvatar from "./avatar";
import EditImgBtn from "./EditImgBtn";
import { BallTriangle } from "react-loader-spinner";
import { Modal } from "../styles/styledCom";

const BackEditPlus = styled.div<any>`
	z-index: ${({ zindex }) => zindex};
	position: absolute;
	left: 0px;
	top: 0px;
	cursor: pointer;
`;
const BackProfileImg = styled.div`
	img {
		opacity: 30%;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		position: absolute;
	}
`;

const ProfilePic = styled.div`
	height: 8rem;
	width: 8rem;
	border-radius: 8rem;
	position: absolute;
`;
const ProfileImg = styled.div`
	img {
		width: 100%;
		height: 100%;
		border-radius: 8rem;
	}
`;

interface editInputType {
	id: string;
	editOpen: any;
	handler: (data: any) => void;
	userInfo: any;
	editHandler: () => void;
}
const MiniProfileEditImg = ({
	id,
	editOpen,
	userInfo,
	handler,
	editHandler,
}: editInputType) => {
	//const router = useRouter();
	const [preImg, setPreImg] = useState("");
	const [loading, setLoading] = useState(false);

	const fileRead = async (e: React.ChangeEvent) => {
		e.preventDefault();

		const input = e.target as HTMLInputElement;
		if (!input.files?.length) return;
		const file = input.files[0];
		setLoading(true);
		setPreImg(URL.createObjectURL(file));

		const { uploadURL } = await (await fetch("/api/files")).json();
		const imageId = await cloudFlareUpload(uploadURL, file);

		e.target.id === "backImg"
			? handler({ backavatar: imageId })
			: handler({ avatar: imageId });

		editHandler();
		setLoading(false);
	};

	return (
		<>
			{loading ? (
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

			{editOpen ? (
				<>
					<BackEditPlus zindex={10}>
						<EditImgBtn id="backImg" handler={fileRead} />
					</BackEditPlus>

					<ProfilePic>
						<BackEditPlus zindex={50}>
							<EditImgBtn id="profileImg" handler={fileRead} />
						</BackEditPlus>
					</ProfilePic>
				</>
			) : (
				""
			)}
			<BackProfileImg>
				<ShowAvatar
					fillimg="true"
					layout="fill"
					data={preImg}
					initdata={userInfo?.backavatar}
				/>
			</BackProfileImg>

			<ProfilePic>
				<ProfileImg>
					<ShowAvatar
						fillimg="true"
						layout="fill"
						data={preImg}
						initdata={userInfo?.avatar}
					/>
				</ProfileImg>
			</ProfilePic>
		</>
	);
};

export default MiniProfileEditImg;
