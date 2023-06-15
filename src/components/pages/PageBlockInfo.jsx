import React, { useEffect, useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';
import { useParams } from 'react-router-dom';

const PageBlockInfo = () => {

    const [ etatPage, setEtatPage ] = useState('vide')

    // Récupération du numéro de compte, éventuellement passé en argument
    const { blocktNum } = useParams();


    // Adresse du compte visé
    const reseau = 'Terra Classic';
    const IDchaine = 'columbus-5';
    const LCDurl = 'https://columbus-lcd.terra.dev';

    // Connexion au LCD
    const lcd = new LCDClient({
        URL: LCDurl,
        chainID: IDchaine,
        isClassic: true
    });

    // Tableau qui contiendra les données retournées par le LCD
    const [infosDernierBlock, setInfosDernierBlock] = useState();

    useEffect(() => {
        // Chargement d'un compte donné (via son adresse)
        lcd.tendermint.blockInfo().then(res => {
            //console.log("res.block_id", res.block_id);
            console.log("res.block", res.block);
            setInfosDernierBlock(res.block)
        }).catch(err => {
            console.log(err);
        })
        
    }, [])
    
    return (
        <>
            <div>
                Réseau <strong>{reseau} ({IDchaine})</strong><br />
                URL du LCD : <strong>{LCDurl}</strong>
            </div>
            {infosDernierBlock ? (
                // Une réponse a été retournée par le LCD, donc on la traite
                infosDernierBlock.header ? (
                    // On a bien des infos attendues, à l'intérieur de cette réponse, donc on les traite
                    <>
                        <br />
                        <h2>Header</h2>
                        <div>
                            Height : {infosDernierBlock ? infosDernierBlock.header.height : ''}<br />
                            Time : {infosDernierBlock ? infosDernierBlock.header.time : ''}
                        </div>
                        <h2>Last commit</h2>
                        <div>
                            BlockID hash : {infosDernierBlock ? infosDernierBlock.last_commit.block_id.hash : ''}<br />
                            Height : {infosDernierBlock ? infosDernierBlock.last_commit.height : ''}<br />
                            Nombre de signatures : {infosDernierBlock ? infosDernierBlock.last_commit.signatures.length : ''}
                        </div>
                        <h2>Data</h2>
                        <div>
                            Nombre de transactions : {infosDernierBlock ? infosDernierBlock.data.txs.length : ''}<br />
                            <ul>
                                {infosDernierBlock ? infosDernierBlock.data.txs.map((data, index) => {
                                    return <li key={index}>TX&nbsp;#{index}&nbsp;:&nbsp;{data}</li>
                                }) : null}
                            </ul>
                        </div>
                    </>
                ) : (
                    // Une réponse a bien été renvoyée par le LCD, mais les infos attendues sont absentes ; on affiche alors son contenu (texte)
                    <>
                        <p>Infos attendues non trouvées. Message reçu = <strong>{infosDernierBlock}</strong></p>
                    </>
                )
            ) : (
                // Aucune réponse n'a été (pour l'instant) retournée par le LCD ; on affiche donc un message en conséquence
                <>
                    <br />
                    <p>Aucune info récupérée pour l'instant, concernant le dernier bloc …</p>
                    <br />
                </>
            )}
        </>
    );
};

export default PageBlockInfo;