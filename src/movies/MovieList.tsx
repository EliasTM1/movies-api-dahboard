import {  BoxProps, HStack, List, ListItem } from "@chakra-ui/react";
import { MovieItem } from "./Movie";
import { Movie } from "../MockData";
import { Loader } from "./Loader";

type MovieListProps = BoxProps & {
	movies: Movie[];
};

export const MovieList = ({ movies }: MovieListProps) => {
	// if (movies.length === 0) {
	// 	return <Box>Nothing under that name so far.</Box>;
	// }
	console.log("PELIS", movies);
	if (movies.length)
		return (
			<HStack justifyContent='center' position='absolute'>
				<Loader />
			</HStack>
		);
	return movies.map((movie, index) => (
		<List backgroundColor='brand.90' borderRadius='1rem' p='1rem' key={index}>
			<ListItem>
				<MovieItem myCase='info' movieDef={movie} />
			</ListItem>
		</List>
	));
};

// * Movie
// {
//     "Title": "The Science of Interstellar",
//     "Year": "2015",
//     "imdbID": "tt4415360",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMDFhNzU4MTMtYzZmNS00ZDEzLTg2MjQtYmUzZDA1ZWU4OTkzXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg"
// }
