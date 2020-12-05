import React, { useState, useEffect, useContext, Fragment } from "react";
import ItemCount from "../ItemCount/ItemCount";
import Item from "../Item/Item";
import CartContext from "../../globals/cartContext";
import {Button, Card} from "react-bootstrap";

const ItemDetail = ({ product }) => {
    const { setCart, setQnt } = useContext(CartContext);
    const [article, setArticle] = useState();

    useEffect(() => {
        setArticle(product);
    }, [product]);

    const [quantity, setQuantity] = useState(1);

    const handleClick = () => {
        setQnt((value) => value + quantity);
        article.quantity = quantity;

        const prod = {
            id: article.id,
            name: article.title,
            description: article.description,
            image: article.image,
            stock: article.stock,
            price: article.price,
            quantity: article.quantity
        };

        setCart((value) => [...value, prod]);
    };

    return (
        <Fragment>
            <Item product={product} />
            <ItemCount
                initial={1}
                min={0}
                max={product.stock}
                setQuantity={setQuantity}
            />
            <Card className="mb-5">
                <Card.Footer>
                    <Button variant="outline-primary" onClick={handleClick}>
                        Comprar {quantity} {quantity > 1 ? 'unidades' : 'unidad' } de {product.title}
                    </Button>
                </Card.Footer>
            </Card>
        </Fragment>

    );
};

export default ItemDetail;
