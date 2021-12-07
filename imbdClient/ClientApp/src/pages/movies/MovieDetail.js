// Packages
import React, { useEffect, useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import Context from '../../context/globalState'
import { getData, postData } from '../../api'
// Components
import { Card } from '../../components/FlexContainer'
import Carousel from '../../components/Carousel'
// Bootstrap
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from "react-bootstrap/Form";


export default function MovieDetailPage() {
    let { id } = useParams();
    const { isMobile } = useContext(Context)
    const [movie, setMovie] = useState(null)
    const [showReviews, setShowReviews] = useState(false)
    const [likeThis, setLikeThis] = useState([])
    const [form, setForm] = useState({ content: "", score: undefined })
    const [validated, setValidated] = useState(false)


    useEffect(() => {
        if (!movie || id?.toString() !== movie.id) {
            getData(`Movies/${id}`)
                .then(response => response.json())
                .then(data => setMovie(data))

            getData(`Movies/${id}/More`)
                .then(response => response.json())
                .then(data => setLikeThis(data))
        }
    }, [movie, id])

    const handleSubmit = e => {
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation()
            e.preventDefault()
        } else {
            postData(`Movies/${id}/Reviews`, form)
                .then(response => response.ok && response.json())
                .then(d => setMovie({ ...movie, reviews: [...movie.reviews, d] }))
        }
        setValidated(true)
    }

    const reviewsSection = () => {
        return movie.reviews.length > 0 ? (
        <div id="reviewsPane">
                {movie.reviews && movie.reviews.map(review => (
                    <p key={review.id}>{review.content}</p>
            ))}
        </div>
        ) : <p>Be the first to review!</p>
    }



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
                            <h2>Reviews</h2>
                            <Form
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                                style={{ display: "flex", padding: "10px", flexWrap: "wrap" }}>
                                <Form.Group className="m-2 d-flex flex-column">
                                    <Button type="submit">Post</Button>
                                </Form.Group>
                                <Form.Group className="flex-grow-1 m-2" >
                                    <Form.Control
                                        as="textarea"
                                        required
                                        value={form.content}
                                        onChange={e => setForm({ ...form, content: e.target.value })}
                                        className="form-control"
                                    />
                                    {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                                    <Form.Control.Feedback type="invalid">
                                        Tell us your thoughts!.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Row style={{ width: "100%", textAlign: "center" }}>
                                    {form.score == null ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x =>
                                        <Col key={x}>
                                            <Button
                                                as="input"
                                                type="button"
                                                value={x}
                                                onClick={e => setForm({ ...form, score: e.target.value })}
                                                variant="outline-warning"
                                            />
                                        </Col>
                                    ) :
                                        <Col>
                                            <Button
                                                as="input"
                                                className="active"
                                                type="button"
                                                value={form.score}
                                                onClick={e => setForm({ ...form, score: null })}
                                                variant="outline-warning"
                                            />
                                        </Col>
                                    }
                                    <Form.Control required value={form.score} hidden />
                                    {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                                    <Form.Control.Feedback type="invalid">What score?</Form.Control.Feedback>
                                </Row>
                            </Form>
                            {isMobile ? (
                                <>
                                    <Button onClick={() => setShowReviews(!showReviews)}
                                        aria-controls="reviewsPane"
                                        aria-expanded={showReviews}>
                                        {showReviews ? "Hide" : "Show"} reviews
                                    </Button>
                                    <Collapse in={showReviews}>
                                        {reviewsSection()}
                                    </Collapse>
                                </>
                            ) : reviewsSection()}
                        </Col>
                    </Row>
                    <h2>More like this</h2>
                    <Carousel list={likeThis} />
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

