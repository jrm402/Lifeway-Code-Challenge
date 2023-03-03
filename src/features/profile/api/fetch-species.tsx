import { QueryConfig } from '@/application/react-query';
import { GetSpeciesResponse, processSpecies, swapi } from '@/application/swapi';
import {
	QueryFunctionContext,
	QueryKey,
	useQueries,
	useQuery,
} from '@tanstack/react-query';

function getQueryKey(id: string): QueryKey {
	return ['species', id];
}

function getQueryFn(
	_context: QueryFunctionContext<QueryKey, any>,
	id: string
): Promise<ResponseType> {
	return swapi.getSpecies(id);
}
type ResponseType = GetSpeciesResponse;
type QueryFnType = typeof getQueryFn;

/**
 * Fetch species
 * @returns QueryFnType
 */
export function useFetchSpecies({ config, id }: UseFetchSpeciesOptions) {
	return useQuery({
		...config,
		onSuccess(data) {
			return processSpecies(data);
		},
		queryKey: getQueryKey(id),
		queryFn: (context) => getQueryFn(context, id),
	});
}
export function useFetchSpeciesArray(options: UseFetchSpeciesOptions[]) {
	return useQueries({
		queries: options.map(({ config, id }) => ({
			...config,
			onSuccess(data: ResponseType) {
				return processSpecies(data);
			},
			queryKey: getQueryKey(id),
			queryFn: (context: QueryFunctionContext<QueryKey, any>) =>
				getQueryFn(context, id),
		})),
	});
}
type UseFetchSpeciesOptions = {
	config?: QueryConfig<QueryFnType>;
	id: string;
};
