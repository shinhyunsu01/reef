import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	let manyUser;
	if (req.method === "GET") {
		manyUser = await client.user.findMany({
			select: {
				id: true,
				nickname: true,
				avatar: true,
				backavatar: true,
			},
		});

		console.log("API manyuser", manyUser);
		res.json({
			ok: true,
			users: manyUser,
		});
	}

	res.status(200).end();
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET"], handler }),
	{
		cookieName: "reef",
		password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD!,
	}
);
