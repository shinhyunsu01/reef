import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

import client from "../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method === "GET") {
		const users = await client.user.findMany({
			select: {
				nickname: true,
				avatar: true,
				id: true,
			},
		});
		const hashtags = await client.uploadInfo.findMany({
			where: {
				hashtag: {
					not: "",
				},
			},
			select: {
				hashtag: true,
			},
		});
		if (hashtags && users) {
			res.json({
				ok: true,
				users,
				hashtags,
			});
		} else {
			res.json({
				ok: false,
			});
		}
	}
}

export default withHandler({ methods: ["GET", "POST"], handler });
