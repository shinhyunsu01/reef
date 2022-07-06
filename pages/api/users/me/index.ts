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
				id: req.session.user?.id,
			},
		});
		res.json({
			ok: true,
			user,
		});
	}
	if (req.method === "POST") {
		const {
			body: { age, birthyear, email, gender },
		} = req;
		if (email != "") {
			user = await client.user.upsert({
				where: {
					email,
				},
				create: {
					email,
					age,
					birthyear,
					gender,
				},
				update: {},
			});
			req.session.user = {
				id: user.id,
			};
			console.log("create", user);
			await req.session.save();
		} else {
			delete req.session.user;
			await req.session.save();
		}
		res.json({
			ok: true,
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
