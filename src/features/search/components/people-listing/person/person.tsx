import { A, Div, Label } from '@/features/common/elements';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import styles from './person.module.css';

type PersonProps = {
	person: SWAPI.Person;
};
const Person: Component<PersonProps> = ({ person }) => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const anchorTitle = `View ${person.name}'s Profile`;
	const anchorHref = `/profile/${person.id}`;

	return (
		<Paper
			elevation={isHover ? 5 : 1}
			className={styles.person}
			onMouseLeave={() => setIsHover(false)}
			onMouseEnter={() => setIsHover(true)}
		>
			<A href={anchorHref} title={anchorTitle} color="text.primary">
				<Div className={styles.name}>{person.name}</Div>
				<Div className={styles.aboutMe}>
					<Div>
						<Label>Height:</Label> {person.height}
					</Div>
					<Div>
						<Label>Weight:</Label> {person.mass}
					</Div>
					<Div>
						<Label>Birth Year:</Label> {person.birth_year}
					</Div>
					<Div>
						<Label>Hair Color:</Label> {person.hair_color}
					</Div>
				</Div>
				<Div className={styles.loadMore} color="primary.main">
					View Full Profile
				</Div>
			</A>
		</Paper>
	);
};

export default Person;
