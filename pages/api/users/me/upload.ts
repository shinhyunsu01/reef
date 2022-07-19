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
	const {
		session: { user },
	} = req;
	if (req.method === "GET") {
	}
	if (req.method === "POST") {
		delete req.body.isLoading;
		delete req.body.error;
		let hashtagStr = "";
		if (req.body?.description) {
			const hashtag = req.body?.description;
			const regexp = /\#[A-Za-z0-9가-힣]+/g; // \s <- 공백
			hashtagStr = hashtag.match(regexp)?.toString();
		}
		const post = await client.uploadInfo.create({
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
		//await res.revalidate("/");
		//await res.revalidate(`/users/${user?.id}`);
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
