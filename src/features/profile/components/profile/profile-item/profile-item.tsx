import { Div, Label } from '@/features/common/elements';
import styles from './profile-item.module.css';

type ProfileItemProps = {
	label: string;
};
const ProfileItem: Component<ProfileItemProps> = ({ label, children }) => {
	return (
		<Div className={styles.profileItem}>
			<Label>{label}:</Label> {children}
		</Div>
	);
};

export default ProfileItem;
