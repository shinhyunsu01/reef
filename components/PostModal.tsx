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
	padding: 0 10px;
	overflow: auto;
`;
const Flex = styled.div`
	display: flex;
	align-items: center;
`;
const NickName = styled.div`
	font-size: 22px;
	font-weight: bold;
`;
const Kind = styled.span`
	font-size: 12px;
	padding: 4px 4px;

	margin: 4px 8px;
	border-radius: 5px;
	color: white;
	background-color: rgba(46, 142, 155, 0.7);
`;
const PostText = styled.div`
	padding: 10px 30px;
	border-bottom-width: 2px;
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
						width={300}
						height={300}
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${post.data?.postavatar}/public`}
					/>
				</UploadModal>
				<UploadModal>
					<Flex>
						<ShowAvatar
							data={post.data.avatar}
							layout="responsive"
							width={100}
							height={100}
						/>
						<NickName>
							{post.data.nickname}
							<Flex>
								{post.data.animateType ? (
									<Kind>{post.data.animateType}</Kind>
								) : (
									""
								)}
								{post.data.coralType ? <Kind>{post.data.coralType}</Kind> : ""}
								{post.data.hashtag
									? post.data.hashtag
											.split(",")
											.map((hash: any) => <Kind>{hash}</Kind>)
									: ""}
							</Flex>
						</NickName>
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
