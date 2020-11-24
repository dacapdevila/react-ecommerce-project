import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount";
import Loading from "../../components/Loading/Loading";
import CartContext from "../../globals/cartContext";

const ItemDetailPage = () => {
    const { setCart, setQnt } = useContext(CartContext);
    const [article, setArticle] = useState();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        let isSubscribed = true;
        const arrayProducts = [
            {
                id: 1,
                name: 'Coca Cola',
                description: 'Alto en azucares',
                image: '../../assets/coca-cola.webp',
                stock: 2,
                price: 139
            },
            {
                id: 2,
                name: 'Fanta',
                description: 'Tambien es alta en azucares',
                image: '../../assets/fanta.webp',
                stock: 4,
                price: 152
            },
            {
                id: 3,
                name: 'Pepsi Light',
                description: 'Copia de la coca cola',
                image: '../../assets/pepsi-light.webp',
                stock: 6,
                price: 114
            },
            {
                id: 4,
                name: 'Seven Up',
                description: 'Ideal si estas enfermo',
                image: '../../assets/seven-up.webp',
                stock: 8,
                price: 99
            },
            {
                id: 5,
                name: 'Manaos',
                description: 'Popular',
                image: '../../assets/manaos.webp',
                stock: 10,
                price: 60
            }
        ];

        let loadProduct = new Promise((resolve, reject) => {
            console.log('ejecutando loadProducts');
            resolve(
                arrayProducts
            );
        });

        loadProduct
            .then((pro) => {
                if (!pro.exists) {
                    console.log("Item does not exist!");
                    return;
                }
                if (isSubscribed) {
                    console.log("Item found!");
                    setProduct({ id: pro.id, ...pro.data() });
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
            name: article.name,
            description: article.description,
            stock: article.stock,
            price: article.price,
            brand: article.brand,
            model: article.model,
            quantity: article.quantity,
            gender: article.gender,
            image: article.image,
        };

        setCart((value) => [...value, prod]);
    };

    return (
        <div className="itemPage">
            {loading ? (
                <div className="loading-items" style={{ margin: "0 auto" }}>
                    <Loading text="Cargando productos..." />
                </div>
            ) : (
                <div className="container itemPage__detail">
                    <div className="row">
                        {/* IMAGE */}
                        <div className="col-sm-12 col-md-8 itemPage__detail-image">
                            <div>
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt="Imagen de Producto"
                                />
                            </div>
                        </div>
                        {/* BUY */}
                        <div className="col-sm-12 col-md-4 itemPage__detail-buy">
                            <div>
                                <div className="counter item itemPage__detail-buy-sale">
                                    <div className="">
                                        <h3 className="card-title">{product.name}</h3>
                                        <p>{product.description}</p>
                                        <h3>${product.price}</h3>
                                        <h6>Stock: {product.stock}</h6>
                                    </div>
                                    <div className="itemPage__detail-buy-sale-buttons">
                                        <ItemCount
                                            initial={1}
                                            min={0}
                                            max={product.stock}
                                            setQuantity={setQuantity}
                                        />
                                        <div className="counter btn-buy" style={{ width: "15rem" }}>
                                            <div className="counter__buttonAdd">
                                                <button onClick={handleClick}>
                                                    Agregar al carrito {quantity}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DESCRIPTION */}
                        <div className="col-sm-12 col-md-8 itemPage__detail-description">
                            <div className="itemPage__details">
                                <h3>Características:</h3>
                                <h5>Marca: {product.brand}</h5>
                                <h5>Modelo: {product.model}</h5>
                                {product.gender && <h5>Género: {product.gender}</h5>}
                                <h3>Descripción:</h3>
                                <h5>{product.description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetailPage;
