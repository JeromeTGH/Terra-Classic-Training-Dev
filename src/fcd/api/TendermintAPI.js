
export class TendermintAPI {

    // Constructeur
    constructor (apiRqt) {
        this.apiRequester = apiRqt;
    }

    // Exemple d'appel : /node_info
    async askForNodeInfo(params = new URLSearchParams()) {
        return await this.apiRequester.get('node_info', params);
    }

    // Exemple d'appel : /v1/txs?offset=0&limit=100&account=terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu
    // async txs(params) {
    //     params.append('limit', 100);
    //     return this.apiRequester.get('/v1/txs', params);
    // }

}