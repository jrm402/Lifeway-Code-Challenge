import { SearchStoreProvider } from '@/application/context/search-store';
import Home from '@/features/search/components/home';

const HomePage: Page = () => {
	return (
		<SearchStoreProvider>
			<Home />
		</SearchStoreProvider>
	);
};

export default HomePage;
