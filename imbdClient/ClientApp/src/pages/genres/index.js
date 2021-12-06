// Packages
import React, { useEffect, useState } from 'react';
// Components
import Carousel from '../../components/Carousel'
// Bootstrap

export default function Movies() {
    const [genres, setGenres] = useState(null)
    //const { movies, dispatch } = useContext(Context)
    useEffect(() => {
        if (!genres) {
            fetch(`${process.env.REACT_APP_API}/Genres`)
                .then(response => response.json())
                .then(data => setGenres(data))
        }
    }, [genres])


    return (
        <>
            <h2>Genres</h2>
            {genres && genres.map(genre =>
                <React.Fragment key={ genre.id }>
                    <h4>{genre.name}</h4>
                    <Carousel list={genre.movies} />
                </React.Fragment>
            )}
        </>
    )
}

//{
//    isMobile ?
//        <Carousel style={{ backgroundColor: "black", color: "white", height: "500px" }}>
//            {likeThis.map(m =>
//                <Carousel.Item>
//                    <h2 style={{ color: "yellow" }}>{m.title}</h2>
//                </Carousel.Item>
//            )}
//        </Carousel>
//        :
//        <Carousel interval={null} style={{ backgroundColor: "black", color: "red", height: "500px" }}>
//            {likeThis.length > 0 && setItems()}
//        </Carousel>
//}