import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import "../css/Home.css"
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //const movies = getPopularMovies() -> call everytime sth refresh
    
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err) {
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault()
        
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchedResults = await searchMovies(searchQuery)
            setMovies(searchedResults)
            setError(null)
        } catch(err) {
            setError("Failed to search movies...")
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div className="home">
                <form onSubmit={handleSearch} className="search-form" >
                    <input 
                        type="text" 
                        placeholder="Search for movie..." 
                        className="search-input" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {error && <div className="error-message">{error}</div> }


                {loading ? (
                    <div className="loading">Loading...</div>) 
                    : (
                    <div className="movies-grid">
                        {movies.map(movie => (
                            <MovieCard movie = {movie} key={movie.id}/>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}