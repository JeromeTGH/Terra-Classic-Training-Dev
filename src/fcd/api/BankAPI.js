import { CoinsList } from "../classes/CoinsList";

export class BankAPI {

    constructor (apiRqt) {
        this.apiRequester = apiRqt;
    }

    async getBalance(accountAdr, params = new URLSearchParams()) {

        // params.append('offset', 0);
        // params.append('limit', 100);

        return this.apiRequester.get('/bank/balances/' + accountAdr, params).then(res => CoinsList.createInstanceFromApiData(res.result));
    }


}