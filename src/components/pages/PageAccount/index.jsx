import React, { useEffect, useState } from 'react';
import { LCDClient, Coins } from '@terra-money/terra.js';
import { useParams } from 'react-router-dom';

import { IDchaine, LCDurl } from '../../../utils/appParametres';

import PageAccountAucuneAdresseRenseignee from './PageAccountAucuneAdresseRenseignee';
import PageAccountAfficheDetail from './PageAccountAfficheDetail';

import ComponentEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import ComponentErreurLCD from '../ComponentErreurLCD';
import ComponentMessageLCD from '../ComponentMessageLCD';

const PageAccount = () => {  

    // Récupération du numéro de compte, éventuellement passé en argument
    const { cptNum } = useParams();    // Adresse du compte visé (prendre terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v si besoin pour faire des tests)

    // Variables react
    const [ etatPage, setEtatPage ] = useState('vide');                 // Variable d'état, pour conditionner l'affichage à l'écran
    const [ balanceDuCompte, setBalanceDuCompte ] = useState([]);       // Tableau qui contiendra la liste des lignes à afficher

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    // Récupération d'infos, au chargement du component (et mise à jour, à chaque changement de cptNum)
    useEffect(() => {

        if(cptNum === undefined)
        {
            // Si on a aucun numéro de compte, on ne sollicite pas le LCD
            setEtatPage('adresseManquante');
        } else {
            // Chargement d'un compte donné (via son adresse)
            lcd.bank.balance(cptNum).then(res => {
                if(res[0]) {
                    //console.log("Réponse LCD", res[0]);
                    const mesCoins = new Coins(res[0]);
                    setEtatPage('ok');
                    setBalanceDuCompte(mesCoins.toData());
                } else {
                    setEtatPage('message');
                    setBalanceDuCompte(res);
                }
            }).catch(err => {
                setEtatPage(err.message);
                console.log(err);
            })
        }
        
    }, [cptNum])


    // Sélecteur d'affichage
    const renderSwitch = () => {
        switch(etatPage) {
            case 'vide':
                return <ComponentEnCoursDeChargement />;
            case 'adresseManquante':
                return <PageAccountAucuneAdresseRenseignee />;
            case 'ok':
                return <PageAccountAfficheDetail numerocpt={cptNum} donnees={balanceDuCompte} />;
            case 'message':
                return <ComponentMessageLCD message={balanceDuCompte} />;
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

export default PageAccount;