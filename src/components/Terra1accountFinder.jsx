import React, { useEffect, useState } from 'react';
import { LCDClient, Coins } from '@terra-money/terra.js';
import { useParams } from 'react-router-dom';

const Terra1accountFinder = () => {

    const [ etatPage, setEtatPage ] = useState('vide')

    // Récupération du numéro de compte, éventuellement passé en argument
    const { cptNum } = useParams();

    // Adresse du compte visé
    // const adresse = 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'; (pour tests)
    const adresse = cptNum;
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
        if(adresse === undefined)
        {
            setEtatPage('adresseManquante');
            return
        }

        // Chargement d'un compte donné (via son adresse)
        lcd.bank.balance(adresse).then(res => {
            console.log("Réponse LCD", res[0]);
            const mesCoins = new Coins(res[0]);
            setEtatPage('ok');
            setBalanceDuCompte(mesCoins.toData());           
        }).catch(err => {
            setEtatPage(err.message);
            console.log(err);
        })
        
    }, [cptNum])


    // const offerCoin = new Coin('uusd', '1000000');
    // lcd.market.swapRate(offerCoin, 'ukrw').then(c => {
    // console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
    // });
    

    return (
        <>
            {etatPage === 'vide' ? (
                <>
                <p>Page en cours de chargement …</p>
                </>
            ) : (
            <>
                {etatPage === 'adresseManquante' ? (
                    <>
                        <br />
                        <p>Aucune adresse passée en paramètre, désolé</p>
                        <br />
                    </>
                ) : (
                    <>
                        {etatPage === 'ok' ? (
                            <>
                                <div>Détail du compte : <strong>{adresse}</strong></div>
                                <p>Réseau <strong>{reseau} ({IDchaine})</strong><br />
                                URL du LCD : <strong>{LCDurl}</strong></p>
                                <br />        
                                <table border="1" cellPadding="10px" cellSpacing="0px">
                                    <thead>
                                        <tr>
                                            <th>Ligne</th>
                                            <th>Montant</th>
                                            <th>Désignation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            balanceDuCompte.length === 0 ? (
                                                <>
                                                    <tr><td colSpan={3}>Aucune donnée disponible</td></tr>
                                                </>
                                            ) : (
                                                <>
                                                {balanceDuCompte.map((data, index) => {
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
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <br />
                                <p>Erreur retournée par le LCD : {etatPage}</p>
                                <br />
                            </> 
                        )}
                    </>
                )}
            </>)
            }
        </>
    );
};

export default Terra1accountFinder;