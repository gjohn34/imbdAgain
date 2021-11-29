import React, { createContext } from 'react'

export const reducer = (state, { action, data }) => {
    switch (action) {
        case "setMovies":
            return {
                ...state,
                movies: data
            }
        case "setDirectors":
            return {
                ...state,
                directors: data
            }
        case "setMobile":
            return {
                ...state,
                isMobile: data
            }
    }
    return state;
}

export default createContext();