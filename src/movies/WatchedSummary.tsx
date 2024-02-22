import {
	Box,
	HStack,
	Heading,
	Img,
	List,
	ListItem,
	Stack,
} from "@chakra-ui/react";
import { WatchedMovie } from "../MockData";

type WatchedSummaryProps = {
	watchedMovies: WatchedMovie[];
};

export const WatchedSummary = ({ watchedMovies }: WatchedSummaryProps) => {
	let totalCouchTime: number = 0;
	watchedMovies.forEach((watcheMovie) => {
		totalCouchTime = Number(watcheMovie.Runtime) + totalCouchTime;
	});
	return watchedMovies.length ? (
		<Box padding='1rem'>
			<Heading>Your Stats</Heading>
			<HStack>
				<Box>🎬 {watchedMovies.length} movies watched</Box>
				<Box>⏰ {totalCouchTime} minutes</Box>
				<Box>⭐️ Average review</Box>
			</HStack>
		</Box>
	) : (
		<Stack>
			<Img src='../../public/data.svg' width='70%' margin='auto' />
			<List margin='auto' fontSize='2rem' marginBlock='1rem'>
				<ListItem>1️⃣ Search movies by title. 🎬</ListItem>
				<ListItem>2️⃣ Rate & add them to your list. 📋</ListItem>
				<ListItem>3️⃣ See how your stats grow over time. 📊</ListItem>
			</List>
		</Stack>
	);
};
