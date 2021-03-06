import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "../../libs/server/withHandler";

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
	const response = await (
		await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CF_ID}/images/v2/direct_upload`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_CF_TOKEN}`,
				},
			}
		)
	).json();

	await res.revalidate("/");
	await res.revalidate(`/${req?.session?.user?.id}`);

	res.json({
		ok: true,
		...response.result,
	});
}

export default withIronSessionApiRoute(
	withHandler({ methods: ["GET", "POST"], handler }),
	{
		cookieName: "reef",
		password: process.env.NEXT_PUBLIC_API_COOKIE!,
	}
);
