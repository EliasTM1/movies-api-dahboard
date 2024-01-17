import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./MockData";
import { NavBar } from "./navBar/NavBar";
import { NumResults } from "./navBar/NumResults";

function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState(tempWatchedData);

	return <>
  <NavBar>
    {/* <Logo/> */}
    <NumResults movies={movies}/>
  </NavBar>
  </>;
}

export default App;
