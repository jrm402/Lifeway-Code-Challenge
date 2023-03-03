import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000/',
		defaultCommandTimeout: 20000, // if the API is running slow...
		setupNodeEvents(on, config) {
			// implement node event listeners here
			require('@cypress/code-coverage/task')(on, config);

			return config;
		},
	},
});
