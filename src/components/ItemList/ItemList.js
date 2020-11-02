import React, { useState } from "react";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = () => {

    const arrayProducts = [
        {
            id: 1,
            name: 'Coca Cola',
            description: 'Alto en azucares',
            image: '../../assets/coca.jpg',
            stock: 2,
            price: 1.00
        },
        {
            id: 2,
            name: 'Fanta',
            description: 'Tambien es alta en azucares',
            image: '../../assets/fanta.jpg',
            stock: 4,
            price: 3.50
        },
        {
            id: 3,
            name: 'Pepsi',
            description: 'Copia de la coca cola',
            image: '../../assets/pepsi.webp',
            stock: 6,
            price: 8.50
        },
        {
            id: 4,
            name: 'Seven Up',
            description: 'Ideal si estas enfermo',
            image: '../../assets/seven-up.jpg',
            stock: 8,
            price: 6.50
        },
        {
            id: 5,
            name: 'Manaos',
            description: 'Popular',
            image: '../../assets/manaos.webp',
            stock: 10,
            price: 10.50
        }
    ];
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true);

    let loadProducts = new Promise((resolve, reject) => {
        console.log('ejecutando loadProducts'); // Por que se esta ejecutando tantas veces en la consola?
        setTimeout(function(){
            resolve(
                setProducts(arrayProducts)
            );
        }, 2000);
    });

    loadProducts.finally( () => {
        setLoader(false);
        }
    );


    return (
        <div className="list-container" id="list-container">
            {loader ? (
                <p>Cargando productos</p>
            ) : (
                <div className="list-container_details">
                    <div className="list-container_details-title">
                        <h3>Productos</h3>
                    </div>
                    <div className="list-container_list">
                        {products.map((product) => {
                            return (
                                <Item
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemList;
