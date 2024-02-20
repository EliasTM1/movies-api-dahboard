import { Box } from "@chakra-ui/react";
import { MovieItem } from "./Movie";
import { Movie } from "../MockData";
import { DeleteIcon } from "@chakra-ui/icons";

export type WatchedMoviesListProps = {
	watchedList: Movie[]
	onDeleteMovie: (id: string) => void
}

export const WatchedMoviesList = ({watchedList, onDeleteMovie}:WatchedMoviesListProps) => {
	return watchedList.map((watcheMovie, index) => {
		return (
			<Box paddingInline="1rem" key={index}>
				<MovieItem  myCase='details' movieDef={watcheMovie} handleDeleteMovie={onDeleteMovie} >
					<DeleteIcon color="red" /> 
				</MovieItem>
			</Box>
		);
	});
};
