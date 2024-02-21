import { NumResults } from "./navBar/NumResults";
import { Search } from "./navBar/Search";
import { Box, HStack } from "@chakra-ui/react";
import { MovieList } from "./movies/MovieList";
import { WatchedMoviesList } from "./movies/WatchedMoviesList";
import { Main } from "./layout/Main";
import { WatchedSummary } from "./movies/WatchedSummary";
import { NavBarV2 } from "./layout/NavBarV2";
import { useEffect, useState } from "react";
import { moviesApiKey } from "./keys";
import { Loader } from "./movies/Loader";
import { ErrorMessage } from "./components/Error/Error";
import { MovieDetails } from "./movies/MovieDetails";
import { WatchedMovie } from "./MockData";

function App() {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [watchedMovieList, setWatchedMovieList] = useState<WatchedMovie[]>(function () {
		const storedValue = localStorage.getItem("watcheMovies")
		if(storedValue) return JSON.parse(storedValue)
		else return []
	});
	const [isLoading, setIsLoading] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	// const [stats, setStats] = useState({});

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
		setWatchedMovieList((previosState) => {
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
		setWatchedMovieList((previousState) => {
			return previousState.filter((watchedMovie) => watchedMovie.imdbID !== id);
		});
	}

	useEffect(
		function () {
			localStorage.setItem("watcheMovies", JSON.stringify(watchedMovieList));
		},
		[watchedMovieList]
	);

	useEffect(
		function () {
			const controller = new AbortController();
			async function getMeMovies() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?s=${query}&apikey=${moviesApiKey}`,
						{ signal: controller.signal }
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
					if (error.name !== "AbortError") {
						if (error.message && query !== "") setError(error.message);
					}
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
			handleDetailReset();
			getMeMovies();
			return function () {
				controller.abort();
			};
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
							<MovieDetails
								movieId={selectedId}
								onDetailReset={handleDetailReset}
								onAddWatched={handleAddWatched}
							/>
						) : (
							<Box padding='1rem'>
								<WatchedSummary watchedMovies={watchedMovieList} />
								<WatchedMoviesList
									watchedList={watchedMovieList}
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
