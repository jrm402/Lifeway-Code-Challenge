import { axios } from '@/application/axios';

export const swapi = {
	/**
	 * Load a list of people from SWAPI.
	 *
	 * @param searchValue Optional. Search value for people.
	 * @param pageParam Optional. Page parameter from the previous response data.
	 */
	getPeople(searchValue?: string, pageParam?: string) {
		// handle paged query results
		if (pageParam != null)
			return _doGetRequest<GetPeopleResponse>(pageParam);

		let searchQuery = '';
		if (searchValue != null && searchValue.length > 0)
			searchQuery = `?search=${searchValue}`;

		return _doGetRequest<GetPeopleResponse>(_getPeopleUrl(), searchQuery);
	},

	/**
	 * Load a single person from SWAPI.
	 *
	 * @param id Person ID
	 */
	getPerson(id: string) {
		return _doGetRequest<GetPersonResponse>(_getPersonUrl(id));
	},

	/**
	 * Load a single species from SWAPI.
	 *
	 * @param id Species ID
	 */
	getSpecies(id: string) {
		return _doGetRequest<GetSpeciesResponse>(_getSpeciesUrl(id));
	},

	/**
	 * Load a single film from SWAPI.
	 *
	 * @param id Film ID
	 */
	getFilm(id: string) {
		return _doGetRequest<GetFilmResponse>(_getFilmUrl(id));
	},

	/**
	 * Load a single starship from SWAPI.
	 *
	 * @param id Starship ID
	 */
	getStarship(id: string) {
		return _doGetRequest<GetStarshipResponse>(_getStarshipUrl(id));
	},
};

/**
 * API data response processors.
 */

export function processPerson(data: SWAPI.Person) {
	data.id = _swapiIdExtractor(data.url);
	data.homeworld = _swapiIdExtractor(data.homeworld);
	data.films = data.films.map((f) => _swapiIdExtractor(f));
	data.species = data.species.map((s) => _swapiIdExtractor(s));
	if (data.species.length === 0) data.species = ['1']; // default human
	data.vehicles = data.vehicles.map((v) => _swapiIdExtractor(v));
	data.starships = data.starships.map((s) => _swapiIdExtractor(s));

	return data;
}

export function processSpecies(data: SWAPI.Species) {
	data.id = _swapiIdExtractor(data.url);
	data.people = data.people.map((p) => _swapiIdExtractor(p));
	data.films = data.films.map((f) => _swapiIdExtractor(f));

	return data;
}

export function processFilm(data: SWAPI.Film) {
	data.id = _swapiIdExtractor(data.url);
	data.characters = data.characters.map((c) => _swapiIdExtractor(c));
	data.planets = data.planets.map((p) => _swapiIdExtractor(p));
	data.starships = data.starships.map((s) => _swapiIdExtractor(s));
	data.vehicles = data.vehicles.map((v) => _swapiIdExtractor(v));
	data.species = data.species.map((s) => _swapiIdExtractor(s));

	return data;
}

export function processStarship(data: SWAPI.Starship) {
	data.id = _swapiIdExtractor(data.url);
	data.films = data.films.map((f) => _swapiIdExtractor(f));
	data.pilots = data.pilots.map((p) => _swapiIdExtractor(p));

	return data;
}

/**
 * Types
 */

export type GetPeopleResponse = SWAPI.PagedResponse<SWAPI.Person>;
export type GetPersonResponse = SWAPI.Person;
export type GetSpeciesResponse = SWAPI.Species;
export type GetFilmResponse = SWAPI.Film;
export type GetStarshipResponse = SWAPI.Starship;

/**
 * Internal functions
 */

function _swapiIdExtractor(url: string) {
	url = url.replace(/\/$/gi, '');
	const parts = url.split('/');

	return parts[parts.length - 1];
}

const basePath = 'https://swapi.dev/api';

function _getPeopleUrl() {
	return `${basePath}/people`;
}

function _getPersonUrl(id: string) {
	return `${basePath}/people/${id}`;
}

function _getSpeciesUrl(id: string) {
	return `${basePath}/species/${id}`;
}

function _getFilmUrl(id: string) {
	return `${basePath}/films/${id}`;
}

function _getStarshipUrl(id: string) {
	return `${basePath}/starships/${id}`;
}

async function _doGetRequest<R>(url: string, queryString?: string) {
	const requestUrl = `${url}${queryString ?? ''}`;

	return axios.get<any, R>(requestUrl);
}
