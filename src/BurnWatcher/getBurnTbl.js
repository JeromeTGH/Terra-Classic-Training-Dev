import { tblCorrespondanceValeurs } from "../application/AppParams";
import { FCDclient } from "../fcd/FCDclient";

export const getBurnTbl = async (minLuncToShow, minUstcToShow, nbLineToShow) => {

    // Constantes
    const burnWalletAddress = 'terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu';
    const tblBurns = [];
    
    // Variables
    let nextid = 0;
    let nb_new_tx = 0;


    // Instanciation d'une classe de requetage FCD
    const fcd = FCDclient.getSingleton();

    // Boucle de chargement principal
    while(nb_new_tx < nbLineToShow) {

        // Préparation de la requête
        const params = new URLSearchParams();
        params.append('offset', nextid);
        params.append('account', burnWalletAddress);

        // Récupération des 100 dernières transactions, qui ont été enregistrées sur le burn wallet
        const rawTxs = await fcd.tx.getAccountTxs(params).catch(handleError);
        if(rawTxs) {
            if(rawTxs.data) {

                // =======================================
                // ======== pour debug, si besoin ========
                // =======================================
                // console.log("rawTxs.data", rawTxs.data);
                
                // Sauvegarde du prochain ID à requéter, pour les 100 txs suivants
                if(rawTxs.data.next)
                    nextid = rawTxs.data.next;
                else
                    break;
            
                // Parcours de tous les txs
                for(const tx of rawTxs.data.txs) {

                    // Récupération du codeErreur de la transaction (=0, si pas d'erreur)
                    const txCode = tx.code ? tx.code : 0;

                    // On ne garde que les transactions réussies de type 'MsgSend direct', en excluant les msgs multiples et send "indirects"
                    if(txCode === 0 && tx.tx.value.msg.length === 1 && tx.tx.value.msg[0].type.includes('MsgSend')) {

                        // Calcul du nombre de LUNC ou autre envoyé au burn wallet (==> retourne une chaîne de string avec amount + denom)
                        let txAmount = '';
                        for(const coinAndDenom of tx.tx.value.msg[0].value.amount) {
                            const coinAmount = parseInt(coinAndDenom.amount)/1000000;
                            const coinDenom = tblCorrespondanceValeurs[coinAndDenom.denom] ? tblCorrespondanceValeurs[coinAndDenom.denom] : coinAndDenom.denom;

                            // Scanne les potentiels LUNC
                            if(coinDenom === 'LUNC' && coinAmount >= minLuncToShow) {
                                if(txAmount === '')
                                    txAmount = coinAmount.toFixed(6) + '\u00a0' + coinDenom;    // Nota : \u00a0 est un 'espace insécable', en javascript
                                else
                                    txAmount += ', ' + coinAmount.toFixed(6) + '\u00a0' + coinDenom;    // Nota : \u00a0 est un 'espace insécable', en javascript
                            }

                            // Scanne les potentiels USTC
                            if(coinDenom === 'USTC' && coinAmount >= minUstcToShow) {
                                if(txAmount === '')
                                    txAmount = coinAmount.toFixed(6) + '\u00a0' + coinDenom;    // Nota : \u00a0 est un 'espace insécable', en javascript
                                else
                                    txAmount += ', ' + coinAmount.toFixed(6) + '\u00a0' + coinDenom;    // Nota : \u00a0 est un 'espace insécable', en javascript
                            }
                        }
                            
                        // On garde cette transaction, si elle est "bonne", après filtrage
                        if(txAmount !== '') {
                            // Incrémentation du nombre de MsgSend lus (pour être ensuite comparé au "nbLineToShow")
                            nb_new_tx = nb_new_tx + 1;

                            // Structure d'enregistrement :
                            //      tblBurn[id] = {
                            //          datetime,
                            //          txHash,
                            //          amount,
                            //          account,
                            //          memo
                            //      }
                            tblBurns[tx.id.toString()] = {
                                'datetime': tx.timestamp,
                                'txHash': tx.txhash,
                                'amount': txAmount,
                                'account': tx.tx.value.msg[0].value.from_address,
                                'memo': tx.tx.value.memo
                            }

                            // Et si on a lu assez de "lignes", alors on peut alors arrêter la lecture de transactions (en quittant la boucle "for")
                            if(nb_new_tx >= nbLineToShow)
                                break;

                        }
                    }
                }
                    
            } else
                return { "erreur": "Failed to fetch [rawTxs.data] ..." }
        } else
            return { "erreur": "Failed to fetch [burn wallet txs] ..." }


        // Rebouclage while, tant qu'on a pas le nombre suffisant de transactions à afficher

    }


    // Manips, avant restitution :
    // - "entries" permet la conversions de object à array
    // - "sort" permet de trier par clef (qui sont les 'id' de transaction, ici)
    // - "slice" permet de ne garder que les X premiers résultats (des fois qu'il y en ait plus, du fait qu'on mémoire les 'anciens')
    const arrBurns = Object.entries(tblBurns).sort((a, b) => {return b[0] - a[0]}).slice(0, nbLineToShow);
    // console.log("arrBurns", arrBurns);

    // Renvoie le tableau final, pour affichage
    return arrBurns;
}

const handleError = (err) => {
    if(err.response && err.response.data)
        console.warn("err.response.data", err.response.data);
    else
        console.warn("err", err);
}