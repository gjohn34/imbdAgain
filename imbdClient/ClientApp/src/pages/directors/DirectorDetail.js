// Packages
import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Context from '../../context/globalState'
import { getData } from '../../api'
// Components
import { Card } from '../../components/FlexContainer'

// Pages

export default function DirectorDetailPage() {
    let { id } = useParams();
    const [director, setDirector] = useState(null)
    useEffect(() => {
        if (!director && id) {
            getData(`Directors/${id}`)
                .then(response => response.json())
                .then(data => setDirector(data))
        }
    }, [])


    return (
        <>
            {director ? (
                <>
                    <Card key={director.id}>
                        <h2 className="text-wrap">{director.firstName} {director.lastName}</h2>
                        <Link to={`/directors/${director.id}`} className="align-self-end btn btn-primary">Details</Link>
                    </Card>
                    <div>
                        <h2>Reviews</h2>
                        {director.reviews && director.reviews.map(review => (
                            <p>{review.content}</p>
                        ))}
                    </div>
                </>
            ) : null}
        </>
    )
}