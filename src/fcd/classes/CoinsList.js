
export class CoinsList {

    constructor (objetAvecVariables) {
        this.tbl = objetAvecVariables.tbl;
    }


    static insertInClass (objetAvecVariables) {
        return new CoinsList(objetAvecVariables);
    }


    static createInstanceFromApiData (apiData) {
        // ***************************************************
        // Reçoit un tableau d'objects : [ { denom, amount } ]        
        // ***************************************************

        // Traitement des données
        const tblOfCoins = [];
        for (const coin of apiData) {
            tblOfCoins.push([parseInt(coin.amount), coin.denom])
        }

        // Mise en forme
        const objetAvecVariables = {}
        objetAvecVariables['tbl'] = tblOfCoins;
        
        // Et renvoie de l'instance
        return new CoinsList(objetAvecVariables);
    }

}