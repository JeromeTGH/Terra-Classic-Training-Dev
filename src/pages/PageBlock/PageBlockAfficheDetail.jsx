import React from 'react';
import { Link } from 'react-router-dom';
import { reseau, IDchaine, LCDurl } from '../../AppParametres';
import { hashToHex } from '@terra-money/terra.js';

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
                Height : <strong>{props.donnees ? props.donnees.header.height : ''}</strong><br />
                Time : <strong>{props.donnees ? props.donnees.header.time : ''}</strong><br />
                <br />
                Proposer Address : <strong>{props.donnees.header.proposer_address}</strong><br />
                Terravalcons Address : <strong>{props.terravalcons}</strong><br />
                Validator Public Key : <strong>{props.validatorPublicKey}</strong><br />
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
                        return <li key={index}>TX&nbsp;#{index}&nbsp;:&nbsp;<Link to={"/tx/" + hashToHex(data)}>{hashToHex(data)}</Link></li>
                    }) : null}
                </ol>
            </div>
            <h2>Validator Set</h2>
            <div>
                Nombre de validateurs : <strong>{props.validateurs ? props.validateurs.length : ''}</strong><br />
                <ol>
                    {props.validateurs ? props.validateurs.map((data, index) => {
                        return <li key={index}>
                            Adresse : {data.address}<br />
                            &nbsp;&nbsp;Proposer priotiry : {data.proposer_priority}<br />
                            &nbsp;&nbsp;Voting power : {data.voting_power}<br />
                            &nbsp;&nbsp;Public key : {data.pub_key.key} (@type : "/cosmos.crypto.ed25519.PubKey")
                        </li>
                    }) : null}
                </ol>
            </div>
        </>
    );
};

export default PageBlockAfficheDetail;