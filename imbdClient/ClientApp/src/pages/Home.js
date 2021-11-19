import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../context/globalState'
import FlexCollection, { Card } from '../components/FlexContainer'

export default function Home() {
    const { movies, directors } = useContext(Context)
    return (
        <>
            <h2>Movies</h2>
            <FlexCollection>
                {movies && movies.map(movie => (
                    <Card key={movie.Id}>
                        <h2 className="text-wrap">{movie.Title}</h2>
                        <p>{movie.ReleaseYear}</p>
                        <p>{movie.Director.FirstName}</p>
                        <Link to={`/movies/${movie.Id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                ))}
            </FlexCollection>
            <h2>Directors</h2>
            <FlexCollection>
                {directors && directors.map(director => (
                    <Card key={director.Id}>
                        <h2 className="text-wrap">{director.FirstName} {director.LastName}</h2>
                        <p>{director.Bio}</p>
                        <Link to={`/movies/${director.Id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                ))}
            </FlexCollection>
        </>
    )
}