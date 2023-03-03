import { InfiniteQueryConfig } from '@/application/react-query';
import { GetPeopleResponse, processPerson, swapi } from '@/application/swapi';
import {
	QueryFunctionContext,
	QueryKey,
	useInfiniteQuery,
} from '@tanstack/react-query';

function getQueryKey(searchValue?: string): QueryKey {
	// Build a key that contains the `searchValue` so the query
	// properly revalidates when the search changes.
	const key: any[] = ['people'];
	if (searchValue != null && searchValue.length > 0)
		key.push({ searchValue });

	return key;
}

function getQueryFn(
	context: QueryFunctionContext<QueryKey, any>,
	searchValue?: string
): Promise<ResponseType> {
	return swapi.getPeople(searchValue, context.pageParam);
}
type ResponseType = GetPeopleResponse;
type QueryFnType = typeof getQueryFn;

/**
 * Fetch people
 * @returns QueryFnType
 */
export function useFetchPeople({ config, searchValue }: UseFetchPeopleOptions) {
	return useInfiniteQuery({
		...config,
		onSuccess(data) {
			data.pages = data.pages.map((page) => {
				page.results = page.results.map((p) => processPerson(p));
				return page;
			});
		},
		queryKey: getQueryKey(searchValue),
		queryFn: (context) => getQueryFn(context, searchValue),
		getNextPageParam: (lastPage) =>
			lastPage.next ? lastPage.next : undefined,
	});
}
type UseFetchPeopleOptions = {
	config?: InfiniteQueryConfig<QueryFnType>;
	searchValue?: string;
};
