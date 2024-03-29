﻿import { createContext } from 'react'

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
        case "setUser":
            return {
                ...state,
                user: data
            }
        case "setRedirectTo":
            return {
                ...state,
                redirectTo: data
            }
        default:
            return state
    }
}

export default createContext();