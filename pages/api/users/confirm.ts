import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import withHandler from "../../../libs/server/withHandler";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {} = req.body;
	console.log(req.session);
	res.status(200).end();
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET"], handler }),
	{
		cookieName: "reef",
		password: process.env.COOKIE_PASSWORD!,
	}
);
