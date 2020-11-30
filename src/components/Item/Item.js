import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Item = ({ product }) => {
    const { title, description, price, image } = product;

    return (

        <Card>
            <Link to={'/item/' + product.id}>
                <Card.Img variant="top" src={'../../' + image.path} />
                <Card.Body>
                    <Card.Title>
                        { title }
                    </Card.Title>
                    <Card.Text>
                        { description }
                    </Card.Text>
                    <Button variant="primary">
                        $ { price.toFixed(2) }.-
                    </Button>
                </Card.Body>
            </Link>
        </Card>

    );
};

export default Item;


// <div className="link">
//     <a href={'/item/' + product.id}>
//         <div className="counter link__item" style={{ width: "15rem" }}>
//             <div className="counter__content">
//                 <h5 className="card-title">{title}</h5>
//                 <img
//                     src={'../../' + image.path}
//                     className="card-img-top"
//                     alt="Imagen de Producto"
//                     width="75px;"
//                 />
//                 <p>{description}</p>
//                 <h6>${price}</h6>
//             </div>
//         </div>
//     </a>
// </div>
