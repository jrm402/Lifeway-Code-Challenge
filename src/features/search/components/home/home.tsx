import { Div, H3 } from '@/features/common/elements';
import PeopleListing from '@/features/search/components/people-listing';
import Search from '@/features/search/components/search';
import styles from './home.module.css';

const Home: Component = () => {
	return (
		<>
			<Search />
			<Div className={styles.peopleListing}>
				<H3>Star Wars Characters</H3>
				<PeopleListing />
			</Div>
		</>
	);
};

export default Home;
