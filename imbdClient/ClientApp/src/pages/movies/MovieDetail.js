// Packages
import React, { useEffect, useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import Context from '../../context/globalState'
import { getData } from '../../api'
// Components
import { Card } from '../../components/FlexContainer'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

export default function MovieDetailPage() {
    let { id } = useParams();
    const [movie, setMovie] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const { isMobile } = useContext(Context)
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
                <Container className="pt-4">
                    <Row>
                        <Col sm>
                            <Card key={movie.id}>
                                <h2 className="text-wrap">{movie.title}</h2>
                                <p>{movie.releaseYear}</p>
                                <p>{movie.director.firstName}</p>
                            </Card>
                        </Col>
                        <Col sm>
                            {isMobile ? (
                                <>
                                    <Button onClick={() => setShowComments(!showComments)}
                                        aria-controls="commentsPane"
                                        aria-expanded={showComments}>
                                        {showComments ? "Hide" : "Show"} comments
                                    </Button>
                                    <Collapse in={showComments}>
                                        <div id="commentsPane">
                                            <h2>Reviews</h2>
                                            {movie.reviews && movie.reviews.map(review => (
                                                <p>{review.content}</p>
                                            ))}
                                        </div>
                                    </Collapse>
                                </>
                            ) : (
                                <>
                                    <div id="commentsPane">
                                        <h2>Reviews</h2>
                                        {movie.reviews && movie.reviews.map(review => (
                                            <p>{review.content}</p>
                                        ))}
                                    </div>
                                </>
                            )}
                        </Col>
                    </Row>
                    /// TODO - More Like this
                    <h2>More like this</h2>
                </Container>
            ) : null}
        </>
    )
}

