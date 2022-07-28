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
		/*
		const newReAnswer = await client.reAnsWer.create({
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
		});*/
		console.log("newReAnswer", req.body);
		/*const newAnswer = await client.answer.create({
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
				answer: answers,
			},
		});
		console.log("ccc", newAnswer, req.body);
		
		res.json({
			ok: true,
			newAnswer,
		});*/
	}
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET", "POST"], handler }),
	{
		cookieName: "reef",
		password: process.env.NEXT_PUBLIC_API_COOKIE!,
	}
);
