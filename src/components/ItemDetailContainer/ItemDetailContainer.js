import React, { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loading from "../Loading/Loading";

const ItemDetailContainer = ({ product }) => {
    const [article, setArticle] = useState();
    const [loading, setLoading] = useState(true);

    const getProduct = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(product);
            }, 3000);
        });
    };

    useEffect(() => {
        let isSubscribed = true;
        getProduct().then((data) => {
                if (isSubscribed) {
                    setArticle(data);
                    setLoading(false);
                }
            })
            .catch(() => console.log("rejected"));

        return () => (isSubscribed = false);
    }, []);

    return loading ? (
        <Loading text="Cargando ..." />
    ) : (
        <div>
            <ItemDetail product={article} />
        </div>
    );
};

export default ItemDetailContainer;