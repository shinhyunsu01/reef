import React from "react";
import styled from "styled-components";

import Image from "next/image";

const AvatarImage = styled.div`
	position: relative;
	height: 4rem;
	width: 4rem;

	margin-right: 0.2rem;

	border-width: 2px;
	border-radius: 4rem;
	border-style: dashed;
	background-color: rgba(0, 0, 0, 0.7);

	img {
		border-radius: 4rem;
	}

	@media only screen and (max-width: 320px) {
		height: 1.5rem;
		width: 1.5rem;
		img {
			border-radius: 1.5rem;
		}
	}
	@media only screen and (max-width: 480px) {
		height: 2.5rem;
		width: 2.5rem;
		img {
			border-radius: 2.5rem;
		}
	}

	div {
		position: absolute;
		height: 4rem;
		width: 4rem;
	}
`;
interface inputType {
	data: string | null;
	layout: any;
	width?: number;
	height?: number;
}
const ShowAvatar = ({ data, layout, width, height }: inputType) => {
	/*if (!data) {
		return <div></div>;
	}*/

	return (
		<AvatarImage>
			<Image
				height={height}
				width={width}
				layout={layout}
				src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data}/public`}
			/>
		</AvatarImage>
	);
};

export default ShowAvatar;
