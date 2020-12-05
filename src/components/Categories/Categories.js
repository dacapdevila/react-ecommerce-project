import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { ListGroup } from 'react-bootstrap';


const Categories = () => {

    return(
        <Fragment>
            <h3 className="mb-3">
                Categorías
            </h3>
            <ListGroup as="ul">
                <ListGroup.Item as="li" variant="primary">
                    <Link to="/categories/1">
                        Gaseosas
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" variant="primary">
                    <Link to="/categories/2">
                        Alfajores
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" variant="primary">
                    <Link to="/">
                        Todos
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </Fragment>
    )
}

export default Categories;


