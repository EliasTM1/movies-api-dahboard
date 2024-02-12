// import { useState } from "react";
import { NumResults } from "./navBar/NumResults";
import { Search } from "./navBar/Search";
import { Box, HStack } from "@chakra-ui/react";
import { MovieList } from "./movies/MovieList";
import { WatchedMoviesList } from "./movies/WatchedMoviesList";
import { Main } from "./layout/Main";
import { WatchedSummary } from "./movies/WatchedSummary";
import { NavBarV2 } from "./layout/NavBarV2";
import { Rating } from "./components/rating/Rating";
import { ChangeEvent, useEffect, useState } from "react";
import { moviesApiKey } from "./keys";

function App() {
	// const [watched, setWatched] = useState(tempWatchedData);
	// * Temporary
	// const [selected, setSelected] = useState(false);
	const [rting, setRting] = useState(0);
	const [movieList, setMovieList] = useState([]);
	const [query, setquery] = useState("serbian");

	function setRatingG(value: number) {
		setRting(() => value);
	}

	function handleQueryChange(value: ChangeEvent<HTMLInputElement>) {
		setquery(() => value.target.value);
	}

	useEffect(function () {
		async function getMeMovies() {
			const res = await fetch(
				`http://www.omdbapi.com/?s=${query}&apikey=${moviesApiKey}`
			);
			const data = await res.json();
			setMovieList(data.Search);
		}
		getMeMovies();
	}, []);

	return (
		<Box backgroundColor='brand.100' height='100vh'>
			<NavBarV2>
				<Search onInputChange={handleQueryChange} />
				<NumResults movies={movieList}></NumResults>
			</NavBarV2>
			<Main>
				<HStack color='brand.15' justifyContent='space-around' pt='2rem'>
					<Box
						backgroundColor='brand.90'
						borderRadius='1rem'
						p='1rem'
						width='30%'
						display="flex" 
						justifyContent="center"
					>
						<MovieList movies={movieList} />
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
