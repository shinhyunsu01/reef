import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

import client from "../../../../libs/server/client";

declare module "iron-session" {
	interface IronSessionData {
		user?: {
			id: number;
		};
	}
}

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	let post;
	let findpost;
	const {
		session: { user },
	} = req;

	if (req.method === "GET") {
	}
	if (req.method === "POST") {
		if (req.body.postId) {
			findpost = await client.uploadInfo.findFirst({
				where: {
					id: req?.body?.postId,
				},
			});
		}

		delete req.body?.postId;
		delete req.body?.isLoading;
		delete req.body?.error;
		let hashtagStr = "";
		if (req.body?.description) {
			const hashtag = req.body?.description;
			const regexp = /\#[A-Za-z0-9가-힣]+/g; // \s <- 공백
			hashtagStr = hashtag.match(regexp)?.toString();
		}
		if (findpost) {
			if (req.body.delete) {
				await client.uploadInfo.delete({
					where: {
						id: findpost.id,
					},
					select: {
						id: true,
						userId: true,
					},
				});
			} else {
				post = await client.uploadInfo.update({
					where: {
						id: findpost.id,
					},
					data: {
						hashtag: hashtagStr,
						description: req?.body?.description,
					},
				});
			}
		} else {
			post = await client.uploadInfo.create({
				data: {
					...req.body,
					hashtag: hashtagStr,
					user: {
						connect: {
							id: user?.id,
						},
					},
				},
			});
		}

		await res.revalidate(`/${user?.id}`);
		//await res.revalidate("/");
		res.json({
			ok: true,
			post,
		});
	}
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET", "POST"], handler }),
	{
		cookieName: "reef",
		password: process.env.NEXT_PUBLIC_API_COOKIE!,
	}
);
