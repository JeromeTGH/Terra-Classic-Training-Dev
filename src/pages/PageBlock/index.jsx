import React, { useEffect, useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';
import { bech32 } from 'bech32';
import { useParams } from 'react-router-dom';

import { IDchaine, LCDurl } from '../../AppParametres';

import PageBlockAfficheDetail from './PageBlockAfficheDetail';
import ComponentEnCoursDeChargement from '../ComponentEnCoursDeChargement';
import ComponentErreurLCD from '../ComponentErreurLCD';
import ComponentMessageLCD from '../ComponentMessageLCD';

const PageBlock = () => {

    // Récupération du numéro de block, éventuellement passé en argument
    const { blockNum } = useParams();       // Ne rien mettre revient à demander à voir le "latest" (le dernier)

    // Variables react
    const [ etatPage, setEtatPage ] = useState('vide');             // Variable d'état, pour conditionner l'affichage à l'écran
    const [ infosBlock, setInfosBlock ] = useState();               // Tableau qui contiendra les données retournées par le LCD
    const [ validatorSet, setValidatorSet ] = useState([]);

    const [ terravalcons, setTerravalcons ] = useState();
    const [ validatorPublicKey, setValidatorPublicKey ] = useState();

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    const getAllValidatorSet = async () => {
        const allValidatorSet = [];
        const valeurOffset = 100;
        let offsetPagination = 0;
        let nbreTotalDeValidateursTrouves = 0;
        
        
        try {
            // Lecture du "premier lot" de 100 validateurs, dans le ValidatorSet
            const premiereLectureValidatorSet = await lcd.tendermint.validatorSet(blockNum);

            if(premiereLectureValidatorSet) {
                nbreTotalDeValidateursTrouves = premiereLectureValidatorSet[1].total;
                allValidatorSet.push(...premiereLectureValidatorSet[0]);
    
                // Si jamais il y a d'autres validateurs à lire, on passe aux 100 suivants, etc, jusqu'à arriver à la fin
                while(allValidatorSet.length < nbreTotalDeValidateursTrouves) {
                    offsetPagination = offsetPagination + valeurOffset;
                    const lectureSuivanteValidatorSet = await lcd.tendermint.validatorSet(blockNum, {'pagination.offset': offsetPagination});
                    allValidatorSet.push(...lectureSuivanteValidatorSet[0]);
                }
                console.log("Validator Set", allValidatorSet);
                setValidatorSet(allValidatorSet);
            }             
        } catch (error) {
            setEtatPage(error.message);
            console.log(error);
        }


    }
    
    // Récupération d'infos, au chargement du component (et mise à jour, à chaque changement de blockNum)
    useEffect(() => {

            // Chargement d'un block donné
            lcd.tendermint.blockInfo(blockNum).then(res => {
                if(res.block.header) {
                    //console.log("res.block_id", res.block_id);
                    console.log("Block Info", res.block);
                    setEtatPage('ok');
                    setInfosBlock(res.block);

                    getAllValidatorSet();

                }
                else {
                    setEtatPage('message');
                    setInfosBlock(res);
                }
            }).catch(err => {
                setEtatPage(err.message);
                console.log(err);
            })


                    // eslint-disable-next-line
    }, [blockNum])


    // Récupération du "terravalcons", une fois le "proposer_address" récupéré
    useEffect(() => {
        if(infosBlock) {
            // Pour trouver le "terravalcons" à partir de la "proposer_address"
            const retTerraValCons = bech32.encode('terravalcons', bech32.toWords(Buffer.from(infosBlock.header.proposer_address, 'base64')));
            setTerravalcons(retTerraValCons);

            // Et juste pour info, pour retrouver le "proposer_address" depuis le "terravalcons"
                // const retProposerAddress = Buffer.from(bech32.fromWords(bech32.decode(retTerraValCons).words)).toString('base64');
                // console.log("retProposerAddress", retProposerAddress);
        }
    }, [infosBlock])

    // Récupération de la "validataor public key", une fois son "terravalcons" récupéré + "validatorSet" chargé
    useEffect(() => {
        if(terravalcons && validatorSet.length > 0) {
            const validateurRecupere = validatorSet.filter(val => val.address === terravalcons);
            setValidatorPublicKey(validateurRecupere[0].pub_key.key);
        }
    }, [terravalcons, validatorSet])


    // Sélecteur d'affichage
    const renderSwitch = () => {
        switch(etatPage) {
            case 'vide':
                return <ComponentEnCoursDeChargement />;
            case 'message':
                return <ComponentMessageLCD message={infosBlock} />;
            case 'ok':
                return <PageBlockAfficheDetail donnees={infosBlock} validateurs={validatorSet} terravalcons={terravalcons} validatorPublicKey={validatorPublicKey} />;
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