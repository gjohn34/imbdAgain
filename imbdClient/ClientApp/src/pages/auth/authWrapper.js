// Packages
import React, { useContext, useState, useEffect } from 'react'
// Components
import { postData } from '../../api'
import Context from '../../context/globalState'
// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Alert from 'react-bootstrap/esm/Alert'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

export default function AuthWrapper(props) {
    const [form, setForm] = useState({ username: "", password: "" })
    const [error, setError] = useState(false)
    const { user, dispatch } = useContext(Context)
    let navigate = useNavigate();
    let location = useLocation();
    const path = location.pathname == "/auth/register" ? "register" : "login"

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault()
        postData(`Users/${path}`, form)
            .then(d => {
                console.log(d)
                if (d.ok) {
                    return d.json()
                }
                throw new Error
            })
            .then(json => {
                localStorage.setItem("token", json.token)
                dispatch({ action: "setUser", data: json.user })
                navigate(-1)
            })
            .catch(e => {
                setError(true)
            })
    }

    return (
        <Row className="justify-content-md-center">
            <Col md="8" lg="6">
                <Outlet />
                <Form onSubmit={handleSubmit} >
                    {error && <Alert variant='dark'>Invalid Credentials Beep Bop</Alert>}
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" />
                    </Form.Group>
                    <Button type="submit" variant="primary">{path == "register" ? "Sign Up" : "Log In"}</Button>
                </Form>
            </Col>
        </Row>
        )
}

