import React from 'react';

const PageAccountMessageLCD = (props) => {
    return (
        <>
            <br />
            <p>Erreur retournée par le LCD : {props.message}</p>
            <br />
        </> 
    );
};

export default PageAccountMessageLCD;