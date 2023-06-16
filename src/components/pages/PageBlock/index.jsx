import React, { useEffect, useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';
import { useParams } from 'react-router-dom';

import { IDchaine, LCDurl } from '../../../utils/appParametres';

import PageBlockEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import PageBlockAfficheDetail from './PageBlockAfficheDetail';

import ComponentEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import ComponentErreurLCD from '../ComponentErreurLCD';
import ComponentMessageLCD from '../ComponentMessageLCD';

const PageBlock = () => {

    // Récupération du numéro de block, éventuellement passé en argument
    const { blockNum } = useParams();       // Ne rien mettre revient à demander à voir le "latest" (le dernier)

    // Variables react
    const [ etatPage, setEtatPage ] = useState('vide');         // Variable d'état, pour conditionner l'affichage à l'écran
    const [ infosBlock, setInfosBlock ] = useState();           // Tableau qui contiendra les données retournées par le LCD

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    
    // Récupération d'infos, au chargement du component (et mise à jour, à chaque changement de blockNum)
    useEffect(() => {

        if(blockNum === undefined)
        {
            // Si on a aucun numéro de block, on va demander à voir le dernier ("latest")
            lcd.tendermint.blockInfo().then(res => {
                if(res.block.header)
                {
                    //console.log("res.block_id", res.block_id);
                    //console.log("res.block", res.block);
                    setEtatPage('ok');
                }
                else
                    setEtatPage('message');
                setInfosBlock(res.block)
            }).catch(err => {
                setEtatPage(err.message);
                console.log(err);
            })
        } else {
            // Chargement d'un block donné
            lcd.tendermint.blockInfo(blockNum).then(res => {
                if(res.block.header) {
                    //console.log("res.block_id", res.block_id);
                    console.log("res.block", res.block);
                    setEtatPage('ok');
                }
                else
                    setEtatPage('message');
                setInfosBlock(res.block)
            }).catch(err => {
                setEtatPage(err.message);
                console.log(err);
            })
        }
        
    }, [blockNum])


    // Sélecteur d'affichage
    const renderSwitch = () => {
        switch(etatPage) {
            case 'vide':
                return <ComponentEnCoursDeChargement />;
            case 'message':
                return <ComponentMessageLCD message={infosBlock} />;
            case 'ok':
                return <PageBlockAfficheDetail donnees={infosBlock} />;
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

export default PageBlock;