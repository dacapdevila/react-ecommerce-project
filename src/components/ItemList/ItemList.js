import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import firebase from "../../firebase";
import Loading from "../Loading/Loading";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";

const ItemList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        const itemCollection = firebase.db.collection('items');

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
        <Container fluid>
            {loading ? (
                <Loading text="" />
            ) : (
                <Row>
                    <Col md={2} lg={2} xl={2}>
                        <Categories />
                    </Col>
                    <Col md={10} lg={10} xl={10}>
                        <Products products={products} />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ItemList;
