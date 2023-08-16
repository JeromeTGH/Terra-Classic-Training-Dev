import React, { useEffect, useState } from 'react';
import { FCDclient } from './fcd/FCDclient';

const GetAllTxs = () => {

    // Variables react
    const [tblTxs, setTblTxs] = useState();
    const [msgErreur, setMsgErreur] = useState();

    // Exécution au démarrage
    useEffect(() => {

        const FCDurl = 'https://terra-classic-fcd.publicnode.com';
        const fcd = new FCDclient(FCDurl);
    
        const params = new URLSearchParams();
        params.append('offset', 0);
        params.append('account', 'terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu');

        fcd.account.txs(params).then(res => {



            // CODE À RETRAVAILLER (passer dans une classe, pour le traitement de la réponse)




            setMsgErreur("");
            if(res.data.txs) {
                const tblTxs = [];
                res.data.txs.forEach(element => {
                    const datetime = metEnFormeDateTime(element.timestamp);
                    const txHash = element.txhash;
                    const txHeight = element.height;
                    const msgs = element.tx.value.msg;
                    let msgType = '';
                    if(msgs.length === 0)
                        msgType = 'Nothing';
                    else if(msgs.length > 1)
                        msgType = 'Multiple (' + msgs.length + ')';
                    else {
                        const msgTxtBrut = msgs[0].type;
                        const msgTxtSeul = msgTxtBrut.split("/")[1];
                        msgType = msgTxtSeul.replace('Msg', '');
                    }
					const errorCode = element.code ? element.code : 0;
                    tblTxs.push([datetime, txHash, txHeight, msgType, errorCode]);
                })
                setTblTxs(tblTxs);
            } else
                console.log("Aucun TX retourné");
    
        }).catch(err => {
            console.log("error", err);
            setMsgErreur("ERROR : failed to fetch [txs] ...");
        })

    }, [])

    // Affichage
    return (
        <div>
            {msgErreur ? 
                <div style={{ color: "red"}}>{msgErreur}</div>
            :
                tblTxs ? 
                    <table border="black" cellSpacing="0" cellPadding="6px">
                        <thead>
                            <tr>
                                <th>DateTime</th>
                                <th>Operation</th>
                                <th>TxHash</th>
                                <th>Height</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblTxs.length === 0 ?
                                <tr><td colSpan="2">No transaction.</td></tr>
                            :
                                tblTxs.map((valeur, index) => {
                                    return <tr key={index}>
                                        <td>{valeur[0]}</td>
                                        <td>{valeur[3]}</td>
                                        <td>{valeur[1]}</td>
                                        <td>{valeur[2]}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                : <div>Loading data from FCD, please wait ...</div>
            }
        </div>
    );
};

export default GetAllTxs;




// =============================
// Fonction "metEnFormeDateTime"
// =============================
/**
 * 
 * @param valDateTime Valeur à traiter
 * @returns Valeur formatée, de type DD/MM/YYYY HH:MN:SS
 */
export const metEnFormeDateTime = (valDateTime) => {
    // Entrée de la date/time à analyser
    const dateTimeAanalyser = new Date(valDateTime)

    // Récupération des parties qui nous intéresse
    let yyyy = dateTimeAanalyser.getFullYear();
    let mm = dateTimeAanalyser.getMonth() + 1;        // Months start at 0 !
    let dd = dateTimeAanalyser.getDate();
    let hh = dateTimeAanalyser.getHours();
    let mn = dateTimeAanalyser.getMinutes();
    let ss = dateTimeAanalyser.getSeconds();
    
    // Ajout d'un zéro devant certains digits, si nécessaire
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (mn < 10) mn = '0' + mn;
    if (ss < 10) ss = '0' + ss;
    
    // Retour de la valeur formatée (au format : DD/MM/YYYY HH:MN:SS)
    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mn + ':' + ss;
}