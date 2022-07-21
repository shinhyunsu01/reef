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
	let info;
	let userInfo;

	if (req.method === "GET") {
		info = await client.aquaInfo.findFirst({
			where: {
				userId: Number(req?.query.id),
			},
		});
		userInfo = await client.user.findFirst({
			where: {
				id: Number(req?.query.id),
			},
		});

		res.json({
			ok: true,
			info,
			userInfo,
		});
	}
	if (req.method === "POST") {
		const {
			session: { user },
		} = req;

		const already = await client.aquaInfo.findFirst({
			where: {
				userId: user?.id,
			},
		});

		if (!already) {
			delete req.body.nickname;
			info = await client.aquaInfo.create({
				data: {
					...req.body,
					user: {
						connect: {
							id: user?.id,
						},
					},
				},
			});
		} else {
			delete req.body.nickname;
			info = await client.aquaInfo.update({
				where: {
					id: already?.id,
				},
				data: {
					...req.body,
				},
			});
		}
		await res.revalidate(`/users/${user?.id}`);
		res.json({
			ok: true,
			info,
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
