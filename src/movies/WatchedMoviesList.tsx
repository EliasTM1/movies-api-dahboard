import { Box } from "@chakra-ui/react";
import { tempWatchedData } from "../MockData";
import { MovieItem } from "./Movie";

export const WatchedMoviesList = () => {
	return tempWatchedData.map((watcheMovie, index) => {
		return (
			<Box paddingInline="1rem">
				<MovieItem key={index} myCase='details' movieDef={watcheMovie} />
			</Box>
		);
	});
};
