import { ApiError } from '@/application/axios';
import {
	DefaultOptions,
	QueryClient,
	QueryClientProvider,
	QueryKey,
	UseInfiniteQueryOptions,
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
	queries: {
		refetchOnWindowFocus: false,
		retry: false,
	},
};
export const queryClient = new QueryClient({ defaultOptions: queryConfig });
export { QueryClientProvider };

export type QueryInfoType = {
	queryKey: QueryKey;
	url: string;
};

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
	ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
	UseQueryOptions<ExtractFnReturnType<QueryFnType>, ApiError>,
	'queryKey' | 'queryFn'
>;

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> =
	Omit<
		UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>, ApiError>,
		'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
	>;
