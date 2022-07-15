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
		console.log("get ", req?.session, process.env.NEXT_PUBLIC_API_COOKIE);
		if (req?.session?.user) {
			client.$queryRaw`SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(
				async () => {
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
				}
			);
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
		console.log("post", email, avatar, backavatar);

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
			console.log("check");
			console.log(
				await client.user.findFirst({
					where: {
						email,
					},
				})
			);

			/*user = await client.user.upsert({
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
			});*/
			/*
			req.session.user = {
				id: user.id,
			};
			console.log("save", user);
			await req.session.save();
			console.log("ssesion", req.session.user);*/
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
		password: process.env.NEXT_PUBLIC_API_COOKIE!,
	}
);
