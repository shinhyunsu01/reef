import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

import client from "../../../libs/server/client";

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
		body: { element, graphdata, date, del },
	} = req;
	let graph;
	if (req.method === "GET") {
		graph = await client.graph.findMany({
			where: {
				userId: Number(req?.query.id),
			},
		});

		res.json({
			ok: true,
			graph,
		});
	}
	if (req.method === "POST") {
		const alreay = await client.graph.findFirst({
			where: {
				userId: Number(req?.query.id),
				element,
			},
		});

		if (del === undefined) {
			if (!alreay) {
				graph = await client.graph.create({
					data: {
						user: {
							connect: {
								id: user?.id,
							},
						},
						element,
						graphdata,
						date,
					},
				});
			} else {
				graph = await client.graph.update({
					where: {
						id: alreay.id,
					},
					data: {
						graphdata,
						date,
						element,
					},
				});
			}
		} else if (del === true) {
			let index: number;
			let dateStr = "";
			let dataStr = "";
			if (!(element && date === "")) {
				alreay?.date?.split(",").map((deldate, i) => {
					if (deldate !== date) {
						dateStr += deldate;
					} else {
						index = i;
					}
				});
				alreay?.graphdata?.split(",").map((deldata, i) => {
					if (index !== i) {
						dataStr += deldata;
					}
				});

				graph = await client.graph.update({
					where: {
						id: alreay?.id,
					},
					data: {
						graphdata: dataStr,
						date: dateStr,
						element,
					},
				});
			} else {
				graph = await client.graph.delete({
					where: {
						id: alreay?.id,
					},
				});
			}
		}
		res.json({
			ok: true,
			graph,
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
