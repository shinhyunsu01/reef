import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

import client from "../../../libs/server/client";

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
	if (req.method === "GET") {
		let arr: any = [];
		const path: any = req.query?.pid || "";
		const hashtags = await client.uploadInfo.findMany({
			where: {
				hashtag: {
					not: null,
				},
			},
			include: {
				user: {
					select: {
						avatar: true,
						nickname: true,
					},
				},
			},
		});

		hashtags.map((data) => {
			if (data.hashtag?.includes(path)) {
				arr.push(data);
			}
		});

		res.json({
			ok: true,
			hashtag: arr,
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
