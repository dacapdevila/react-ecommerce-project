import React, { useState, useEffect, Fragment } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loading from "../Loading/Loading";

const ItemDetailContainer = ({ product }) => {
    const [article, setArticle] = useState();
    const [loading, setLoading] = useState(true);

    const getProduct = () => {
        return new Promise((resolve, reject) => {
            resolve(product);
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
        <Loading text="" />
    ) : (
        <Fragment>
            <ItemDetail product={article} />
        </Fragment>
    );
};

export default ItemDetailContainer;
