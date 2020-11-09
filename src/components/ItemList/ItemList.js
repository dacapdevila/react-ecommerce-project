import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = () => {

    const arrayProducts = [
        {
            id: 1,
            name: 'Coca Cola',
            description: 'Alto en azucares',
            image: '../../assets/coca-cola.webp',
            stock: 2,
            price: 139.99
        },
        {
            id: 2,
            name: 'Fanta',
            description: 'Tambien es alta en azucares',
            image: '../../assets/fanta.webp',
            stock: 4,
            price: 152.19
        },
        {
            id: 3,
            name: 'Pepsi Light',
            description: 'Copia de la coca cola',
            image: '../../assets/pepsi-light.webp',
            stock: 6,
            price: 114.99
        },
        {
            id: 4,
            name: 'Seven Up',
            description: 'Ideal si estas enfermo',
            image: '../../assets/seven-up.webp',
            stock: 8,
            price: 99.00
        },
        {
            id: 5,
            name: 'Manaos',
            description: 'Popular',
            image: '../../assets/manaos.webp',
            stock: 10,
            price: 60.19
        }
    ];
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect( () => {
        setLoader(true);

        let loadProducts = new Promise((resolve, reject) => {
            console.log('ejecutando loadProducts');
            setTimeout(function(){
                resolve(
                    arrayProducts
                );
            }, 2000);
        });

        loadProducts.then( ( successMessage ) => {
            setProducts(successMessage);
        });

        loadProducts.finally( () => {
                setLoader(false);
            }
        );

    }, []);


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
