import { UploadInfo } from ".prisma/client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { CloseSvg, NaverSvg } from "./icon";
import { Com, Modal } from "./styledCom";
import ShowAvatar from "./User/avatar";

const Frame = styled(Modal.Flex)`
	position: absolute;

	border-width: 2px;

	width: 70%;
	height: 70%;
	padding: 10px;

	@media only screen and (max-width: 480px) {
		width: 95%;
		height: 50%;
	}
`;
const CloseModal = styled.button`
	position: absolute;
	top: 0;
	right: 0;

	cursor: pointer;
	margin: 10px 10px;
`;
const UploadModal = styled.div`
	height: 100%;
	width: 50%;
	position: relative;
	border-radius: 20px;
	margin: 0 2px;
	overflow: auto;
`;
const Flex = styled.div`
	display: flex;
	flex-direction: column;
`;
const HashTag = styled.div`
	font-size: 22px;
	width: 150px;
	font-weight: bold;
	display: flex;
`;
const Kind = styled.div`
	font-size: 12px;
	width: 100%;
	text-align: center;
	border-radius: 5px;
	margin-top: 5px;
	margin-right: 5px;
	padding: 0px 2px;
	color: white;
	background-color: rgba(46, 142, 155, 0.7);
`;
const PostText = styled.div`
	padding: 10px 30px;
	width: 100%;
	border-bottom-width: 2px;

	@media only screen and (max-width: 480px) {
		width: 150px;
		padding: 10px 5px;
	}
`;

const PicTitle = styled.div`
	display: flex;

	@media only screen and (max-width: 320px) {
	}

	@media only screen and (max-width: 480px) {
	}

	z-index: 1;
`;
const RowFlex = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
`;

const PostModal = ({ handler, post }: any) => {
	const modalRef = useRef<any>(null);

	useEffect(() => {
		document.addEventListener("mousedown", clickModalOutside);

		return () => {
			document.removeEventListener("mousedown", clickModalOutside);
		};
	});
	const clickModalOutside = (event: any) => {
		if (post.isLoading) {
			if (!modalRef.current.contains(event.target)) handler();
		}
	};

	if (!post.isLoading) return <div ref={modalRef}></div>;
	return (
		<Modal.Init>
			<Frame ref={modalRef}>
				<UploadModal>
					<Image
						layout="fill"
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${post.data?.postavatar}/public`}
					/>
				</UploadModal>
				<UploadModal>
					<Flex>
						<RowFlex>
							<PicTitle>
								<ShowAvatar data={post.data.avatar} layout="fill" />
							</PicTitle>
							<div>{post.data.nickname}</div>
						</RowFlex>
						<HashTag>
							{post.data.animateType ? (
								<Kind>{post.data.animateType}</Kind>
							) : (
								""
							)}
							{post.data.coralType ? <Kind>{post.data.coralType}</Kind> : ""}
							{post.data.hashtag
								? post.data.hashtag
										.split(",")
										.map((hash: any, i: any) => <Kind key={i}>{hash}</Kind>)
								: ""}
						</HashTag>
					</Flex>

					<PostText>{post.data.description}</PostText>
				</UploadModal>

				<CloseModal>
					<CloseSvg onClick={handler} />
				</CloseModal>
			</Frame>
		</Modal.Init>
	);
};

export default PostModal;
