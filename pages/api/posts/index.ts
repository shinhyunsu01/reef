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
		client.$queryRaw`SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(
			async () => {
				manyUser = await client.user.findMany({
					select: {
						id: true,
						nickname: true,
						avatar: true,
						backavatar: true,
					},
				});
				if (manyUser) {
					res.json({
						ok: true,
						users: manyUser,
					});
				} else {
					res.json({
						ok: false,
					});
				}
			}
		);
	}

	res.status(200).end();
}

export default withHandler({ methods: ["GET"], handler });
