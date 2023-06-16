import React, { useEffect, useState } from 'react';
import { LCDClient, AccAddress } from '@terra-money/terra.js';
import { useParams } from 'react-router-dom';

import { IDchaine, LCDurl } from '../../../utils/appParametres';

import PageValidatorAucuneAdresseRenseignee from './PageValidatorAucuneAdresseRenseignee';
import PageValidatorAfficheDetail from './PageValidatorAfficheDetail';

import ComponentEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import ComponentErreurLCD from '../ComponentErreurLCD';
import ComponentMessageLCD from '../ComponentMessageLCD';

const PageValidator = () => {

    // Récupération de l'adresse du validateur, éventuellement passé en argument
    const { valAdr } = useParams();         // Ne rien mettre revient à demander à voir le "latest" (le dernier)
    const adrcptvalidateur = AccAddress.fromValAddress(valAdr);

    // Variables react
    const [ etatPage, setEtatPage ] = useState('vide');             // Variable d'état, pour conditionner l'affichage à l'écran
    const [ infosValidateur, setInfosValidateur ] = useState();     // Tableau qui contiendra les données retournées par le LCD

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    // Récupération d'infos, au chargement du component (et mise à jour, à chaque changement de valAdr)
    useEffect(() => {

        if(valAdr === undefined)
        {
            // Si on a aucune adresse de validateur, on ne sollicite pas le LCD
            setEtatPage('adresseManquante');
        } else {
            // Chargement d'un block donné
            lcd.staking.validator(valAdr).then(res => {
                console.log("res", res);
                if(res.commission)
                    setEtatPage('ok');
                else
                    setEtatPage('message');
                setInfosValidateur(res);

            }).catch(err => {
                setEtatPage(err.message);
                console.log(err);
            })

        }
        
    }, [valAdr])
    
    
    // Sélecteur d'affichage
    const renderSwitch = () => {
        switch(etatPage) {
            case 'vide':
                return <ComponentEnCoursDeChargement />;
            case 'adresseManquante':
                return <PageValidatorAucuneAdresseRenseignee />;
            case 'ok':
                return <PageValidatorAfficheDetail adressevalidateur={valAdr} adressecomptevalidateur={adrcptvalidateur} infosvalidateur={infosValidateur} />;
            case 'message':
                return <ComponentMessageLCD message={infosValidateur} />;
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

export default PageValidator;