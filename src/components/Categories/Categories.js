import { Link } from "react-router-dom";
import React, {Fragment, useContext, useEffect, useState} from "react";
import { ListGroup } from 'react-bootstrap';
import { FirebaseContext } from '../../firebase';
import Loading from "../Loading/Loading";

const Categories = () => {

    const [ loading, setLoading ] = useState(true);
    const { firebase } = useContext( FirebaseContext );
    const [ cats, setCats] = useState([]);


    useEffect( () => {
        const categoriesCollection = firebase.db.collection('categories').get().then( (querySnapshot) => {
            if ( querySnapshot.size === 0 ) {
                console.log('No hay resultados');
            }
            setCats(
                querySnapshot.docs.map( (doc) => {
                    return { id: doc.id, ...doc.data()};
                })
            );
        }).catch( (error) => {
            console.log('Error en la busqueda', error);

        }).finally( () => {
            setLoading(false);
        });
    }, []);

    return(
        <Fragment>
            <h3 className="mb-3">
                Categorías
            </h3>
            { loading ? (
                <Loading text="Cargando..." />
            ) : (
                <ListGroup as="ul">
                    { cats.map( (category) => {
                        return <ListGroup.Item as="li" key={category.id} variant="primary">
                            <Link to={`/categories/${category.id}`}>
                                {category.description}
                            </Link>
                        </ListGroup.Item>
                    })}
                    <ListGroup.Item as="li" variant="primary">
                        <Link to="/">
                            Todos
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            )}
        </Fragment>
    )
}

export default Categories;


