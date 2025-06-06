import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

export default function MovieCard({movie}) {
    const {isFav, addToFavs, removeFromFavs} = useMovieContext()
    const favorite = isFav(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavs(movie.id)
        else addToFavs(movie)
    }

    return(
        <>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className= {`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                </div>
            </div>
        </>
    )
}