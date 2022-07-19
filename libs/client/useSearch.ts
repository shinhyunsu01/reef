import useSWR from "swr";

interface SearctResult {
	ok: boolean;
	users: object;
	hashtags: string[];
}
export default function useSearch() {
	const { data, error } = useSWR<SearctResult>("/api/search");
	console.log(data);
	return { data, isLoading: !data && !error };
}
