import React, { useEffect, useState, useContext } from 'react'
import { Card } from '../../components/FlexContainer'
import Context from '../../context/globalState'
import { useParams, Link } from 'react-router-dom'
import { getData } from '../../api'

export default function MovieDetailPage() {
    let { id } = useParams();
    const [movie, setMovie] = useState(null)
    useEffect(() => {
        if (!movie && id) {
            getData(`Movies/${id}`)
                .then(response => response.json())
                .then(data => setMovie(data))
        }
    }, [])


    return (
        <>
            {movie ? (
                <>
                    <Card key={movie.id}>
                        <h2 className="text-wrap">{movie.title}</h2>
                        <p>{movie.releaseYear}</p>
                        <p>{movie.director.firstName}</p>
                        <Link to={`/movies/${movie.id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                    <div>
                        <h2>Reviews</h2>
                        {movie.reviews && movie.reviews.map(review => (
                            <p>{review.content}</p>
                        ))}
                    </div>
                </>
            ) : null}
        </>
    )
}

