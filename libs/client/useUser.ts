import { User } from ".prisma/client";
import useSWR from "swr";

interface UserRespones {
	ok: boolean;
	user: User;
}

export default function useUser() {
	const { data, error } = useSWR<UserRespones>(
		typeof window === "undefined" ? null : "/api/users/me"
	);

	return { user: data?.user, isLoading: !data?.ok && !error };
}
