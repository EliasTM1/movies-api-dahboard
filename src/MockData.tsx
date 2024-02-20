export type Movie = {
	imdbID: string;
	Title: string;
	Year: string;
	Poster: string;
};

export type WatchedMovie = Movie & {
	Runtime: string;
	imdbRating: number;
	UserRating?: number;
};

export type MovieDetailsType = WatchedMovie & {
    Rated:      string;
    Released:   string;
    Genre:      string;
    Director:   string;
    Writer:     string;
    Actors:     string;
    Plot:       string;
    Language:   string;
    Country:    string;
    Awards:     string;
    Ratings:    Rating[];
    Metascore:  string;
    imdbVotes:  string;
    Type:       string;
    DVD:        string;
    BoxOffice:  string;
    Production: string;
    Website:    string;
    Response:   string;
}

export interface Rating {
    Source: string;
    Value:  string;
}



// export const tempMovieData: Movie[] = [
// 	{
// 		imdbID: "tt1375666",
// 		title: "Inception",
// 		year: "2010",
// 		poster:
// 			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// 	},
// 	{
// 		imdbID: "tt0133093",
// 		title: "The Matrix",
// 		year: "1999",
// 		poster:
// 			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
// 	},
// 	{
// 		imdbID: "tt6751668",
// 		title: "Parasite",
// 		year: "2019",
// 		poster:
// 			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
// 	},
// ];

export const tempWatchedData: WatchedMovie[] = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		Runtime: "148",
		imdbRating: 8.8,
		UserRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		Runtime: "116",
		imdbRating: 8.5,
		UserRating: 9,
	},
];
