// import { useState } from "react";
// import { tempMovieData, tempWatchedData } from "./MockData";
import { tempMovieData } from "./MockData";
import { NumResults } from "./navBar/NumResults";
import { Search } from "./navBar/Search";
import { Box, HStack } from "@chakra-ui/react";
import { MovieList } from "./movies/MovieList";
import { WatchedMoviesList } from "./movies/WatchedMoviesList";
import { Main } from "./layout/Main";
import { WatchedSummary } from "./movies/WatchedSummary";
import { NavBarV2 } from "./layout/NavBarV2";
import { Rating } from "./components/rating/Rating";
import { useState } from "react";

function App() {
	// const [movies, setMovies] = useState(tempMovieData);
	// const [watched, setWatched] = useState(tempWatchedData);
	// * Temporary
	// const [selected, setSelected] = useState(false);
	const [rting, setRting] = useState(0);

	function setRatingG(value: number) {
		setRting(() => value);
	}

	return (
		<Box backgroundColor='brand.100' height='100vh'>
			<NavBarV2>
				<Search />
				<NumResults movies={tempMovieData}></NumResults>
			</NavBarV2>
			<Main>
				<HStack color='brand.15' justifyContent='space-around' pt='2rem'>
					<Box
						backgroundColor='brand.90'
						borderRadius='1rem'
						p='1rem'
						width='30%'
					>
						<MovieList />
					</Box>
					<Box
						alignSelf='flex-start'
						backgroundColor='brand.90'
						borderRadius='1rem'
						width='50%'
					>
						<WatchedSummary />
						<WatchedMoviesList />
						<Rating defaultRating={2} onSetRating={() => setRatingG} />
						The current Rating is {rting}
					</Box>
				</HStack>
			</Main>
		</Box>
	);
}

export default App;
