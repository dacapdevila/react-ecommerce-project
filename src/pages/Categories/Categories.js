import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Loading from "../../components/Loading/Loading";
import firebase from "../../firebase";
import {Container, Row, Col} from "react-bootstrap";
import Title from "../../ui/Title/Title";

const Categories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect( () => {
        const db = firebase.db;
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
        <Container>
            <Title title={`Categoria ${categoryId}`} />
            {
                loading ? (
                    <Loading text="Cargando productos de la categoria" />
                ) : (
                    <Row>
                        {products.map((product) => {
                            return <Col sm={12} md={4} lg={4} xl={4}>
                                        <ItemDetail product={product} key={product.id} />;
                                    </Col>
                        })}

                    </Row>
                )
            }
        </Container>
    );
}

export default Categories;
