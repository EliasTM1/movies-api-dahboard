import { BoxProps, List, ListItem, VStack } from "@chakra-ui/react";
import { MovieItem } from "./Movie";
import { Movie } from "../MockData";

type MovieListProps = BoxProps & {
	movies: Movie[];
	onSelectMovie: (id: string) => void
};

export const MovieList = ({ movies, onSelectMovie }: MovieListProps) => {
	return movies.length > 0 ? (
		<VStack
			backgroundColor='brand.90'
			borderRadius='1rem'
			p='1rem'
			display='flex'
			justifyContent='center'
		>
			<List alignSelf="flex-start" backgroundColor='brand.90' borderRadius='1rem' p='1rem'>
				{movies.map((movie, index) => (
					<ListItem key={index}>
						<MovieItem handleIdChange={onSelectMovie} myCase='info' movieDef={movie} />
					</ListItem>
				))}
			</List>
		</VStack>
	) : null;
};

// * Movie
// {
//     "Title": "The Science of Interstellar",
//     "Year": "2015",
//     "imdbID": "tt4415360",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMDFhNzU4MTMtYzZmNS00ZDEzLTg2MjQtYmUzZDA1ZWU4OTkzXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg"
// }
