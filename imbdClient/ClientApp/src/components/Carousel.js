// Packages
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../context/globalState'
// Components
import FlexCollection, { Card } from './FlexContainer'
// Bootstrap
import Carousel from 'react-bootstrap/Carousel'

export default function CarouselHelper({ list }) {
    const { isMobile } = useContext(Context)
    

    const setItems = () => {
        let count = 0
        let array = []
        let subArray = []
        list.forEach(m => {
            if (count < Math.floor((window.innerWidth - 300) / 250)) {
                subArray.push(
                    <Link reloadDocument to={`/movies/${m.id}`} key={m.id}>
                        <Card>
                            <h2 className="text-wrap">{m.title}</h2>
                            <p>{m.releaseYear}</p>
                        </Card>
                    </Link>
                )
            } else {
                count = 0
                array.push(
                    <Carousel.Item key={array.length}>
                        <FlexCollection>
                            {subArray}
                        </FlexCollection>
                    </Carousel.Item>
                )
                subArray = [
                    <Link reloadDocument to={`/movies/${m.id}`} key={m.id} >
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
            <Carousel.Item key={array.length}>
                <FlexCollection>
                    {subArray}
                </FlexCollection>
            </Carousel.Item>
        )

        return array
    }

    return (
        isMobile ?
            <Carousel style={{ backgroundColor: "black", color: "white", height: "500px" }}>
                {list.map(m =>
                    <Carousel.Item key={m.id}>
                        <h2 style={{ color: "yellow" }}>{m.title}</h2>
                    </Carousel.Item>
                )}
            </Carousel>
            :
            <Carousel interval={null} style={{ backgroundColor: "black", color: "red", height: "500px" }}>
                {list.length > 0 && setItems()}
            </Carousel>
    )
}


