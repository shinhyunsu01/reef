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
		body: { answerId, postId, reanswer },
	} = req;

	if (req.method === "GET") {
	}
	if (req.method === "POST") {
		let answer;
		delete req.body.answerNick;
		if (answerId !== null && answerId !== undefined) {
			answer = await client.reAnsWer.create({
				data: {
					user: {
						connect: {
							id: user?.id,
						},
					},
					upload: {
						connect: {
							id: +postId.toString(),
						},
					},
					answer: {
						connect: {
							id: +answerId.toString(),
						},
					},
					reanswer,
				},
			});
		} else {
			delete req.body.reanswer;
			answer = await client.answer.create({
				data: {
					user: {
						connect: {
							id: user?.id,
						},
					},
					upload: {
						connect: {
							id: +postId.toString(),
						},
					},
					answer: reanswer,
				},
			});
		}
		//await res.revalidate(`/${req.query?.id}`);

		res.json({
			ok: true,
			answer,
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
