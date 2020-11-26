import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Loading from "../../components/Loading/Loading";
import { getFirestore } from "../../firebase";

const Categories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect( () => {
        const db = getFirestore();
        const itemCollection = db.collection('items');
        const itemsByCategory = itemCollection.where(
            'categoryId',
            '==',
            parseFloat(categoryId)
        );

        itemsByCategory
            .get()
            .then( (querySnapshot) => {
            if ( querySnapshot.size === 0 ) {
                console.log('No hay resultados');
            }
            setProducts(
                querySnapshot.docs.map( (doc) => {
                    return { id:doc.id, ...doc.data() };
                } )
            );
        } ).catch( (error) => {
            console.log('Error en la busqueda', error);
        }).finally( () => {
            setLoading(false);
        } );
    }, [categoryId]);

    return (
        <div className="categories">
            <h1>Categoria {categoryId}</h1>
            {
                loading ? (
                    <Loading text="Cargando productos" />
                ) : (
                    <div className="categories_list">
                        {products.map((product) => {
                            return <ItemDetail product={product} key={product.id} />;
                        })}
                    </div>
                )
            }
        </div>
    );
}

export default Categories;
