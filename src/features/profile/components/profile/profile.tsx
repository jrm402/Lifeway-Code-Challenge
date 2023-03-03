import useIsMobile from '@/application/hooks/use-is-mobile';
import { Button, Div, H3, H4, H5 } from '@/features/common/elements';
import Loading from '@/features/common/loading';
import { useFetchFilmsArray } from '@/features/profile/api/fetch-films';
import { useFetchPerson } from '@/features/profile/api/fetch-person';
import { useFetchSpeciesArray } from '@/features/profile/api/fetch-species';
import { useFetchStarshipsArray } from '@/features/profile/api/fetch-starships';
import FilmItem from '@/features/profile/components/profile/film-item';
import ProfileItem from '@/features/profile/components/profile/profile-item';
import SpeciesItem from '@/features/profile/components/profile/species-item';
import StarshipItem from '@/features/profile/components/profile/starship-item';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import styles from './profile.module.css';

type ProfileSectionProps = {
	person: SWAPI.Person;
};
type ProfileProps = {
	id: string;
};
const Profile: Component<ProfileProps> = ({ id }) => {
	const router = useRouter();

	// load person data
	const { data: person, isLoading, isError } = useFetchPerson({ id });

	// loading and error states
	if (isLoading) return <Loading />;
	if (isError) return <div>An error has occurred!</div>;

	return (
		<>
			{/* back button */}
			<Div>
				<Button onClick={backButtonClickHandler} size="small">
					Go Back
				</Button>
			</Div>

			{/* profile */}
			<H3 className={styles.heading}>{person.name}</H3>
			<Paper className={styles.profile}>
				{/* profile sections */}
				<AboutMe person={person} />
				<Species person={person} />
				<Films person={person} />
				<Starships person={person} />
			</Paper>
		</>
	);

	function backButtonClickHandler(evt: React.MouseEvent<HTMLButtonElement>) {
		evt.preventDefault();
		router.back();
	}
};

const AboutMe: Component<ProfileSectionProps> = ({ person }) => {
	const isMobile = useIsMobile();

	return (
		<>
			<H4>About Me</H4>
			<Div
				className={`${styles.aboutMe} ${isMobile ? styles.mobile : ''}`}
			>
				<Div className={styles.split}>
					<ProfileItem label="Height">{person.height} cm</ProfileItem>
					<ProfileItem label="Weight">{person.mass} kg</ProfileItem>
				</Div>
				<Div className={styles.split}>
					<ProfileItem label="Hair Color">
						{person.hair_color}
					</ProfileItem>
					<ProfileItem label="Date of Birth">
						{person.birth_year}
					</ProfileItem>
				</Div>
			</Div>
		</>
	);
};

const Species: Component<ProfileSectionProps> = ({ person }) => {
	const personSpecies = person.species;
	const speciesQuery = useFetchSpeciesArray(
		(personSpecies ?? []).map((s) => ({
			id: s,
			config: {
				enabled: personSpecies != null,
			},
		}))
	);

	const species = speciesQuery.map((s) => s.data);

	return (
		<>
			<H5>Species</H5>
			<Div className={styles.species}>
				{species.map((s, i) => (
					<SpeciesItem
						key={s != null ? s.id : `species_${i}`}
						species={s}
					/>
				))}
				{species.length === 0 && (
					<Div className={styles.noResults}>None</Div>
				)}
			</Div>
		</>
	);
};

const Films: Component<ProfileSectionProps> = ({ person }) => {
	const personFilms = person.films;
	const filmsQuery = useFetchFilmsArray(
		(personFilms ?? []).map((f) => ({
			id: f,
			config: {
				enabled: personFilms != null,
			},
		}))
	);

	const films = filmsQuery.map((f) => f.data);

	return (
		<>
			<H5>Films Appeared In</H5>
			<Div className={styles.films}>
				{films.map((f, i) => {
					return (
						<FilmItem
							key={f != null ? f.id : `film_${i}`}
							film={f}
						/>
					);
				})}
				{films.length === 0 && (
					<Div className={styles.noResults}>None</Div>
				)}
			</Div>
		</>
	);
};

const Starships: Component<ProfileSectionProps> = ({ person }) => {
	const personStarships = person.starships;
	const starshipsQuery = useFetchStarshipsArray(
		(personStarships ?? []).map((s) => ({
			id: s,
			config: {
				enabled: personStarships != null,
			},
		}))
	);

	const starships = starshipsQuery.map((s) => s.data);

	return (
		<>
			<H5>Starships Flown</H5>
			<Div className={styles.starships}>
				{starships.map((s, i) => (
					<StarshipItem
						key={s != null ? s.id : `starship_${i}`}
						starship={s}
					/>
				))}
				{starships.length === 0 && (
					<Div className={styles.noResults}>None</Div>
				)}
			</Div>
		</>
	);
};

export default Profile;
