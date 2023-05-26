// eslint-disable-next-line no-unused-vars
import React from 'react';
import spinner from '../assets/images/spinner.gif';



// eslint-disable-next-line react-refresh/only-export-components
export default () => {
    return (
        <div className="spinner">
            <img
                src={spinner}
                alt="Loading..."
            />
        </div>
    );
};