import Image from "next/image";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { CloseSvg, DeleteBtnSvg } from "./icon";
import { Modal } from "./styledCom";
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
const LeftModal = styled.div`
	height: 100%;
	width: 50%;
	background-color: rgb(0, 0, 0);
	position: relative;
	border-radius: 20px;
	margin-right: 10px;
	overflow: auto;
`;
const RightModal = styled.div`
	height: 100%;
	width: 50%;
	position: relative;
	border-radius: 20px;
	margin-left: 10px;
	overflow: auto;
`;
const Flex = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 10px;
	border-bottom-width: 2px;
`;
const HashTag = styled.div`
	font-size: 22px;
	width: 100%;
	font-weight: bold;
`;
const Kind = styled.span`
	font-size: 12px;
	text-align: center;
	border-radius: 5px;
	margin-top: 5px;
	margin-right: 5px;
	padding: 2px 5px;
	color: white;
	background-color: rgba(46, 142, 155, 0.7);
`;
const Creadted = styled.div`
	font-size: 7px;
	display: flex;
	justify-content: flex-end;
	border-bottom-width: 2px;
`;
const PostText = styled.div`
	padding: 10px 30px;
	width: 100%;
	font-size: 15px;

	@media only screen and (max-width: ${({ theme }) => theme.mobile}) {
		font-size: 15px;
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
const Nickname = styled.div`
	font-weight: bold;
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

	//console.log(post.data.description.userFlag);
	return (
		<Modal.Init>
			<Frame ref={modalRef}>
				<LeftModal>
					<Image
						layout="fill"
						objectFit="contain"
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${post.data?.postavatar}/public`}
					/>
				</LeftModal>
				<RightModal>
					<Flex>
						<RowFlex>
							<PicTitle>
								<ShowAvatar data={post.data.avatar} layout="fill" />
							</PicTitle>

							<Nickname>{post.data.nickname}</Nickname>
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
					<Creadted>{post.data.created.substring(0, 10)}</Creadted>
				</RightModal>

				<CloseModal>
					{post.data.userFlag ? <DeleteBtnSvg /> : ""}

					<CloseSvg onClick={handler} />
				</CloseModal>
			</Frame>
		</Modal.Init>
	);
};

export default PostModal;
