import { QueryConfig } from '@/application/react-query';
import {
	GetStarshipResponse,
	processStarship,
	swapi,
} from '@/application/swapi';
import {
	QueryFunctionContext,
	QueryKey,
	useQueries,
	useQuery,
} from '@tanstack/react-query';

function getQueryKey(id: string): QueryKey {
	return ['starship', id];
}

function getQueryFn(
	_context: QueryFunctionContext<QueryKey, any>,
	id: string
): Promise<ResponseType> {
	return swapi.getStarship(id);
}
type ResponseType = GetStarshipResponse;
type QueryFnType = typeof getQueryFn;

/**
 * Fetch starships
 * @returns QueryFnType
 */
// export function useFetchStarships({ config, id }: UseFetchStarshipsOptions) {
// 	return useQuery({
// 		...config,
// 		onSuccess(data) {
// 			return processStarship(data);
// 		},
// 		queryKey: getQueryKey(id),
// 		queryFn: (context) => getQueryFn(context, id),
// 	});
// }
export function useFetchStarshipsArray(options: UseFetchStarshipsOptions[]) {
	return useQueries({
		queries: options.map(({ config, id }) => ({
			...config,
			onSuccess(data: ResponseType) {
				return processStarship(data);
			},
			queryKey: getQueryKey(id),
			queryFn: (context: QueryFunctionContext<QueryKey, any>) =>
				getQueryFn(context, id),
		})),
	});
}
type UseFetchStarshipsOptions = {
	config?: QueryConfig<QueryFnType>;
	id: string;
};
