import React, { useEffect, useState } from 'react';
import { LCDClient } from '@terra-money/terra.js';


const LastestBlockInfo = () => {

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
        <div>
            <h1>Lastest Block Info (terra classic)</h1>
            <hr />
            <div>
                Réseau <strong>{reseau} ({IDchaine})</strong><br />
                URL du LCD : <strong>{LCDurl}</strong>
            </div>
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
        </div>
    );
};

export default LastestBlockInfo;