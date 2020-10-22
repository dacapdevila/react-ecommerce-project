import React from "react";
import "./Home.css";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const Home = ({ gretting }) => {
    return (
        <Box bgcolor="warning.main" >
            <Typography variant="h4" component="h1" color="primary">
                { gretting }
            </Typography>
        </Box>
    );
};

export default Home;
