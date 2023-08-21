import React, { useEffect, useState } from 'react';
import { getBurnTbl } from './getBurnTbl';

const BurnWatcher = () => {

    // Constantes
    const minLuncToShow = 10000;    // Nombre de LUNC minimum pour une transaction donnée, pour que celle-ci soit "retenue" dans le tableau d'affichage final
    const minUstcToShow = 100;      // Nombre d'USTC minimum pour une transaction donnée, pour que celle-ci soit "retenue" dans le tableau d'affichage final
    const nbLineToShow = 30;       // Nombre de lignes "filtrées" (que MsgSend, d'un certain montant), à afficher

        
    // Variables React
    const [isLoading, setIsLoading] = useState(true);
    const [msgErreurGettingTransactions, setMsgErreurGettingTransactions] = useState();
    const [tblTxsBurn, setTblTxsBurn] = useState([]);


    // Chargement au démarrage
    useEffect(() => {
        setIsLoading(true);

        getBurnTbl(minLuncToShow, minUstcToShow, nbLineToShow).then((res) => {
            if(res['erreur']) {
                // Erreur
                setMsgErreurGettingTransactions(res['erreur']);
                setTblTxsBurn([]);
            }
            else {
                // OK
                setIsLoading(false);
                setMsgErreurGettingTransactions('');
                setTblTxsBurn(res);
            }
        })
    }, [])


    
    // Affichage
    return (
        <div>
            {msgErreurGettingTransactions ?
                <div style={{ color: 'red' }}>{msgErreurGettingTransactions}</div>
            :
                isLoading ?
                    <div>Loading from blockchain (FCD), please wait ...</div>
                :
                <>
                    <table style={{ fontSize: "0.8rem"}}>
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>TxHash</th>
                                <th>Amount</th>
                                <th>Account</th>
                                <th>Memo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblTxsBurn.map((valeur, index) => {
                                return <tr key={index}>
                                    <td>{valeur[1].datetime}</td>
                                    <td>{valeur[1].txHash}</td>
                                    <td>{valeur[1].amount}</td>
                                    <td>{valeur[1].account}</td>
                                    <td>{valeur[1].memo}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </>
            }
        </div>
    );
};

export default BurnWatcher;