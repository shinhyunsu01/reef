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
	let info;
	const {
		session: { user },
	} = req;

	if (req.method === "GET") {
		if (req?.session?.user) {
			info = await client.aquaInfo.findFirst({
				where: {
					userId: user?.id,
				},
			});
			res.json({
				ok: true,
				info,
			});
		} else {
			console.log("get error");
			res.json({
				ok: false,
			});
		}
	}
	if (req.method === "POST") {
		const already = await client.aquaInfo.findFirst({
			where: {
				userId: user?.id,
			},
		});
		if (!already) {
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
			info = await client.aquaInfo.update({
				where: {
					id: already?.id,
				},
				data: {
					...req.body,
				},
			});
		}

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
		password: process.env.COOKIE_PASSWORD!,
	}
);
