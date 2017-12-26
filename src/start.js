import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <HelloWolrd />,
    document.querySelector("main")
)

function HelloWolrd() {
    return (
        <div>Hello World</div>
    );
}