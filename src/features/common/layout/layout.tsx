import { Div } from '@/features/common/elements/elements';
import Box from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import styles from './layout.module.css';

const Layout: Component = ({ children }) => {
	return (
		<Div className={styles.wrap}>
			{/* header */}
			<Box
				component="header"
				bgcolor="primary.main"
				color="common.white"
				className={styles.header}
			>
				<Container>SWAPI Character Search</Container>
			</Box>

			{/* main */}
			<Box component="main" className={styles.main}>
				<Container>{children}</Container>
			</Box>

			{/* footer */}
			{/* <Box component="footer">
				<Container>Foot</Container>
			</Box> */}
		</Div>
	);
};

const Container: Component = ({ children }) => {
	return (
		<MuiContainer fixed maxWidth="md">
			{children}
		</MuiContainer>
	);
};

export default Layout;
