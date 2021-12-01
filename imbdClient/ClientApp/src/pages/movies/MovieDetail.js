// Packages
import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams} from 'react-router-dom'
import Context from '../../context/globalState'
import { getData } from '../../api'
// Components
import FlexCollection, { Card } from '../../components/FlexContainer'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Carousel from 'react-bootstrap/Carousel'

export default function MovieDetailPage() {
    let { id } = useParams();
    const { isMobile } = useContext(Context)
    const [movie, setMovie] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const [likeThis, setLikeThis] = useState([])

    const setItems = () => {
        let count = 0
        let array = []
        let subArray = []
        likeThis.forEach(m => {
            if (count < Math.floor((window.innerWidth - 300) / 250)) {
                subArray.push(
                    <Link reloadDocument to={`/movies/${m.id}`}>
                        <Card>
                            <h2 className="text-wrap">{m.title}</h2>
                            <p>{m.releaseYear}</p>
                        </Card>
                    </Link>
                )
            } else {
                count = 0
                array.push(
                    <Carousel.Item>
                        <FlexCollection>
                            {subArray}
                        </FlexCollection>
                    </Carousel.Item>
                )
                subArray = [
                    <Link reloadDocument to={`/movies/${m.id}`} >
                        <Card>
                            <h2 className="text-wrap">{m.title}</h2>
                            <p>{m.releaseYear}</p>
                        </Card>
                    </Link>
                ]
            }
            count += 1

        })
        array.push(
            <Carousel.Item>
                <FlexCollection>
                    {subArray}
                </FlexCollection>
            </Carousel.Item>
        )

        return array
    }

    useEffect(() => {
        if (!movie || id != movie.id) {
            getData(`Movies/${id}`)
                .then(response => response.json())
                .then(data => setMovie(data))

            getData(`Movies/${id}/More`)
                .then(response => response.json())
                .then(data => setLikeThis(data))
        }

    }, [id])


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
                    <h2>More like this</h2>
                    {isMobile ? 
                        <Carousel style={{ backgroundColor: "black", color: "white", height: "500px" }}>
                            {likeThis.map(m =>
                                <Carousel.Item>
                                    <h2 style={{ color: "yellow" }}>{m.title}</h2>
                                </Carousel.Item>
                            )}
                        </Carousel>
                        :
                        <Carousel interval={null} style={{ backgroundColor: "black", color: "red", height: "500px" }}>
                            {likeThis.length > 0 && setItems()}
                        </Carousel>
                    }
                </Container>
            ) : null}
        </>
    )
}


//{
//    filterByWidth().map(row =>
//        <Carousel.Item>
//            {row.map(c => <span style={{ width: "200px" }}>{c.title}</span>)}
//        </Carousel.Item>
//    )
//}

