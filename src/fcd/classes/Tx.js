
export class Tx {

    constructor (objetAvecVariables) {

        this.gas_used = objetAvecVariables.gas_used;
        this.gas_wanted = objetAvecVariables.gas_wanted;
        this.height = objetAvecVariables.height;
        this.id = objetAvecVariables.id;
        // Logs[]
        this.raw_log = objetAvecVariables.raw_log;
        this.timestamp = objetAvecVariables.timestamp;
        // Tx
        this.txhash = objetAvecVariables.txhash;

    }


    static extractFromTxs (rawApiData) {
        return new Tx(rawApiData);
    }

}