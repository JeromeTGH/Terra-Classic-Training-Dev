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
                <ol>
                    {props.donnees ? props.donnees.data.txs.map((data, index) => {
                        return <li key={index}>TX&nbsp;#{index}&nbsp;:&nbsp;{data}</li>
                    }) : null}
                </ol>
            </div>
            <h2>Validator Set</h2>
            <div>
                Nombre de validateurs : <strong>{props.validateurs ? props.validateurs[1].total : ''}</strong><br />
                <ol>
                    {props.validateurs ? props.validateurs[0].map((data, index) => {
                        return <li key={index}>
                            Adresse : {data.address}<br />
                            &nbsp;&nbsp;Proposer priotiry : {data.proposer_priority}<br />
                            &nbsp;&nbsp;Voting power : {data.voting_power}<br />
                            &nbsp;&nbsp;Public key : {data.pub_key.key} (@type : "/cosmos.crypto.ed25519.PubKey")
                        </li>
                    }) : null}
                </ol>
            </div>
            <h2>Remarques</h2>
            <div><mark>
                Problèmes rencontrés :<br />
                - Problème de correspondance entre ce "proposer_address" avec la pubkey des validateurs, via le module Staking (validators)<br />
                - ValidatorSet limité à 100 (voir "Pagination")
            </mark></div>
        </>
    );
};

export default PageBlockAfficheDetail;