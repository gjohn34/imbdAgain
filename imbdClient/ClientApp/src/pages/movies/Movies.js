import React, { useEffect, useReducer, useContext } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Context from '../../context/globalState';
import FlexCollection, { Card } from '../../components/FlexContainer'
import MovieDetailPage from './MovieDetail'

export default function Movies() {
    const { movies, dispatch } = useContext(Context)
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