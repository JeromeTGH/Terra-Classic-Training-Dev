
export class CoinsList {

    constructor (associativeArray, fullArray) {
        this.associativeArray = associativeArray;
        this.fullArray = fullArray;
    }


    static createInstance (fullData) {
        return new CoinsList(fullData.associativeArray, fullData.fullArray);
    }


    static createInstanceFromApiData (apiData) {
        // Reçoit un tableau d'objects : [ { denom, amount } ]        
        const associativeArray = [];
        const fullArray = [];
        
        for (const coin of apiData) {
            associativeArray[coin.denom] = parseInt(coin.amount);
            fullArray.push([parseInt(coin.amount), coin.denom])
        }
        
        return new CoinsList(associativeArray, fullArray);
    }

}