import React from 'react';

const ComponentErreurLCD = (props) => {
    return (
        <>
            <br />
            <p>Erreur retournée par le LCD : {props.erreur}</p>
            <br />
        </> 
    );
};

export default ComponentErreurLCD;