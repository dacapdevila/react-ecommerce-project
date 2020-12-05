import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Notification = ( { message } ) => {

    toast( message );

    return (
        <div>
            <button onClick={notify}>Notify !</button>
            <ToastContainer />
        </div>
    );
}

export default Notification;
