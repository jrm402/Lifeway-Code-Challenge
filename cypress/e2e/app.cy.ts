/**
 * Searching E2E
 */
describe('Searching', () => {
	function findSearch() {
		return cy.get('input[type="text"][placeholder="Character search..."]');
	}

	beforeEach(() => {
		cy.visit('/');
	});

	it('has a search bar', () => {
		findSearch();
	});

	it('searches and finds no records', () => {
		findSearch().type('asdf{enter}');

		cy.contains('No results for ');
	});

	it('searches and finds a single record', () => {
		findSearch().type('luke{enter}');

		cy.get('.MuiPaper-root').contains('Luke Skywalker');
	});

	it('searches and finds multiple records', () => {
		findSearch().type('c{enter}');

		cy.get('.MuiPaper-root').should('have.length.above', 1);
	});

	it('searches and then clears the search results using the "X"', () => {
		const search = findSearch().type('asdf{enter}');

		// wait for no results
		cy.contains('No results for');

		search.siblings('.MuiInputAdornment-root').find('button').click();

		// check for results
		cy.get('.MuiPaper-root').should('have.length.above', 1);
	});

	it('searches and then clears the search results by hitting backspace', () => {
		const search = findSearch().type('asdf{enter}');

		// wait for no results
		cy.contains('No results for');

		search.clear();

		// check for results
		cy.get('.MuiPaper-root').should('have.length.above', 1);
	});

	it('searches, views a profile page, then returns to the same search results', () => {
		findSearch().type('luke{enter}');

		cy.contains('Luke Skywalker').click();

		cy.url().should('include', '/profile/1');

		cy.contains('Go Back').click();

		cy.get('input[type="text"][value="luke"]');
	});

	it('should load more search results', () => {
		cy.get('.MuiPaper-root').should('have.length', 10);

		cy.contains('Load More').click();

		cy.get('.MuiPaper-root').should('have.length', 20);
	});
});

/**
 * Profile page E2E
 */
describe('Profile page', () => {
	function findAboutMe() {
		return cy.get('[class^="profile_aboutMe"]');
	}

	function findSpecies() {
		return cy.get('[class^="profile_species"]').find('.MuiPaper-root');
	}

	function findFilms() {
		return cy.get('[class^="profile_films"]').find('.MuiPaper-root');
	}

	function findStarships() {
		return cy.get('[class^="profile_starships"]').find('.MuiPaper-root');
	}

	beforeEach(() => {
		const { title } = Cypress.currentTest;
		if (title === 'should load profile page and go back') return;
		if (title === 'should contain "sharship" data') {
			cy.visit('/profile/1');
			return;
		}

		cy.visit('/profile/2');
	});

	it('should load profile page and go back', () => {
		cy.visit('/');

		cy.contains('C-3PO').click();

		cy.url().should('include', '/profile/2');

		cy.contains('Go Back').click();

		cy.url().should('equal', Cypress.config().baseUrl);
	});

	it('should contain "about me" data', () => {
		findAboutMe().should('have.length', 1);

		findAboutMe().contains('Height:');
		findAboutMe().contains('Weight:');
		findAboutMe().contains('Hair Color:');
		findAboutMe().contains('Date of Birth:');
	});

	it('should contain "species" data', () => {
		findSpecies().should('have.length.at.least', 1);

		findSpecies().contains('Name:');
		findSpecies().contains('Language:');
		findSpecies().contains('Average Height:');
		findSpecies().contains('Average Lifespan:');
	});

	it('should contain "film" data', () => {
		findFilms().should('have.length.at.least', 1);

		findFilms().contains('Title:');
		findFilms().contains('Episode:');
		findFilms().contains('Release:');
		findFilms().contains('Director:');
		findFilms().contains('Producer:');
	});

	it('should contain no "starship" data', () => {
		cy.get('[class^="profile_starships"]').contains('None');
	});

	it('should contain "sharship" data', () => {
		findStarships().should('have.length.at.least', 1);

		findStarships().contains('Name:');
		findStarships().contains('Cargo Capacity:');
		findStarships().contains('Crew:');
		findStarships().contains('Consumables:');
		findStarships().contains('Manufacturer:');
		findStarships().contains('Model:');
		findStarships().contains('Class:');
		findStarships().contains('Cost:');
	});
});

export {};
