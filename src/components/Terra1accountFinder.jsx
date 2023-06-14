import React, { useEffect, useState } from 'react';
import { LCDClient, Coins } from '@terra-money/terra.js';

const Terra1accountFinder = () => {

    // Adresse du compte visé
    const addresse = 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v';
    const reseau = 'Terra Classic';
    const IDchaine = 'columbus-5';
    const LCDurl = 'https://columbus-lcd.terra.dev';

    // Tableau de correspondance des valeurs
    const tblCorrespondanceValeurs = {
        "uluna": "Lunc",
        "uusd": "USTC",
        "uaud": "AUTC",
        "ucad": "CATC",
        "uchf": "CHTC",
        "ucny": "CNTC",
        "udkk": "DKTC",
        "ueur": "EUTC",
        "ugbp": "GBTC",
        "uhkd": "HKTC",
        "uidr": "IDTC",
        "uinr": "INTC",
        "ujpy": "JPTC",
        "ukrw": "KRTC",
        "umnt": "MNTC",
        "umyr": "MYTC",
        "unok": "NOTC",
        "uphp": "PHTC",
        "usdr": "SDTC",
        "usek": "SETC",
        "usgd": "SGTC",
        "uthb": "THTC",
        "utwd": "TWTC"
    }

    // Tableau qui contiendra la liste des lignes à afficher
    const [balanceDuCompte, setBalanceDuCompte] = useState([]);

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
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
        <>
            <div>Détail du compte : <strong>{addresse}</strong></div>
            <p>Réseau <strong>{reseau} ({IDchaine})</strong><br />
            URL du LCD : <strong>{LCDurl}</strong></p>
            <br />        
            <table border="1" cellpadding="10px" cellspacing="0px">
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
                                    <td>{tblCorrespondanceValeurs[data.denom]}</td>
                                </tr>
                            } else {
                                return null;
                            }

                        })
                    }
                </tbody>
            </table>
        </>
    );
};

export default Terra1accountFinder;