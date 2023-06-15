import React from 'react';

const PageBlockMessageLCD = (props) => {
    return (
        <>
            <br />
            <p>Erreur retournée par le LCD : {props.message}</p>
            <br />
        </> 
    );
};

export default PageBlockMessageLCD;