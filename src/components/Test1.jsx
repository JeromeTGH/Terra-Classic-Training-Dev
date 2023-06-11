import React, { useEffect } from 'react';
import { useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';

const Test1 = () => {

    const [balanceDuCompte, setBalanceDuCompte] = useState([]);

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: 'https://columbus-lcd.terra.dev',
        chainID: 'columbus-5',
        isClassic: true
    });

    // Chargement d'un compte donné (via son adresse)
    const addresse = 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v';
    lcd.bank.balance(addresse).then(res => {
        console.log("Résultat", res);
        setBalanceDuCompte(res);
    }).catch(err => {
        console.log(err);
    })


    // useEffect(() => {
        
    // }, [balanceDuCompte])


    // const offerCoin = new Coin('uusd', '1000000');
    // terra.market.swapRate(offerCoin, 'ukrw').then(c => {
    // console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
    // });
    

    return (
        <div>
            Voir console
        </div>
    );
};

export default Test1;