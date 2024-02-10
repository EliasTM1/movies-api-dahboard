import { BoxProps, List, ListItem } from "@chakra-ui/react";
import { tempMovieData } from "../MockData";
import { MovieItem } from "./Movie";

type MovieListProps = BoxProps & {
	some?: string;
};

export const MovieList = ({ some }: MovieListProps) => {
	console.log(some);

	return tempMovieData.map((movie, index) => {
		return (
			<List backgroundColor='brand.90' borderRadius='1rem' p='1rem'>
				<ListItem>
					<MovieItem myCase='info' movieDef={movie} key={index}>
						{" "}
					</MovieItem>
				</ListItem>
			</List>
		);
	});
};
