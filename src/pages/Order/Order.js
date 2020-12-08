import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Title from "../../ui/Title/Title";
import Loading from "../../components/Loading/Loading";
import CartTable from "../../components/CartTable/CartTable";

const Order = () => {

    const { firebase } = useContext( FirebaseContext );
    const [ loading, setLoading ] = useState(true);
    const [ orderResult, setOrderResult ] = useState(null);
    const { orderId } = useParams();

    useEffect( () => {
        const orderCollection = firebase.db.collection('orders');
        const orderResult = orderCollection.doc( orderId );

        orderResult.get().then( ( doc ) => {
            if ( !doc.exists ) {
                console.log('Item does not exist!');
                return;
            }
            console.log('Item found');
            setOrderResult({ id: doc.id, ...doc.data() });
        }).catch( ( error )=> {
            console.log('Error searching order', error);
        }).finally( () => {
            setLoading(false);
        });
    }, [ orderId ]);



    return (
        <div>
            <Title title="Resultados de la búsqueda" />
            {
                loading ? (
                    <Loading text="Cargando la orden ..." />
                ) : (
                    <div>
                        <CartTable order={orderResult} title={`Resumen de la compra con id: ${orderId}`} />
                    </div>
                )
            }
            {/*<CartTable />*/}
        </div>
    );
}

export default Order;
