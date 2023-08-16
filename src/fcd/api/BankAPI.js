import { CoinsList } from "../classes/CoinsList";

export class BankAPI {

    constructor (apiRqt) {
        this.apiRequester = apiRqt;
    }

    async getBalance(accountAdr, params = new URLSearchParams()) {
        return await this.apiRequester.get('/bank/balances/' + accountAdr, params).then(res => CoinsList.createInstanceFromApiData(res));
    }


}