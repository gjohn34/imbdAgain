// Packages
import React, { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import Context, { reducer } from './context/globalState'
import { getData } from './api'

// Components
import Layout from './components/Layout'
import NavBar from './components/NavMenu'

// Pages
import Movies from './pages/movies/Movies'
import Directors from './pages/directors/Directors'
import Home from './pages/Home'
import MovieDetailPage from './pages/movies/MovieDetail';
import DirectorDetailPage from './pages/directors/DirectorDetail'
import GenresPage from './pages/genres/index'

import './custom.css'

export default function App() {
    const [store, dispatch] = useReducer(reducer, {
        movies: [],
        directors: [],
        isMobile: window.innerWidth <= 575
    });

    const handleResize = () => {
        dispatch({ action: "setMobile", data: window.innerWidth <= 575 })
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        getData("Movies")
            .then(response => response.json())
            .then(data => dispatch({ action: "setMovies", data }))
        getData("Directors")
            .then(response => response.json())
            .then(data => dispatch({ action: "setDirectors", data }))
        return (() => window.removeEventListener("resize", handleResize))
    }, [])

    return (
        <Context.Provider value={{ ...store, dispatch }}>
            <NavBar />
            <Layout>
                <Routes path="/">
                    <Route index element={<Home />} />
                    <Route path="movies">
                        <Route index element={<Movies />} />
                        <Route path=":id" element={<MovieDetailPage />} />
                    </Route>
                    <Route path="directors">
                        <Route index element={<Directors />} />
                        <Route path=":id" element={<DirectorDetailPage />} />
                    </Route>
                    <Route path="genres">
                        <Route index element={<GenresPage />} />
                    </Route>
                </Routes>
            </Layout>
        </Context.Provider>
    )
}
