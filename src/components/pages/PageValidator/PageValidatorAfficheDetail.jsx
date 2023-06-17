import React from 'react';

import { ValConsPublicKey } from '@terra-money/terra.js';

const PageValidatorAfficheDetail = (props) => {

    const adrCons = new ValConsPublicKey(props.infosvalidateur.consensus_pubkey.key).address();

    return (
        <>
            <h2>Adresse du validateur</h2>
            <div>Adresse du validateur : <strong>{props.adressevalidateur}</strong></div>
            <div>Adresse du compte validateur : <strong>{props.adressecomptevalidateur}</strong></div>
            <div>Clé publique consensus : <strong>{props.infosvalidateur.consensus_pubkey.key}</strong></div>
            <div>Adr cons : <strong>{adrCons}</strong></div>
            <br />
            <h2>Infos du validateur</h2>
            <div>Détails : <strong>{props.infosvalidateur.description.details}</strong></div>
            <div>Identité : <strong>{props.infosvalidateur.description.identity}</strong></div>
            <div>Moniker : <strong>{props.infosvalidateur.description.moniker}</strong></div>
            <div>Contact : <strong>{props.infosvalidateur.description.security_contact}</strong></div>
            <div>Site web : <strong>{props.infosvalidateur.description.website}</strong></div>
            <br />
            <div>Jailed : <strong>{props.infosvalidateur.jailed ? 'oui' : 'non'}</strong></div>
            <div>Status : <strong>{props.infosvalidateur.status}</strong></div>
            <br />
            <h2>Remarques</h2>
            <div><mark>
                Problèmes rencontrés :<br />
                - Problème de correspondance entre le "consensus_pubkey" de ces validateurs et le "proposer_address" d'un "BlockInfo" quelconque
            </mark></div>
        </>
    );
};

export default PageValidatorAfficheDetail;