import { User } from ".prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface UserRespones {
	ok: boolean;
	user: User;
}
const fetcher = (url: string) => fetch(url).then((response) => response.json());
export default function useUser() {
	const { data, error } = useSWR<UserRespones>("/api/users/me", fetcher);
	console.log("useuser", data);
	//const router = useRouter();
	/*useEffect(() => {
		if (data?.ok) {
			router.replace("/");
		}
		console.log("useusr receive", data, error);
	}, [data, router]);*/

	return { user: data?.user, isLoading: !data && !error };
}
