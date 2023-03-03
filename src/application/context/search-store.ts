import createStore from '@/application/generic-store';

/**
 * Setup store
 */
type SearchStore = {
	searchValue: string;
};

const { StoreProvider, useStore, useUpdateStore } = createStore<SearchStore>({
	searchValue: '',
});

export const SearchStoreProvider = StoreProvider;
export const useSearchStore = useStore;
export const useUpdateSearchStore = useUpdateStore;
