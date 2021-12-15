// Packages
import React, { useContext, useState } from 'react'
// Components
import { postData } from '../../api'
import Context from '../../context/globalState'
// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" })
    const { dispatch } = useContext(Context)
    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault()
        postData("Users/login", form)
            .then(d => {
                if (d.status == 200) {
                    return d.json()
                }
                throw new Error
            })
            .then(json => {
                console.log(json)
                localStorage.setItem("token", json.token)
                dispatch({ action: "setUser", data: json.user })
                navigate('/')
            })
            .catch(e => { })
    }
    return (
        <Row className="justify-content-md-center">
            <Col md="8" lg="6">
                <h2>Login Page</h2>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" />
                    </Form.Group>
                    <Button type="submit" variant="primary">Log Up</Button>
                </Form>
            </Col>
        </Row>
    )
}