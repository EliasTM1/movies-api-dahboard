import { NumResults } from "./navBar/NumResults";
import { Search } from "./navBar/Search";
import { Box, HStack } from "@chakra-ui/react";
import { MovieList } from "./movies/MovieList";
import { WatchedMoviesList } from "./movies/WatchedMoviesList";
import { Main } from "./layout/Main";
import { WatchedSummary } from "./movies/WatchedSummary";
import { NavBarV2 } from "./layout/NavBarV2";
import { useState } from "react";
import { Loader } from "./movies/Loader";
import { ErrorMessage } from "./components/Error/Error";
import { MovieDetails } from "./movies/MovieDetails";
import { WatchedMovie } from "./MockData";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState("");

	const { isLoading, movieList, error } = useMovies(query);
	const [watchedMovieList, setWatchedMovieList] = useLocalStorage(
		[],
		"watcheMovies"
	);

	function handleQueryChange(search: string) {
		setQuery(search);
	}

	function handleIdChange(id: string) {
		setSelectedId(id);
	}
	function handleDetailReset() {
		setSelectedId("");
	}
	// Here we could also handle the update of certain added movie
	function handleAddWatched(movie: WatchedMovie) {
		setWatchedMovieList((previosState: WatchedMovie[]) => {
			const preExistentMovie = previosState.filter((existentMovie) => {
				if (existentMovie.imdbID === movie.imdbID) return existentMovie;
			});

			if (preExistentMovie.length) {
				return [...previosState];
			}

			return [...previosState, movie];
		});
	}

	function handleDeleteElement(id: string) {
		setWatchedMovieList((previousState: WatchedMovie[]) => {
			return previousState.filter((watchedMovie) => watchedMovie.imdbID !== id);
		});
	}

	return (
		<Box backgroundColor='brand.100' minH='100vh'>
			<NavBarV2>
				<Search onQuerySet={setQuery} onInputChange={handleQueryChange} currentQuery={query} />
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
							<MovieDetails
								movieId={selectedId}
								onDetailReset={handleDetailReset}
								onAddWatched={handleAddWatched}
							/>
						) : (
							<Box padding='1rem'>
								<WatchedSummary
									watchedMovies={watchedMovieList as WatchedMovie[]}
								/>
								<WatchedMoviesList
									watchedList={watchedMovieList as WatchedMovie[]}
									onDeleteMovie={handleDeleteElement}
								/>
							</Box>
						)}
					</Box>
				</HStack>
			</Main>
		</Box>
	);
}

export default App;
