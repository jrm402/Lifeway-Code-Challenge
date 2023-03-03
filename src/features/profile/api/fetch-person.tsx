import { QueryConfig } from '@/application/react-query';
import { GetPersonResponse, processPerson, swapi } from '@/application/swapi';
import {
	QueryFunctionContext,
	QueryKey,
	useQuery,
} from '@tanstack/react-query';

function getQueryKey(id: string): QueryKey {
	return ['people', id];
}

function getQueryFn(
	_context: QueryFunctionContext<QueryKey, any>,
	id: string
): Promise<ResponseType> {
	return swapi.getPerson(id);
}
type ResponseType = GetPersonResponse;
type QueryFnType = typeof getQueryFn;

/**
 * Fetch person
 * @returns QueryFnType
 */
export function useFetchPerson({ config, id }: UseFetchPersonOptions) {
	return useQuery({
		...config,
		onSuccess(data) {
			return processPerson(data);
		},
		queryKey: getQueryKey(id),
		queryFn: (context) => getQueryFn(context, id),
	});
}
type UseFetchPersonOptions = {
	config?: QueryConfig<QueryFnType>;
	id: string;
};
