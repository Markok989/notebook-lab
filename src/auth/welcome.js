import React from 'react';

export default function (props) {
    // console.log('ucitaj')
    return (
        <div id="welcome">

            <figure>
                <img src="/public/images/flaskIcon.png" alt="DreamLab NB log pink flask" />
            </figure>

            <h3>CloudNotebook</h3>

            {
                // shows property of chhildren components
            }
            {props.children}
        </div>
    )
}