// import { useState } from "react";
import { NumResults } from "./navBar/NumResults";
import { Search } from "./navBar/Search";
import { Box, HStack, Text } from "@chakra-ui/react";
import { MovieList } from "./movies/MovieList";
import { WatchedMoviesList } from "./movies/WatchedMoviesList";
import { Main } from "./layout/Main";
import { WatchedSummary } from "./movies/WatchedSummary";
import { NavBarV2 } from "./layout/NavBarV2";
import { Rating } from "./components/rating/Rating";
import { useEffect, useState } from "react";
import { moviesApiKey } from "./keys";
import { Loader } from "./movies/Loader";
import { ErrorMessage } from "./components/Error/Error";
import { MovieDetails } from "./movies/MovieDetails";
import { CloseIcon } from "@chakra-ui/icons";

function App() {
	// const [watched, setWatched] = useState(tempWatchedData);
	// * Temporary
	// const [selected, setSelected] = useState(false);
	const [rting, setRting] = useState(0);
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedId, setSelectedId] = useState("");

	function setRating(value: number) {
		setRting(() => value);
	}

	function handleQueryChange(search: string) {
		setQuery(search);
	}

	function handleIdChange(id: string) {
		setSelectedId(id);
	}
	function handleDetailReset() {
		setSelectedId("")
	}

	useEffect(
		function () {
			async function getMeMovies() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?s=${query}&apikey=${moviesApiKey}`
					);
					if (!res.ok) {
						throw new Error("Something went wrong fetching your data");
					}
					const data = await res.json();
					if (data.Response === "False") {
						throw new Error("Nothing found");
					}
					setMovieList(data.Search);
				} catch (error: Error) {
					if (error.message && query !== "") setError(error.message);
					// * Set the error
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovieList([]);
				setError("");
				return;
			}
			getMeMovies();
		},
		[query]
	);

	return (
		<Box backgroundColor='brand.100' minH='100vh'>
			<NavBarV2>
				<Search onInputChange={handleQueryChange} currentQuery={query} />
				<NumResults movies={movieList}></NumResults>
			</NavBarV2>
			<Main padding='2rem'>
				<HStack color='brand.15' justifyContent='space-around' pt='2rem'>
					{isLoading && <Loader />}
					{!error && (
						<MovieList onSelectMovie={handleIdChange} movies={movieList} />
					)}
					{error && <ErrorMessage message={error} />}

					<Box
						alignSelf='flex-start'
						backgroundColor='brand.90'
						borderRadius='1rem'
						position='relative'
						width='50%'
					>
						{selectedId ? (
							<MovieDetails movieId={selectedId} />
						) : (
							<>
								<WatchedSummary />
								<WatchedMoviesList />
							</>
						)}
						The current Rating is {rting}
						{selectedId ? <CloseIcon
							position='absolute'
							right='1rem'
							top='1rem'
							backgroundClip='white'
							boxSize={6}
							onClick={handleDetailReset}
							_hover={{
								cursor: 'pointer'
							}}
						/>: null}
						
					</Box>
				</HStack>
			</Main>
		</Box>
	);
}

export default App;
