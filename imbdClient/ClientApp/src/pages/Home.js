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
                    <Card key={movie.id}>
                        <h2 className="text-wrap">{movie.title}</h2>
                        <p>{movie.releaseYear}</p>
                        <p>{movie.director.firstName}</p>
                        <Link to={`/movies/${movie.id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                ))}
            </FlexCollection>
            <h2>Directors</h2>
            <FlexCollection>
                {directors && directors.map(director => (
                    <Card key={director.id}>
                        <h2 className="text-wrap">{director.firstName} {director.lastName}</h2>
                        <p>{director.bio}</p>
                        <Link to={`/movies/${director.id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                ))}
            </FlexCollection>
        </>
    )
}