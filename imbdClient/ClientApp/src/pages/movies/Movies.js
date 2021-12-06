import React, { useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom'
import Context from '../../context/globalState';
import FlexCollection, { Card } from '../../components/FlexContainer'

export default function Movies() {
    const { movies, dispatch } = useContext(Context)
    const stableDispatch = useCallback(dispatch, []) //assuming that it doesn't need to change
    useEffect(() => {
        if (!movies) {
            fetch(`${process.env.REACT_APP_API}/Movies`)
                .then(response => response.json())
                .then(data => stableDispatch({ action: "setMovies", data }))
        }
    }, [movies, stableDispatch])
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