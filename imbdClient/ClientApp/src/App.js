import React, { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import Context, { reducer } from './context/globalState'

import Layout from './components/Layout'
import Home from './pages/Home'

import './custom.css'

export default function App() {
    const [store, dispatch] = useReducer(reducer, {
        movies: [],
        directors: []
    });

    useEffect(() => {
        fetch("https://localhost:44351/api/Movies")
            .then(response => response.json())
            .then(data => dispatch({ action: "setMovies", data }))
        fetch("https://localhost:44351/api/Directors")
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
                        <h2>All movies</h2>
                    </Route>
                    <Route exact path="/movies/:id">
                        <h2>Movie Id</h2>
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
