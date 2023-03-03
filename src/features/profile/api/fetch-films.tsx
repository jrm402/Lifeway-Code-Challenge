import { QueryConfig } from '@/application/react-query';
import { GetFilmResponse, processFilm, swapi } from '@/application/swapi';
import {
	QueryFunctionContext,
	QueryKey,
	useQueries,
	useQuery,
} from '@tanstack/react-query';

function getQueryKey(id: string): QueryKey {
	return ['film', id];
}

function getQueryFn(
	_context: QueryFunctionContext<QueryKey, any>,
	id: string
): Promise<ResponseType> {
	return swapi.getFilm(id);
}
type ResponseType = GetFilmResponse;
type QueryFnType = typeof getQueryFn;

/**
 * Fetch films
 * @returns QueryFnType
 */
// export function useFetchFilms({ config, id }: UseFetchFilmsOptions) {
// 	return useQuery({
// 		...config,
// 		onSuccess(data) {
// 			return processFilm(data);
// 		},
// 		queryKey: getQueryKey(id),
// 		queryFn: (context) => getQueryFn(context, id),
// 	});
// }
export function useFetchFilmsArray(options: UseFetchFilmsOptions[]) {
	return useQueries({
		queries: options.map(({ config, id }) => ({
			...config,
			onSuccess(data: ResponseType) {
				return processFilm(data);
			},
			queryKey: getQueryKey(id),
			queryFn: (context: QueryFunctionContext<QueryKey, any>) =>
				getQueryFn(context, id),
		})),
	});
}
type UseFetchFilmsOptions = {
	config?: QueryConfig<QueryFnType>;
	id: string;
};
