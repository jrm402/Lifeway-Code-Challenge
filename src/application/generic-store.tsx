import React, {
	useRef,
	createContext,
	useContext,
	useCallback,
	useSyncExternalStore,
} from 'react';

export default function createStore<Store>(initialState: Store) {
	/**
	 * Take a partial `store` and fill `undefined` values
	 * with default values from `initialState`.
	 */
	function fillDefaultValues(store: Partial<Store> | null): Store {
		const fullStore: Store = initialState;

		if (store == null) return fullStore;

		const keys = Object.keys(fullStore as object);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i] as keyof Store;
			// Note: the value of `store[key]` will not be null or undefined
			// because `Object.hasOwn()` checks if the key exists.
			if (Object.hasOwn(store, key)) fullStore[key] = store[key]!;
		}

		return fullStore;
	}

	/**
	 * Setup `store` data.
	 */
	function useStoreData(): {
		get: () => Store;
		set: (value: Partial<Store>) => void;
		subscribe: (callback: () => void) => () => void;
	} {
		const store = useRef<Store | null>(null);
		const subscribers = useRef(new Set<() => void>());

		const get = useCallback(() => fillDefaultValues(store.current), []);

		const set = useCallback((value: Partial<Store>) => {
			store.current = { ...fillDefaultValues(store.current), ...value };
			subscribers.current.forEach((callback) => callback());
		}, []);

		const subscribe = useCallback((callback: () => void) => {
			subscribers.current.add(callback);
			return () => subscribers.current.delete(callback);
		}, []);

		return {
			get,
			set,
			subscribe,
		};
	}

	type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

	const StoreContext = createContext<UseStoreDataReturnType | null>(null);

	/**
	 * `store` provider.
	 */
	function StoreProvider({ children }: { children: React.ReactNode }) {
		return (
			<StoreContext.Provider value={useStoreData()}>
				{children}
			</StoreContext.Provider>
		);
	}

	/**
	 * Retrieve a `store` value.
	 */
	function useStore<SelectorOutput>(
		selector: (store: Store) => SelectorOutput
	): SelectorOutput {
		const store = useContext(StoreContext);
		if (store == null) {
			throw new Error('Store not found');
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			() => selector(store.get())
		);

		return state;
	}

	/**
	 * Update a `store` value.
	 */
	function useUpdateStore(): (value: Partial<Store>) => void {
		const store = useContext(StoreContext);
		if (store == null) {
			throw new Error('Store not found');
		}

		return store.set;
	}

	return {
		StoreProvider,
		useStore,
		useUpdateStore,
	};
}
