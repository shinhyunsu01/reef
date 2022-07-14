import { PrismaClient } from ".prisma/client";

declare global {
	var client: PrismaClient | undefined;
}
const client = new PrismaClient();

//if (process.env.NODE_ENV === "development")
//global.client = client;
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
export default client;
