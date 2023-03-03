import {
	useSearchStore,
	useUpdateSearchStore,
} from '@/application/context/search-store';
import { Form, Input } from '@/features/common/elements';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

const Search: Component = () => {
	const initialSearchValue = useSearchStore((state) => state.searchValue);
	const [inputValue, setInputValue] = useState<string>(initialSearchValue);

	const updateSearchStore = useUpdateSearchStore();

	const isSearchEmpty = inputValue.length === 0;

	return (
		<Form onSubmit={onSubmitHandler}>
			<Input
				placeholder="Character search..."
				onChange={searchChangeHandler}
				value={inputValue}
				InputProps={{
					endAdornment: !isSearchEmpty && (
						<InputAdornment position="end">
							<IconButton onClick={clearSearchHandler} edge="end">
								<Icon>close</Icon>
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</Form>
	);

	/**
	 * Clear search button click handler.
	 *
	 * @param evt
	 */
	function clearSearchHandler(evt: React.MouseEvent<HTMLButtonElement>) {
		evt.preventDefault();

		setInputValue('');
		updateSearchStore({
			searchValue: '',
		});
	}

	/**
	 * Search input field change handler.
	 *
	 * @param evt
	 */
	function searchChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
		const { value } = evt.target;

		setInputValue(value);
		if (value.length === 0) {
			updateSearchStore({
				searchValue: value,
			});
		}
	}

	/**
	 * Search form submit handler.
	 * @param evt
	 */
	function onSubmitHandler(evt: React.FormEvent) {
		evt.preventDefault();

		updateSearchStore({
			searchValue: inputValue,
		});
	}
};

export default Search;
