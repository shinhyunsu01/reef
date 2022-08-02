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
		const post = await client.uploadInfo.findFirst({
			where: {
				id: Number(req?.query.id),
			},
			include: {
				user: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
					},
				},
				Answer: {
					select: {
						answer: true,
						updatedAt: true,
						id: true,
						user: {
							select: {
								id: true,
								nickname: true,
								avatar: true,
							},
						},
						ReAnsWer: {
							select: {
								reanswer: true,
								updatedAt: true,
								id: true,
								user: {
									select: {
										id: true,
										nickname: true,
										avatar: true,
									},
								},
							},
						},
					},
				},
			},
		});

		res.json({
			ok: true,
			post,
		});
	}
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET"], handler }),
	{
		cookieName: "reef",
		password: process.env.NEXT_PUBLIC_API_COOKIE!,
	}
);
