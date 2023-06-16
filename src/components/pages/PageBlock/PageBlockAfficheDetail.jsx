import React from 'react';
import { reseau, IDchaine, LCDurl } from '../../../utils/appParametres';

// import { ValConsPublicKey } from '@terra-money/terra.js';

const PageBlockAfficheDetail = (props) => {

    // const adrValidateur = new ValConsPublicKey(props.donnees.header.proposer_address).address();

    return (
        <>
            <div>
                Réseau <strong>{reseau} ({IDchaine})</strong><br />
                URL du LCD : <strong>{LCDurl}</strong>
            </div>
            <br />
            <h2>Header</h2>
            <div>
                Height : <strong>{props.donnees ? props.donnees.header.height : ''}</strong><br />
                Time : <strong>{props.donnees ? props.donnees.header.time : ''}</strong><br />
                <br />
                Proposer Address : <strong>{props.donnees.header.proposer_address}</strong><br />
                {/* Validator Address : <strong>{adrValidateur}</strong><br /> */}
            </div>
            <h2>Last commit</h2>
            <div>
                BlockID hash : <strong>{props.donnees ? props.donnees.last_commit.block_id.hash : ''}</strong><br />
                Height : <strong>{props.donnees ? props.donnees.last_commit.height : ''}</strong><br />
                Nombre de signatures : <strong>{props.donnees ? props.donnees.last_commit.signatures.length : ''}</strong>
            </div>
            <h2>Data</h2>
            <div>
                Nombre de transactions : <strong>{props.donnees ? props.donnees.data.txs.length : ''}</strong><br />
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