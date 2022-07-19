import useSWR from "swr";

export default function useSearch() {
	const { data, error } = useSWR("/api/search");
	console.log(data);
	return { data, isLoading: !data && !error };
}
