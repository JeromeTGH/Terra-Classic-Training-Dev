import React, { useEffect } from 'react';
import { useState } from 'react';
import { LCDClient, Coins } from '@terra-money/terra.js';

const Finder = () => {

    const addresse = 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v';
    const [balanceDuCompte, setBalanceDuCompte] = useState([]);

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: 'https://columbus-lcd.terra.dev',
        chainID: 'columbus-5',
        isClassic: true
    });

    useEffect(() => {
        // Chargement d'un compte donné (via son adresse)
        lcd.bank.balance(addresse).then(res => {
            // console.log("Résultat", res[0]);
            const mesCoins = new Coins(res[0]);
            setBalanceDuCompte(mesCoins.toData());           
        }).catch(err => {
            console.log(err);
        })
        
    }, [])


    // const offerCoin = new Coin('uusd', '1000000');
    // terra.market.swapRate(offerCoin, 'ukrw').then(c => {
    // console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
    // });
    

    return (
        <div>
            <br />
            Détail du compte : <strong>{addresse}</strong>
            <br />
            <br />
        
            <table border="1">
                <thead>
                    <tr>
                        <th>Ligne</th>
                        <th>Montant</th>
                        <th>Désignation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        balanceDuCompte.map((data, index) => {
                            if(data.denom.charAt(0) === 'u') {
                                return <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{data.amount / 1000000.0}</td>
                                    <td>{data.denom}</td>
                                </tr>
                            } else {
                                return null;
                            }

                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Finder;