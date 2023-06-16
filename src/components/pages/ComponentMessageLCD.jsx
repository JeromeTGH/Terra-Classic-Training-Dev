import React from 'react';

const ComponentMessageLCD = (props) => {
    return (
        <>
            <br />
            <p>Erreur retournée par le LCD : {props.message}</p>
            <br />
        </> 
    );
};

export default ComponentMessageLCD;