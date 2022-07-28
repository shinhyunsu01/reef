import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { CloseSvg, NaverSvg } from "./icon";
import { Modal } from "./styles/styledCom";

const PlzLoginModal = styled(Modal.Init)`
	background-color: initial;
`;

const Frame = styled(Modal.Flex)`
	background-color: white;
	width: 30%;
	border-width: 2px;
	font-weight: bold;
	font-size: 42px;
	text-align: center;
	position: absolute;
	flex-direction: column;

	p {
		font-weight: normal;
		padding-bottom: 20px;
		font-size: 13px;
	}

	@media only screen and (max-width: 480px) {
		width: 50%;
		font-size: 22px;
	}
`;
const CloseModal = styled.button`
	position: absolute;
	top: 0;
	right: 0;

	cursor: pointer;
	margin: 10px 10px;
`;

interface inputModal {
	state: boolean;
	naverCallback: () => void;
	loginCallback: () => void;
}
const LoginModal = ({ state, naverCallback, loginCallback }: inputModal) => {
	const modalRef = useRef<any>(null);

	useEffect(() => {
		document.addEventListener("mousedown", clickModalOutside);

		return () => {
			document.removeEventListener("mousedown", clickModalOutside);
		};
	});
	const clickModalOutside = (event: any) => {
		if (state) {
			if (!modalRef.current.contains(event.target)) loginCallback();
		}
	};
	if (!state) return <div ref={modalRef}></div>;
	return (
		<PlzLoginModal>
			<Frame ref={modalRef}>
				<div>로그인</div>
				<p>REEF에 오신걸 환영합니다</p>

				<NaverSvg onClick={naverCallback} style={{ width: "70px" }} />
				<CloseModal>
					<CloseSvg onClick={loginCallback} />
				</CloseModal>
			</Frame>
		</PlzLoginModal>
	);
};

export default LoginModal;
