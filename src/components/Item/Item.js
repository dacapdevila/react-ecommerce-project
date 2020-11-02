import React from "react";
import "./Item.css";

const Item = ({ product }) => {
    const { name, description, price, image } = product;

    return (
        <div className="link">
            <a href={'/item/' + product.id}>
                <div className="counter link__item" style={{ width: "15rem" }}>
                    <div className="counter__content">
                        <h5 className="card-title">{name}</h5>
                        <img
                            src={image}
                            className="card-img-top"
                            alt="Imagen de Producto"
                            width="75px;"
                        />
                        <p>{description}</p>
                        <h6>${price}</h6>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Item;
