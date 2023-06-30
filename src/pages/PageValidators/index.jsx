import React, { useEffect, useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';

import { IDchaine, LCDurl } from '../../AppParametres';

import PageValidatorsAfficheListe from './PageValidatorsAfficheListe';
import ComponentEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import ComponentErreurLCD from '../ComponentErreurLCD';
import ComponentMessageLCD from '../ComponentMessageLCD';

const PageValidators = () => {

    // Variables react
    const [ etatPage, setEtatPage ] = useState('vide');                     // Variable d'état, pour conditionner l'affichage à l'écran
    const [ listeDesValidateurs, setListeDesValidateurs ] = useState();     // Tableau qui contiendra la liste des validateurs, retournée par le LCD

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    // Récupération d'infos, au chargement du component (et mise à jour, à chaque changement de blockNum)
    useEffect(() => {

        // Chargement de la liste des validateurs
        lcd.staking.validators({'pagination.limit': '9999'}).then(res => {
            // console.log("res", res);
            if(res[0]) {
                console.log("res", res[0]);
                setEtatPage('ok');
                setListeDesValidateurs(res[0]);
            }
            else {
                setEtatPage('message');
                setListeDesValidateurs(res);
            }
        }).catch(err => {
            setEtatPage(err.message);
            console.log(err);
        })
        
    }, [])

    // Sélecteur d'affichage
    const renderSwitch = () => {
        switch(etatPage) {
            case 'vide':
                return <ComponentEnCoursDeChargement />;
            case 'message':
                return <ComponentMessageLCD message={listeDesValidateurs} />;
            case 'ok':
                return <PageValidatorsAfficheListe validateurs={listeDesValidateurs} />;
            default:
                return <ComponentErreurLCD erreur={etatPage} />;
        }
    }


    return (
        <>
           {renderSwitch()}
        </>
    );
};

export default PageValidators; 