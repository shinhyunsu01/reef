import styled from "styled-components";

export const Com = {
	Center: styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
	`,
	ColCenter: styled.div`
		display: flex;
		align-items: center;
	`,
};
export const Modal = {
	Init: styled(Com.Center)`
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 200;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		background-color: rgba(0, 0, 0, 0.6);
	`,
	Flex: styled(Com.Center)`
		padding: 1.2rem 1.2rem;
		min-height: 200px;
		overflow: auto;
		background-color: #fff;
		border-radius: 20px;

		justify-content: space-between;
		position: relative;
	`,
};
