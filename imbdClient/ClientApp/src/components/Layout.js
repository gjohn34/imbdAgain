import React from 'react';
import { Container } from 'reactstrap';

export default function Layout(props) {
    return (
        <Container id="main">
            {props.children}
        </Container>
    )
}