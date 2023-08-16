
export class BlockInfo {

    constructor (objetAvecVariables) {

        this.chainId = objetAvecVariables.chainId;
        this.height = objetAvecVariables.height;
        this.timestamp = objetAvecVariables.timestamp;
        this.proposer = {
            moniker: objetAvecVariables.proposer.moniker,
            identity: objetAvecVariables.proposer.identity,
            operatorAddress: objetAvecVariables.proposer.operatorAddress
        }
        this.txs = [];

    }


    static extractFromTendermintBlockInfo (rawApiData) {

        // Initialisation du tableau général, à l'image de la classe
        const objetAvecVariables = {
            chainId: rawApiData.data.chainId,
            height: rawApiData.data.height,
            timestamp: rawApiData.data.timestamp,
            proposer: {
                moniker: rawApiData.data.proposer.moniker,
                identity: rawApiData.data.proposer.identity,
                operatorAddress: rawApiData.data.proposer.operatorAddress
            },
            txs: []
            // et rawApiData.data.txs comme array of tx (id, tx, log, height, txhash, raw_log, gas_used, timestamp, et gas_wanted)
        }


        // Et renvoie de l'instance
        return new BlockInfo(objetAvecVariables);
    }

}