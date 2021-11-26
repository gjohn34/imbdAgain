import React, { useEffect, useReducer } from 'react';
import { Switch, Route, Routes } from 'react-router-dom';
import Context, { reducer } from './context/globalState'
import { getData } from './api'

import Layout from './components/Layout'
import Movies from './pages/Movies'
import Directors from './pages/Directors'
import Home from './pages/Home'
import MovieDetailPage from './pages/movies/MovieDetail';

import './custom.css'

export default function App() {
    const [store, dispatch] = useReducer(reducer, {
        movies: [],
        directors: []
    });

    useEffect(() => {
        getData("Movies")
            .then(response => response.json())
            .then(data => dispatch({ action: "setMovies", data }))
        getData("Directors")
            .then(response => response.json())
            .then(data => dispatch({ action: "setDirectors", data }))
    }, [])

    return (
        <Context.Provider value={{ ...store, dispatch }}>
            <Routes path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="movies">
                    <Route index element={<Movies />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route path="directors">
                    <Route index element={<Directors />} />
                    <Route path=":id" element={<h2>D p </h2>} />
                </Route>
            </Routes>
        </Context.Provider>
    )
}
