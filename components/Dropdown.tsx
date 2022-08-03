import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DownArrow } from "../components/icon";

const Flex = styled.div<any>`
	width: ${({ size }) => (size === "sm" ? "100px" : "200px")};
	margin: 100px 10px;
	position: relative;
`;
const DropdownMenu = styled.div`
	padding: 15px 20px;
	background-color: #fff;
	box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
	font-weight: bold;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;
const DropdownItems = styled.div`
	position: absolute;
	z-index: 5;

	box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
	font-weight: 500;
	color: #333;
	background-color: #fff;
	width: 100%;
`;

const DropdownItem = styled.div`
	padding: 10px;
	cursor: pointer;
`;
const DropdownInput = styled.input`
	width: 100%;
`;

interface DropdownInputType {
	options: string[];
	title: string;
	size: string;
	handler: any;
}

const Dropdown = ({ options, title, size, handler }: DropdownInputType) => {
	const [isActive, setIsActive] = useState(false);
	const [isItem, setIsItem] = useState("");
	const inputRef = useRef<any>(null);
	const Ref = useRef<any>("");

	const onChange = (e: any) => {
		Ref.current = e.target.value;
	};

	useEffect(() => {
		document.addEventListener("mousedown", clickModalOutside);
		return () => {
			document.removeEventListener("mousedown", clickModalOutside);
		};
	}, []);
	const clickModalOutside = (event: any) => {
		if (!inputRef.current?.contains(event.target)) {
			if (Ref.current !== "" && Ref.current !== null) {
				if (title === "원소") {
					handler((prev: any) => ({
						...prev,
						element: Ref.current,
					}));
				} else if (title === "날짜") {
					handler((prev: any) => ({ ...prev, date: Ref.current }));
				}
				Ref.current = null;
			}
			setIsActive(false);
		}
	};

	useEffect(() => {
		if (isItem !== "" && isItem !== "추가") {
			if (title === "원소") {
				handler((prev: any) => ({
					...prev,
					element: isItem,
				}));
			} else if (title === "날짜") {
				handler((prev: any) => ({ ...prev, date: isItem }));
			}
		}
	}, [isItem]);

	return (
		<Flex size={size} ref={inputRef}>
			<DropdownMenu onClick={() => setIsActive(!isActive)}>
				{isItem === "추가" ? (
					<DropdownInput placeholder="추가" onChange={onChange} />
				) : (
					<>{isItem !== "" ? isItem : title}</>
				)}
				<span>
					<DownArrow />
				</span>
			</DropdownMenu>

			{isActive && (
				<DropdownItems>
					{options.map((option, i) => (
						<DropdownItem
							key={i}
							onClick={() => {
								setIsItem(option);
								setIsActive(!isActive);
							}}
						>
							{option}
						</DropdownItem>
					))}
				</DropdownItems>
			)}
		</Flex>
	);
};

export default Dropdown;
