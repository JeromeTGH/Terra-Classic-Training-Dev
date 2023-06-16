import React from 'react';
import { reseau, IDchaine, LCDurl } from '../../../utils/appParametres';

const PageBlockAfficheDetail = (props) => {
    return (
        <>
            <div>
                Réseau <strong>{reseau} ({IDchaine})</strong><br />
                URL du LCD : <strong>{LCDurl}</strong>
            </div>
            <br />
            <h2>Header</h2>
            <div>
                Height : {props.donnees ? props.donnees.header.height : ''}<br />
                Time : {props.donnees ? props.donnees.header.time : ''}<br />
                Hash Validateur : {props.donnees.header.validators_hash}
            </div>
            <h2>Last commit</h2>
            <div>
                BlockID hash : {props.donnees ? props.donnees.last_commit.block_id.hash : ''}<br />
                Height : {props.donnees ? props.donnees.last_commit.height : ''}<br />
                Nombre de signatures : {props.donnees ? props.donnees.last_commit.signatures.length : ''}
            </div>
            <h2>Data</h2>
            <div>
                Nombre de transactions : {props.donnees ? props.donnees.data.txs.length : ''}<br />
                <ul>
                    {props.donnees ? props.donnees.data.txs.map((data, index) => {
                        return <li key={index}>TX&nbsp;#{index}&nbsp;:&nbsp;{data}</li>
                    }) : null}
                </ul>
            </div>
        </>
    );
};

export default PageBlockAfficheDetail;