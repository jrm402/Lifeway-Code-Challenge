import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
	// theme customizations here...
});

theme = responsiveFontSizes(theme);

export default theme;
