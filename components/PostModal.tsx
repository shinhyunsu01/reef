import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import useMutation from "../libs/client/useMutation";
import { Close, CloseSvg, DeleteBtnSvg, Edit, Reply, UploadSvg } from "./icon";
import { Com, Modal } from "./styles/styledCom";
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

	margin-left: 10px;
	overflow: scroll;
	//overflow-x: scroll;
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
	flex-direction: column;
	//align-items: center;

	font-weight: bold;
	font-size: 10px;
`;

const AnswerInput = styled.input`
	outline: none;
	width: 100%;
	margin-left: 10px;
`;
const AnswerInputFrame = styled.div`
	margin-top: auto;
	display: flex;
	font-size: 12px;
`;
const AnswerBtn = styled.div`
	margin-left: auto;
	cursor: pointer;
`;

const AnswerFrame = styled.div`
	display: flex;
	align-items: center;

	:hover {
		border-radius: 5px;
		background-color: rgba(46, 142, 155, 0.2);
	}
`;

const PostModal = ({ handler, post, user }: any) => {
	const router = useRouter();

	const {
		data: dataSwr,
		mutate,
		error,
	} = useSWR(`/api/post/${post?.data?.postId}`);
	console.log("swr", dataSwr);
	//console.log("user", user);
	const inputRef = useRef("");
	const modalRef = useRef<any>(null);
	const [editState, setEditState] = useState(false);
	const [edittext, seteditText] = useState("");
	const [reanswerPosition, setreanswerPosition] = useState({
		answerId: null,
		answerNick: null,
		keyIndex: 0,
	});

	const [uploadFn] = useMutation("/api/users/me/upload");
	const [answerFn, { data, loading }] = useMutation(
		`/api/users/answer/${router.query?.id}`
	);

	useEffect(() => {
		document.addEventListener("mousedown", clickModalOutside);

		return () => {
			document.removeEventListener("mousedown", clickModalOutside);
		};
	});
	const clickModalOutside = (event: any) => {
		if (post.isLoading) {
			if (!modalRef.current.contains(event.target)) {
				setreanswerPosition({ answerId: null, answerNick: null, keyIndex: 0 });
				handler();
			}
		}
	};

	const postHandler = (e: any) => {
		let today = new Date();
		let now = today.toLocaleString().substr(0, 11);
		let nowTime = now.replaceAll(". ", "-");
		console.log("why", e.target.id);
		if (e.target.id === "edit") {
			if (editState) setEditState(false);
			else setEditState(true);
		}
		if (e.target.id === "delete") {
			handler();
			uploadFn({ postId: post.data.postId, delete: true });
		}
		if (e.target.id === "answer") {
			if (
				reanswerPosition?.answerId !== null &&
				reanswerPosition?.answerId !== 0
			) {
				let answerCopy = dataSwr?.post.Answer || "";
				answerCopy[reanswerPosition?.keyIndex] = {
					...answerCopy[reanswerPosition?.keyIndex],
					ReAnsWer: [
						...answerCopy[reanswerPosition?.keyIndex].ReAnsWer,
						{
							reanswer: inputRef.current,
							user: {
								nickname: user.nickname,
								avatar: user.avatar,
							},
							updatedAt: nowTime,
						},
					],
				};
				mutate(
					(prev: any) =>
						prev && {
							...prev,
							post: {
								Answer: answerCopy,
							},
						},
					false
				);

				answerFn({
					postId: post.data.postId,
					answerId: reanswerPosition?.answerId,
					reanswer: inputRef.current,
				});
			} else {
				mutate(
					(prev: any) =>
						prev && {
							...prev,
							post: {
								...prev.post,
								Answer: [
									...prev.post.Answer,
									{
										answer: inputRef.current,
										user: {
											nickname: user.nickname,
											avatar: user.avatar,
										},
										updatedAt: nowTime,
									},
								],
							},
						},
					false
				);
				answerFn({ postId: post.data.postId, reanswer: inputRef.current });
			}
		}
	};

	const editBtnHandler = () => {
		uploadFn({ postId: post.data.postId, description: edittext });
		setEditState(false);
	};

	if (!post.isLoading) return <div ref={modalRef}></div>;

	const inputAnswerOnChange = (e: any) => {
		inputRef.current = e.target.value;
	};

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
									data={dataSwr?.post?.avatar}
									layout="fill"
								/>
							</PicTitle>

							<Nickname>{dataSwr?.post?.user?.nickname}</Nickname>
						</RowFlex>
						<HashTag>
							{dataSwr?.post?.animateType ? (
								<Kind>{dataSwr?.post?.animateType}</Kind>
							) : (
								""
							)}
							{dataSwr?.post?.coralType ? (
								<Kind>{dataSwr?.post?.coralType}</Kind>
							) : (
								""
							)}
							{dataSwr?.post?.hashtag !== "" &&
							dataSwr?.post?.hashtag !== null &&
							dataSwr?.post?.hashtag !== undefined
								? dataSwr?.post?.hashtag
										.split(",")
										.map((hash: any, i: any) => <Kind key={i}>{hash}</Kind>)
								: ""}
						</HashTag>
						{editState ? (
							<>
								<TextPost
									defaultValue={dataSwr?.post?.description}
									placeholder={dataSwr?.post?.description}
									onChange={(e: any) => seteditText(e.target.value)}
								/>
								<Com.Center>
									<UploadBtn onClick={editBtnHandler}>Save</UploadBtn>
								</Com.Center>
							</>
						) : (
							<PostText>
								{edittext ? edittext : dataSwr?.post?.description}
							</PostText>
						)}

						<Creadted>{dataSwr?.post?.created?.substring(0, 10)}</Creadted>

						<AnswerFlex>
							{dataSwr?.post?.Answer
								? dataSwr.post.Answer.map((answerUser: any, i: any) => (
										<div key={i}>
											<AnswerFrame style={{ marginBottom: "10px" }}>
												<ShowAvatar
													avatar="true"
													data={answerUser.user.avatar}
													layout="fixed"
													width={30}
													height={30}
													size="sm"
												/>

												<Com.FlexColumn>
													<Com.Flex>
														<div style={{ marginRight: "20px" }}>
															{answerUser.user.nickname}
														</div>

														<div style={{ fontWeight: "normal" }}>
															{answerUser.answer}
														</div>
													</Com.Flex>

													<Com.Flex>
														<div
															style={{ color: "#808080", marginRight: "20px" }}
														>
															{answerUser.updatedAt.substring(0, 10)}
														</div>

														<Reply
															onClick={() =>
																setreanswerPosition({
																	answerId: answerUser.id,
																	answerNick: answerUser.user.nickname,
																	keyIndex: i,
																})
															}
														/>
													</Com.Flex>
												</Com.FlexColumn>
											</AnswerFrame>
											{/*re answer */}
											{answerUser.ReAnsWer?.map((reanswer: any, i: any) => (
												<Com.FlexAliCenter
													style={{ marginBottom: "10px", marginLeft: "20px" }}
													key={i}
												>
													<ShowAvatar
														avatar="true"
														data={reanswer.user.avatar}
														layout="fixed"
														width={30}
														height={30}
														size="sm"
													/>

													<Com.FlexColumn>
														<Com.Flex>
															<div style={{ marginRight: "20px" }}>
																{reanswer.user.nickname}
															</div>

															<div style={{ fontWeight: "normal" }}>
																{reanswer.reanswer}
															</div>
														</Com.Flex>
														<Com.Flex>
															<div
																style={{
																	color: "#808080",
																	marginRight: "20px",
																}}
															>
																{reanswer.updatedAt.substring(0, 10)}
															</div>
														</Com.Flex>
													</Com.FlexColumn>
												</Com.FlexAliCenter>
											))}
										</div>
								  ))
								: ""}
						</AnswerFlex>

						<AnswerInputFrame>
							{reanswerPosition?.answerNick ? (
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<div>{reanswerPosition?.answerNick}</div>
									<Close
										style={{ marginBottom: "13px", cursor: "pointer" }}
										onClick={() =>
											setreanswerPosition({
												answerId: null,
												answerNick: null,
												keyIndex: 0,
											})
										}
									/>
								</div>
							) : (
								""
							)}
							<AnswerInput
								placeholder="댓글 입력..."
								onChange={inputAnswerOnChange}
							></AnswerInput>
							<AnswerBtn>
								<UploadSvg id="answer" onClick={postHandler} />
							</AnswerBtn>
						</AnswerInputFrame>
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
