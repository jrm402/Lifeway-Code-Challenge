import { Div } from '@/features/common/elements';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './loading.module.css';

export const Loading: Component = () => {
	return (
		<Div className={styles.loading}>
			<CircularProgress size={60} />
		</Div>
	);
};

export default Loading;
