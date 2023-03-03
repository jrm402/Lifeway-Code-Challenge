import useIsMobile from '@/application/hooks/use-is-mobile';
import { Div } from '@/features/common/elements';
import ProfileItem from '@/features/profile/components/profile/profile-item';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import styles from './starship-item.module.css';

type StarshipItemProp = {
	starship: SWAPI.Starship | null | undefined;
};
const StarshipItem: Component<StarshipItemProp> = ({ starship }) => {
	const isMobile = useIsMobile();

	if (starship == null) return <Loading />;

	return (
		<Paper
			className={`${styles.starship} ${isMobile ? styles.mobile : ''}`}
		>
			<Div className={styles.split}>
				<ProfileItem label="Name">{starship.name}</ProfileItem>
				<ProfileItem label="Cargo Capacity">
					{starship.cargo_capacity} kg
				</ProfileItem>
				<ProfileItem label="Crew">{starship.crew}</ProfileItem>
				<ProfileItem label="Consumables">
					{starship.consumables}
				</ProfileItem>
			</Div>
			<Div className={styles.split}>
				<ProfileItem label="Manufacturer">
					{starship.manufacturer}
				</ProfileItem>
				<ProfileItem label="Model">{starship.model}</ProfileItem>
				<ProfileItem label="Class">
					{starship.starship_class}
				</ProfileItem>
				<ProfileItem label="Cost">
					{starship.cost_in_credits}
				</ProfileItem>
			</Div>
		</Paper>
	);
};

const Loading: Component = () => {
	return (
		<Paper className={styles.starship}>
			<Div className={styles.split}>
				<Skeleton width="45%" />
				<Skeleton width="55%" />
				<Skeleton width="15%" />
				<Skeleton width="50%" />
			</Div>
			<Div className={styles.split}>
				<Skeleton width="75%" />
				<Skeleton width="60%" />
				<Skeleton width="55%" />
				<Skeleton width="30%" />
			</Div>
		</Paper>
	);
};

export default StarshipItem;
