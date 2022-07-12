import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

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
	} = req;
	if (req.method === "GET") {
	}
	if (req.method === "POST") {
		const post = await client?.uploadInfo.create({
			data: {
				...req.body,
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});
		console.log("upload ok");
		res.json({
			ok: true,
			post,
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
