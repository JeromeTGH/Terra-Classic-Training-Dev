import React from 'react';
import { Link } from 'react-router-dom';
import { IDchaine } from '../../AppParametres';

const PageTxAfficheDetail = (props) => {


    return (
        <>
            <h2>Infos générales</h2>
            <div>Tx Hash : <strong>{props.infosTx.txhash}</strong></div>
            <div>Network : <strong>{IDchaine}</strong></div>
            <br />
            <div>Block : <strong><Link to={"/block/" + props.infosTx.height}>{props.infosTx.height}</Link></strong></div>
            <br />
            <div>Gas Used : <strong>{props.infosTx.gas_used}</strong></div>
            <div>Gas Requested : <strong>{props.infosTx.gas_wanted}</strong></div>
            <br />
            <div>Mémo : <strong>{props.infosTx.tx.body.memo}</strong></div>
            <br />
            <h2>Détail transaction</h2>
            <div>(suite à venir ...)</div>
            <br />

        </>
    );
};

export default PageTxAfficheDetail;