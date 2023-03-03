declare global {
	namespace SWAPI {
		type PagedResponse<T> = {
			count: number;
			next: string | null;
			previous: string | null;
			results: T[];
		};

		type Person = {
			id: string;
			birth_year: string;
			created: string;
			edited: string;
			eye_color: string;
			films: string[];
			gender: string;
			hair_color: string;
			height: string;
			homeworld: string;
			mass: string;
			name: string;
			skin_color: string;
			species: string[];
			starships: string[];
			url: string;
			vehicles: string[];
		};

		type Species = {
			id: string;
			average_height: string;
			average_lifespan: string;
			classification: string;
			created: string;
			designation: string;
			edited: string;
			eye_colors: string;
			hair_colors: string;
			homeworld: string | null;
			language: string;
			name: string;
			people: string[];
			films: string[];
			skin_colors: string;
			url: string;
		};

		type Film = {
			id: string;
			characters: string[];
			created: string;
			director: string;
			edited: string;
			episode_id: number;
			opening_crawl: string;
			planets: string[];
			producer: string;
			release_date: string;
			species: string[];
			starships: string[];
			title: string;
			url: string;
			vehicles: string[];
		};

		type Starship = {
			id: string;
			cargo_capacity: string;
			consumables: string;
			cost_in_credits: string;
			created: string;
			crew: string;
			edited: string;
			hyperdrive_rating: string;
			length: string;
			manufacturer: string;
			max_atmosphering_speed: string;
			model: string;
			name: string;
			films: string[];
			pilots: string[];
			starship_class: string;
			url: string;
		};
	}
}

export {};
