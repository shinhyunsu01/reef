import { User } from ".prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UserRespones {
	ok: boolean;
	user: User;
}

export default function useUser() {
	const router = useRouter();
	const { data, error } = useSWR<UserRespones>(
		typeof window === "undefined" ? null : "/api/users/me"
	);
	useEffect(() => {
		if (data && !data.ok) {
			router.replace("/");
		}
	}, [data, router]);

	return { user: data?.user, isLoading: !data?.ok && !error };
}
