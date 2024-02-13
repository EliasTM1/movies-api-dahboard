import { Box } from "@chakra-ui/react";
import { MovieItem } from "./Movie";
import { tempWatchedData } from "../MockData";

export const WatchedMoviesList = () => {
	return tempWatchedData.map((watcheMovie, index) => {
		return (
			<Box paddingInline="1rem" key={index}>
				<MovieItem  myCase='details' movieDef={watcheMovie} />
			</Box>
		);
	});
};
