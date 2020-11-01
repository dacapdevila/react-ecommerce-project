import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
// import "./ItemCount.css"; // No agregados aún.

const ItemCount = ({ initial, min, max, setQuantity }) => {
    const [counter, setCounter] = useState(initial);

    const handleDecrement = () => {
        counter > min ? setCounter(counter - 1) : console.log("Esto se imprime cuando esta en 0");
    };

    const handleIncrement = () => {
        counter < max ? setCounter(counter + 1) : console.log("Esto se imprime cuando se alcanza el limite del stock del producto");
    };

    useEffect(() => {
        setQuantity(counter);
    }, [counter, setQuantity]);

    return (
        <div className="counter">
            <div className="counter_content">
                <div className="counter_content-controls">
                      <span className="counter_content-controls-subtract-icon" onClick={handleDecrement}>
                        <RemoveIcon/>
                      </span>
                    <span className="counter_content-controls-counter-value"> {counter} </span>
                    <span className="counter_content-controls-add-icon" onClick={handleIncrement}>
                        <AddIcon/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ItemCount;
