import React, { useState, useEffect } from "react";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import Loading from "../Loading/Loading";
import Item from "../Item/Item";
import {getFirestore} from "../../firebase";

const ItemList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection('items');

        itemCollection.get().then( (querySnapshot) => {
            if (querySnapshot.size === 0) {
                console.log('No hay resultados');
            }
            setProducts(
                querySnapshot.docs.map( (doc) => {
                    return { id: doc.id, ...doc.data() };
                })
            )
        }).catch( (error) => {
            console.log('Error en la busqueda', error);
        }).finally( () => {
            setLoading(false);
        });

    }, []);


    return (
        <div className="list-container" id="list-container">
            {loading ? (
                <p>Cargando productos</p>
            ) : (
                <div className="list-container_details">
                    <div className="list-container_details-title">
                        <h3>Productos</h3>
                    </div>
                    <div className="list-container_list">
                        {products.map((product) => {
                            return (
                                <ItemDetailContainer
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
