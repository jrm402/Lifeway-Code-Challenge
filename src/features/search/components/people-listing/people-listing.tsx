import { useSearchStore } from '@/application/context/search-store';
import { Button, Div, Grid, GridItem } from '@/features/common/elements';
import Loading from '@/features/common/loading';
import { useFetchPeople } from '@/features/search/api/fetch-people';
import Person from '@/features/search/components/people-listing/person';
import styles from './people-listing.module.css';

const PeopleListing: Component = () => {
	const searchValue = useSearchStore((store) => store.searchValue);
	const {
		data,
		isLoading,
		isError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useFetchPeople({
		searchValue,
	});

	// loading and error states
	if (isLoading) return <Loading />;
	if (isError) return <div>An error has occurred!</div>;

	const people = data.pages.flatMap((data) => data.results);
	const totalCount =
		data != null ? data.pages[data.pages.length - 1].count : 0;

	return (
		<>
			<Grid className={styles.peopleGrid}>
				{people.map((p) => (
					<GridItem key={p.url} xs={12} md={6}>
						<Person person={p} />
					</GridItem>
				))}
			</Grid>

			{/* count */}
			<Div>
				{totalCount > 0 && (
					<>
						Showing 1 - {people.length} of {totalCount}
					</>
				)}
				{totalCount === 0 && (
					<>
						No results
						{searchValue.length > 0 ? (
							<> for &quot;{searchValue}&quot;</>
						) : (
							''
						)}
					</>
				)}
			</Div>
			{hasNextPage && (
				<Div className={styles.loadMore}>
					<Button
						loading={isFetchingNextPage}
						onClick={loadMoreHandler}
					>
						Load More
					</Button>
				</Div>
			)}
		</>
	);

	/**
	 * Load more button click handler
	 */
	function loadMoreHandler(evt: React.MouseEvent<HTMLButtonElement>) {
		evt.preventDefault();
		if (isFetchingNextPage) return;

		fetchNextPage();
	}
};

export default PeopleListing;
