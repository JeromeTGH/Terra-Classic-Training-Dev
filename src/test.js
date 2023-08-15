import { FCDclient } from "./fcd/FCDclient"

export const testFunction = () => {

    const FCDurl = 'https://terra-classic-fcd.publicnode.com';
    const fcd = new FCDclient(FCDurl);

    const params = new URLSearchParams();
    params.append('offset', 0);
    params.append('limit', 100);
    params.append('account', 'terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu');

    fcd.account.txs(params).then(res => {
        if(res.txs) {
            console.log("res.txs", res.txs);

            
        } else
            console.log("Aucun TX retourné");

    }).catch(err => {
        console.log("error", err);
    })
    

}