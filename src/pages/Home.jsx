import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovie, getPopularMovies } from "../services/api";
import "../css/Home.css";
function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovie(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Falied to load movie ...");
            } finally {
            }
            setLoading(false);
        };
        loadPopularMovies();
    }, []);
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
        try {
            const searchResults = await searchMovie(searchQuery);
            setMovie(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed search movies ...");
        } finally {
            setLoading(false);
        }
        setSearchQuery("");
    };
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="search for movies ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="submit-btn">
                    Search
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading ...</div>
            ) : (
                <div className="movies-grid">
                    {movie.map(
                        (movie) =>
                            movie.title
                                .toLowerCase()
                                .startsWith(searchQuery) && (
                                <MovieCard movie={movie} key={movie.id} />
                            ),
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
