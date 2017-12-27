import React from 'react';

export default function StudentApp(props) {

    return (
        <div id="studentApp">
            <h3>Welcome to Student App</h3>
            {
                // props.children,
                // shows property of chhildren components
            }
            {props.children}
        </div>
    );
}