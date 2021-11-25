import { useEffect } from "react"

export default function Movies() {
    const { movies } = useContext(Context)
    useEffect(() => {
        if (!movies) {
            fetch(`${process.env.REACT_APP_API}/Movies`)
                .then(response => response.json())
                .then(data => dispatch({ action: "setMovies", data }))
        }
    }, [])
    return (
        <>
            <h2>All movies</h2>
            <FlexCollection>
                {movies && movies.map(movie => (
                    <Card key={movie.id}>
                        <h2 className="text-wrap">{movie.title}</h2>
                        <p>{movie.releaseYear}</p>
                        <p>{movie.director.firstName}</p>
                        <Link to={`/movies/${movie.id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                ))}
            </FlexCollection>
        </>
    )
}