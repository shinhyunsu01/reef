import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import useMutation from "../libs/client/useMutation";
import { CloseSvg, DeleteBtnSvg, Edit, UploadSvg } from "./icon";
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
const CloseModal = styled.div`
	display: flex;

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
	height: 100%;
	flex-direction: column;
	padding-bottom: 10px;
	//border-bottom-width: 2px;

	justify-content: start;
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
	position: relative;

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

const TextPost = styled.textarea`
	margin-top: 1rem;
	width: 100%;

	border-width: 2px;
	border-radius: 0.375rem;
`;

const UploadBtn = styled.span`
	padding: 5px 15px;
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

const AnswerFlex = styled.div`
	margin-top: 5px;
	display: flex;
	align-items: center;

	font-weight: bold;
	font-size: 10px;
`;

const AnswerInput = styled.input`
	outline: none;
`;
const AnswerFrame = styled.div`
	margin-top: auto;
	display: flex;
`;
const AnswerBtn = styled.div`
	margin-left: auto;
	cursor: pointer;
`;

const PostModal = ({ handler, post, user }: any) => {
	const modalRef = useRef<any>(null);
	const [editState, setEditState] = useState(false);
	const [edittext, seteditText] = useState("");
	const [answertext, setanswerText] = useState("");
	const [uploadFn, { data, loading, error }] = useMutation(
		"/api/users/me/upload"
	);
	const [answerFn] = useMutation("/api/users/me/answer");

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
	//console.log("post", post);
	const postHandler = (e: any) => {
		if (e.target.id === "edit") {
			if (editState) setEditState(false);
			else setEditState(true);
		}
		if (e.target.id === "delete") {
			handler();
			uploadFn({ postId: post.data.postId, delete: true });
		}
		if (e.target.id === "answer") {
			//console.log("post.data.postId", post.data.postId);
			answerFn({ postId: post.data.postId, answers: answertext });
		}
		console.log(e.target.id);
	};
	const editBtnHandler = () => {
		uploadFn({ postId: post.data.postId, description: edittext });
		setEditState(false);
	};

	if (!post.isLoading) return <div ref={modalRef}></div>;
	//	console.log("post.data.avatar", post.data);
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
								<ShowAvatar
									avatar="true"
									data={post.data.avatar}
									layout="fill"
								/>
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
						{editState ? (
							<>
								<TextPost
									defaultValue={post.data.description}
									placeholder={post.data.description}
									onChange={(e: any) => seteditText(e.target.value)}
								/>
								<Com.Center>
									<UploadBtn onClick={editBtnHandler}>Save</UploadBtn>
								</Com.Center>
							</>
						) : (
							<PostText>{edittext ? edittext : post.data.description}</PostText>
						)}

						<Creadted>{post.data.created.substring(0, 10)}</Creadted>

						<AnswerFlex>
							{/* 수정 */}
							<ShowAvatar avatar="true" data={post.data.avatar} layout="fill" />

							<div style={{ display: "flex", flexDirection: "column" }}>
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "20px" }}>Reefer</div>
									<div>description</div>
								</div>
								<div>2022-07-00</div>
							</div>
						</AnswerFlex>

						<AnswerFrame>
							<AnswerInput
								placeholder="댓글 입력..."
								onChange={(e: any) => setanswerText(e.target.value)}
							></AnswerInput>
							<AnswerBtn>
								<UploadSvg id="answer" onClick={postHandler} />
							</AnswerBtn>
						</AnswerFrame>
					</Flex>
				</RightModal>

				<CloseModal>
					{!post.data.userFlag ? (
						<>
							<Edit
								onClick={postHandler}
								id="edit"
								style={{ marginRight: "10px" }}
							/>
							<DeleteBtnSvg
								onClick={postHandler}
								id="delete"
								style={{ marginRight: "10px" }}
							/>{" "}
						</>
					) : (
						""
					)}
					<CloseSvg onClick={handler} />
				</CloseModal>
			</Frame>
		</Modal.Init>
	);
};

export default PostModal;
