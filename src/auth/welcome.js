import React from 'react';
import { MediaBox, Container } from 'react-materialize';

export default function (props) {
    // console.log('ucitaj')
    return (
        <Container>

            <div id="welcome">

                <MediaBox src="../../public/images/flaskIcon" caption="Logo" width="50px" />

                <h3>CloudNotebook</h3>

                {
                    // shows property of chhildren components
                }
                {props.children}

            </div>

        </Container>
    )
}