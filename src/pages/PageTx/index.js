import React, { useEffect, useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';
import { useParams } from 'react-router-dom';

import { IDchaine, LCDurl } from '../../AppParametres';

import PageTxAucunHashRenseigne from './PageTxAucunHashRenseigne';
import PageTxAfficheDetail from './PageTxAfficheDetail';

import ComponentEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import ComponentErreurLCD from '../ComponentErreurLCD';
import ComponentMessageLCD from '../ComponentMessageLCD';

const PageTx = () => {

    // Récupération du hash de la transaction, éventuellement passé en argument
    const { txHash } = useParams();         // Ne rien mettre revient à demander à voir le "latest" (le dernier)

    // Variables react
    const [ etatPage, setEtatPage ] = useState('vide');                 // Variable d'état, pour conditionner l'affichage à l'écran
    const [ infosTransaction, setInfosTransaction ] = useState();       // Tableau qui contiendra les données retournées par le LCD

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    // Récupération d'infos, au chargement du component (et mise à jour, à chaque changement de txHash)
    useEffect(() => {

        if(txHash === undefined)
        {
            // Si on a aucun hash communiqué, on ne sollicite pas le LCD
            setEtatPage('txHashManquant');
        } else {
            // Chargement d'un block donné
            lcd.tx.txInfo(txHash).then(res => {
                console.log("res", res);
                if(res)
                    setEtatPage('ok');
                else
                    setEtatPage('message');
                setInfosTransaction(res);
            }).catch(err => {
                setEtatPage(err.message);
                console.log(err);
            })
        }
                        // eslint-disable-next-line
    }, [txHash])
    
    
    // Sélecteur d'affichage
    const renderSwitch = () => {
        switch(etatPage) {
            case 'vide':
                return <ComponentEnCoursDeChargement />;
            case 'txHashManquant':
                return <PageTxAucunHashRenseigne />;
            case 'ok':
                return <PageTxAfficheDetail infosTx={infosTransaction} />;
            case 'message':
                return <ComponentMessageLCD message={infosTransaction} />;
            default:
                return <ComponentErreurLCD erreur={etatPage} />;
        }
    }

    
    // Et affichage de la page, au final
    return (
        <>
            {renderSwitch()}
        </>
    );


};

export default PageTx;