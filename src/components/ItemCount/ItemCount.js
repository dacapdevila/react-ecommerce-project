import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import './ItemCount.css';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const ItemCount = ({ initial, min, max, setQuantity }) => {
    const [counter, setCounter] = useState(initial);

    const handleDecrement = () => {
        counter > min ? setCounter(counter - 1) : console.log("Esto se imprime cuando esta en 0");
    };

    const handleIncrement = () => {
        counter < max ? setCounter(counter + 1) : console.log("Esto se imprime cuando se alcanza el limite del stock del producto");
    };

    useEffect(() => {
        setQuantity(counter);
    }, [counter, setQuantity]);

    return (
        <Card>
            <Card.Body>
                <Button variant="outline-primary" onClick={handleDecrement}>
                    <RemoveIcon/>
                </Button>
                <Button variant="outline-info">
                    { counter }
                </Button>
                <Button variant="outline-primary" onClick={handleIncrement}>
                    <AddIcon/>
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ItemCount;
