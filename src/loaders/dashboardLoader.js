import { getEntries, queryClient } from "../utils/http";

export async function dashboardLoader() {
	const data = await queryClient.fetchQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	return data;
}
