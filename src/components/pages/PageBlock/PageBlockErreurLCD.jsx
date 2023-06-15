import React from 'react';

const PageBlockErreurLCD = (props) => {
    return (
        <>
            <br />
            <p>Erreur retournée par le LCD : {props.erreur}</p>
            <br />
        </> 
    );
};

export default PageBlockErreurLCD;