import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

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
	let user;

	if (req.method === "GET") {
		user = await client.user.findUnique({
			where: {
				id: req?.session?.user?.id,
			},
		});
		const post = await client.uploadInfo.findMany({
			where: {
				userId: user?.id,
			},
		});
		res.json({
			ok: true,
			post,
		});
	}
	if (req.method === "POST") {
	}
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET", "POST"], handler }),
	{
		cookieName: "reef",
		password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD!,
	}
);
