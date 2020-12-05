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
                    <Button variant="dark" disabled={true}>
                        $ { price.toFixed(2) }.-
                    </Button>
                </Card.Body>
            </Link>
        </Card>

    );
};

export default Item;
