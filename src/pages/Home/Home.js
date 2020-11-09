
import React from "react";
import ItemList from "../../components/ItemList/ItemList";


const Home = ({ greeting }) => {
    return (
        <main className="home">
            <div className="home__title">
                <h1>{greeting}</h1>
            </div>
            <ItemList />
        </main>
    );
};

export default Home;