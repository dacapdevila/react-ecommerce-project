import React, {useState, useEffect, useContext, Fragment} from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount";
import Loading from "../../components/Loading/Loading";
import CartContext from "../../globals/cartContext";
import firebase from "../../firebase";
import Item from "../../components/Item/Item";
import {Container, Row, Button, Card, Col} from "react-bootstrap";

const ItemDetailPage = ({ onAdd }) => {
    const { setCart, setQnt } = useContext(CartContext);
    const [article, setArticle] = useState();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        let isSubscribed = true;
        const db = firebase.db;
        const itemCollection = db.collection("items");
        const item = itemCollection.doc(id);

        item
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("Item does not exist!");
                    return;
                }
                if (isSubscribed) {
                    console.log("Item found!");
                    setProduct({ id: doc.id, ...doc.data() });
                }
            })
            .catch((error) => {
                console.log("Error searching items", error);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => (isSubscribed = false);
    }, [id]);

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
            stock: article.stock,
            price: article.price,
            quantity: article.quantity,
            image: article.image,
        };

        setCart((value) => [...value, prod]);
    };

    return (
        <div className="itemPage">
            {loading ? (
                <div className="loading-items" style={{ margin: "0 auto" }}>
                    <Loading text="Cargando producto..." />
                </div>
            ) : (
                <Fragment>
                    <Container>
                        <Row className="justify-content-center">
                            <Col sm={12} md={8} lg={8} xl={8}>
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
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            )}
        </div>
    );
};

export default ItemDetailPage;





// <div className="container itemPage__detail">
//     <div className="row">
//         {/* IMAGE */}
//         <div className="col-sm-12 col-md-8 itemPage__detail-image">
//             <div>
//                 <img
//                     src={'../../' + product.image.path}
//                     className="card-img-top"
//                     alt="Imagen de Producto"
//                     width="75px;"
//                 />
//             </div>
//         </div>
//         {/* BUY */}
//         <div className="col-sm-12 col-md-4 itemPage__detail-buy">
//             <div>
//                 <div className="counter item itemPage__detail-buy-sale">
//                     <div className="">
//                         <h3 className="card-title">{product.title}</h3>
//                         <p>{product.description}</p>
//                         <h3>${product.price}</h3>
//                         <h6>Stock: {product.stock}</h6>
//                     </div>
//                     <div className="itemPage__detail-buy-sale-buttons">
//                         <ItemCount
//                             initial={1}
//                             min={0}
//                             max={product.stock}
//                             setQuantity={setQuantity}
//                         />
//                         <div className="counter btn-buy" style={{ width: "15rem" }}>
//                             <div className="counter__buttonAdd">
//                                 <button onClick={handleClick}>
//                                     Agregar al carrito {quantity}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         {/* DESCRIPTION */}
//         <div className="col-sm-12 col-md-8 itemPage__detail-description">
//             <div className="itemPage__details">
//                 <h3>Descripción:</h3>
//                 <h5>{product.description}</h5>
//             </div>
//         </div>
//     </div>
// </div>
