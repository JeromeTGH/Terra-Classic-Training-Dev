import React, { useEffect } from 'react';
import { FCDclient } from './fcd/FCDclient';
import { BlockInfo } from './fcd/classes/BlockInfo';
// import { NodeInfo } from './fcd/classes/NodeInfo';

const TestTendermint = () => {

    // Exécution au démarrage
    useEffect(() => {

        const FCDurl = 'https://terra-classic-fcd.publicnode.com';
        const fcd = new FCDclient(FCDurl);

        // // =====================================
        // // Get "cosmos sdk version", for example
        // // =====================================
        // fcd.tendermint.askForNodeInfo().then(res => {
        //     const nodeinfo = NodeInfo.extractFromTendermintNodeInfo(res);
        //     console.log("cosmos_sdk_version", nodeinfo.application_version.cosmos_sdk_version);
        //     // Résultat = "cosmos_sdk_version    v0.45.14", au moment des essais
        // }).catch(err => {
        //     console.log("err.response.data", err.response.data);
        // })


        // =============================
        // Get "block info", for example
        // =============================
        fcd.tendermint.askForBlockInfo(14133283).then(res => {
            // console.log("res", res);

            // const blockInfo = BlockInfo.extractFromTendermintBlockInfo(res);
            // console.log(blockInfo.proposer.moniker);
            // console.log(blockInfo.proposer.operatorAddress);

            const blockInfo = BlockInfo.extractFromTendermintBlockInfo(res);
            console.log(blockInfo.txs);
        }).catch(err => {
            console.log("err.response.data", err);
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
