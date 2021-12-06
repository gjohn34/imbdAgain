import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom'
import Context from '../../context/globalState';
import FlexCollection, { Card } from '../../components/FlexContainer'

export default function Movies() {
    const { directors, dispatch } = useContext(Context)
    const stableDispatch = useCallback(dispatch, []) //assuming that it doesn't need to change

    useEffect(() => {
        if (!directors) {
            fetch(`${process.env.REACT_APP_API}/Directors`)
                .then(response => response.json())
                .then(data => stableDispatch({ action: "setDirectors", data }))
        }
    }, [directors, stableDispatch])
    return (
        <>
            <h2>Directors</h2>
            <FlexCollection>
                {directors && directors.map(director => (
                    <Card key={director.id}>
                        <h2 className="text-wrap">{director.firstName} {director.lastName}</h2>
                        <p>{director.bio}</p>
                        <Link to={`/directors/${director.id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                ))}
            </FlexCollection>
        </>
    )
}