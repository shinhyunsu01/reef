import React from "react";
import styled from "styled-components";
import backInitImg from "../../public/reef_img.jpg";
import Image from "next/image";

const AvatarImage = styled.div<any>`
	position: relative;
	height: ${(props) => (props.size === "sm" ? "35px" : "50px")};

	width: ${(props) => (props.size === "sm" ? "35px" : "50px")};

	margin-right: 0.2rem;

	border-width: 2px;
	border-radius: ${(props) => (props.size === "sm" ? "35px" : "50px")};
	border-style: dashed;
	background-color: rgba(0, 0, 0, 0.7);

	img {
		border-radius: ${(props) => (props.size === "sm" ? "35px" : "50px")};
	}

	/*
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
	}*/
`;

const ShowAvatar = (key: any) => {
	return (
		<>
			{key?.avatar !== undefined ? (
				<>
					{key?.data !== null ? (
						<AvatarImage size={key?.size}>
							<Image
								{...key}
								src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${key.data}/public`}
							/>
						</AvatarImage>
					) : (
						<AvatarImage />
					)}
				</>
			) : (
				""
			)}

			{key?.backavatar !== undefined ? (
				<>
					{key?.data !== null ? (
						<Image
							{...key}
							src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${key.data}/public`}
							priority="true"
						/>
					) : (
						<Image {...key} src={backInitImg} placeholder="blur" />
					)}
				</>
			) : (
				""
			)}

			{key?.fillimg !== undefined ? (
				<>
					{key?.data !== null && key?.data !== "" ? (
						<Image {...key} src={key?.data} />
					) : (
						<Image
							{...key}
							src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${key.initdata}/public`}
						/>
					)}
				</>
			) : (
				""
			)}
		</>
	);
};

export default ShowAvatar;
