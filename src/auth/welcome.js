import React from 'react';

export default function (props) {

    return (
        <div id="welcom">
            <h3>Welcome to Lab Notebook...we need a catchy name</h3>
            {
                // shows property of chhildren components
            }
            {props.children}
        </div>
    );
}