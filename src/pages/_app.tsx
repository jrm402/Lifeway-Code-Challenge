import { queryClient } from '@/application/react-query';
import '@/application/styles/globals.css';
import theme from '@/application/theme';
import Layout from '@/features/common/layout';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
