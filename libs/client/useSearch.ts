import useSWR from "swr";

export default function useSearch() {
	const { data, error } = useSWR("/api/search");

	return { data, isLoading: !data && !error };
}
