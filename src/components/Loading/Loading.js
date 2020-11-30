import React from "react";
import './Loading.css';

const Loading = ({ text }) => {
    return (
        <div className="loading">
            <div className="spinner"></div>
            <p>{text}</p>
        </div>
    );
};

export default Loading;
