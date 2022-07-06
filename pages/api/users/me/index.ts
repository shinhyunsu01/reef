import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../../libs/server/withHandler";

import client from "../../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	let user;
	if (req.method === "POST") {
		const {
			body: { age, birthyear, email, gender },
		} = req;
		if (email) {
			user = await client.user.findUnique({
				where: {
					email,
				},
			});
			if (!user) {
				await client.user.create({
					data: {
						age,
						birthyear,
						email,
						gender,
					},
				});
			}
			console.log(user);
		}
	}

	res.status(200).end();
}

export default withHandler("POST", handler);
