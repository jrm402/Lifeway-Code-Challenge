import useIsMobile from '@/application/hooks/use-is-mobile';
import { Div } from '@/features/common/elements';
import ProfileItem from '@/features/profile/components/profile/profile-item';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import styles from './film-item.module.css';

type FilmItemProp = {
	film: SWAPI.Film | null | undefined;
};
const FilmItem: Component<FilmItemProp> = ({ film }) => {
	const isMobile = useIsMobile();

	if (film == null) return <Loading />;

	return (
		<Paper className={`${styles.film} ${isMobile ? styles.mobile : ''}`}>
			<Div className={styles.split}>
				<ProfileItem label="Title">{film.title}</ProfileItem>
				<ProfileItem label="Episode">{film.episode_id}</ProfileItem>
				<ProfileItem label="Release">{film.release_date}</ProfileItem>
			</Div>
			<Div className={styles.split}>
				<ProfileItem label="Director">{film.director}</ProfileItem>
				<ProfileItem label="Producer">{film.producer}</ProfileItem>
			</Div>
		</Paper>
	);
};

const Loading: Component = () => {
	return (
		<Paper className={styles.film}>
			<Div className={styles.split}>
				<Skeleton width="60%" />
				<Skeleton width="25%" />
				<Skeleton width="40%" />
			</Div>
			<Div className={styles.split}>
				<Skeleton width="50%" />
				<Skeleton width="70%" />
			</Div>
		</Paper>
	);
};

export default FilmItem;
