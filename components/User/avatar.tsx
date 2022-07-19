import React from "react";
import styled from "styled-components";

import Image from "Next/image";

const AvatarImage = styled.div`
	height: 4rem;
	width: 4rem;

	margin-right: 0.2rem;
	position: relative;

	border-width: 2px;
	border-radius: 2rem;
	border-style: dashed;

	img {
		border-radius: 1.8rem;
	}
`;
interface inputType {
	data: string | null;
	layout: any;
	width: number;
	height: number;
}
const ShowAvatar = ({ data, layout, width, height }: inputType) => {
	if (!data) {
		return <div></div>;
	}

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
