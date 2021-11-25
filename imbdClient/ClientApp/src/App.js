import React, { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import Context, { reducer } from './context/globalState'

import Layout from './components/Layout'
import Movies from './pages/Home'
import Home from './pages/Home'
import MovieDetailPage from './pages/movies/MovieDetail';

import './custom.css'

export default function App() {
    const [store, dispatch] = useReducer(reducer, {
        movies: [],
        directors: []
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/Movies`)
            .then(response => response.json())
            .then(data => dispatch({ action: "setMovies", data }))
        fetch(`${process.env.REACT_APP_API}/Directors`)
            .then(response => response.json())
            .then(data => dispatch({ action: "setDirectors", data }))
    }, [])

    return (
        <Context.Provider value={{ ...store, dispatch }}>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/movies">
                        <Movies />
                    </Route>
                    <Route exact path="/movies/:id">
                        <MovieDetailPage />
                    </Route>
                    <Route exact path="/directors">
                        <h2>All Directors</h2>
                    </Route>
                    <Route exact path="/directors/:id">
                        <h2>Director Id</h2>
                    </Route>
                </Switch>


            </Layout>
        </Context.Provider>
    )
}
