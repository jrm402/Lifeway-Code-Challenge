import useIsMobile from '@/application/hooks/use-is-mobile';
import { Div } from '@/features/common/elements';
import ProfileItem from '@/features/profile/components/profile/profile-item/profile-item';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import styles from './species-item.module.css';

type SpeciesItemProp = {
	species: SWAPI.Species | null | undefined;
};
const SpeciesItem: Component<SpeciesItemProp> = ({ species }) => {
	const isMobile = useIsMobile();

	if (species == null) return <Loading />;

	return (
		<Paper className={`${styles.species} ${isMobile ? styles.mobile : ''}`}>
			<Div className={styles.split}>
				<ProfileItem label="Name">{species.name}</ProfileItem>
				<ProfileItem label="Language">{species.language}</ProfileItem>
			</Div>
			<Div className={styles.split}>
				<ProfileItem label="Average Height">
					{species.average_height} cm
				</ProfileItem>
				<ProfileItem label="Average Lifespan">
					{species.average_lifespan} year
					{species.average_lifespan !== '1' ? 's' : ''}
				</ProfileItem>
			</Div>
		</Paper>
	);
};

const Loading: Component = () => {
	return (
		<Paper className={styles.species}>
			<Div className={styles.split}>
				<Skeleton width="40%" />
				<Skeleton width="25%" />
			</Div>
			<Div className={styles.split}>
				<Skeleton width="70%" />
				<Skeleton width="50%" />
			</Div>
		</Paper>
	);
};

export default SpeciesItem;
