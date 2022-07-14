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
		
		if (req?.session?.user) {
			user = await client.user.findUnique({
				where: {
					id: req?.session?.user?.id,
				},
				select: {
					id: true,
					email: true,
					age: true,
					birthyear: true,
					gender: true,
					nickname: true,
					avatar: true,
					backavatar: true,
				},
			});
			res.json({
				ok: true,
				user,
			});
		} else {
			
			res.json({
				ok: false,
			});
		}
	}
	if (req.method === "POST") {
		const {
			body: { age, birthyear, email, gender, avatar, backavatar },
		} = req;

		if (avatar || backavatar) {
			user = await client.user.findUnique({
				where: {
					id: req?.session?.user?.id,
				},
			});
			await client.user.update({
				where: {
					id: user?.id,
				},
				data: {
					avatar,
					backavatar,
				},
			});
		} else if (email) {
			
			user = await client.user.upsert({
				where: {
					email,
				},
				create: {
					email,
					age,
					birthyear,
					gender,
					avatar,
					backavatar,
				},
				update: {},
			});
			req.session.user = {
				id: user.id,
			};
			await req.session.save();
		}

		if (req.body === "") {
			
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
		password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD!,
	}
);
