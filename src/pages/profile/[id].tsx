import Profile from '@/features/profile/components/profile';
import { useRouter } from 'next/router';

const ProfilePage: Page = () => {
	const router = useRouter();
	const id = router.query.id as string;

	if (id == null) return <></>;

	return <Profile id={id} />;
};

export default ProfilePage;
