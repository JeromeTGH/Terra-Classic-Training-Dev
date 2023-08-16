import React, { useEffect } from 'react';
import { FCDclient } from './fcd/FCDclient';
import { NodeInfo } from './fcd/classes/NodeInfo';

const TestTendermint = () => {

    // Exécution au démarrage
    useEffect(() => {

        const FCDurl = 'https://terra-classic-fcd.publicnode.com';
        const fcd = new FCDclient(FCDurl);

        fcd.tendermint.askForNodeInfo().then(res => {
            const nodeinfo = NodeInfo.extractFromTendermintNodeInfo(res);
            console.log("cosmos_sdk_version", nodeinfo.application_version.cosmos_sdk_version);
            // Résultat = "cosmos_sdk_version    v0.45.14", au moment des essais
        }).catch(err => {
            console.log("err.response.data", err.response.data);
        })

    }, [])

    // Affichage
    return (
        <div>
            TestTendermint
        </div>
    );
};

export default TestTendermint;
