import React, { useEffect, useState } from 'react';
import { getBurnTbl } from './getBurnTbl';

const BurnWatcher = () => {

    // Constantes
    const minLuncToShow = 10000;    // Nombre de LUNC minimum pour une transaction donnée, pour que celle-ci soit "retenue" dans le tableau d'affichage final
    const minUstcToShow = 100;      // Nombre d'USTC minimum pour une transaction donnée, pour que celle-ci soit "retenue" dans le tableau d'affichage final
    const nbLineToShow = 60;       // Nombre de lignes "filtrées" (que MsgSend, d'un certain montant), à afficher

        
    // Variables React
    const [isLoading, setIsLoading] = useState(true);
    const [msgErreurGettingTransactions, setMsgErreurGettingTransactions] = useState();


    // Chargement au démarrage
    useEffect(() => {
        setIsLoading(true);

        getBurnTbl(minLuncToShow, minUstcToShow, nbLineToShow).then((res) => {
            if(res['erreur']) {
                // Erreur
                setMsgErreurGettingTransactions(res['erreur']);
            }
            else {
                // OK
                setIsLoading(false);
                setMsgErreurGettingTransactions('');
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
                    <table>
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
                            
                        </tbody>
                    </table>
                </>
            }
        </div>
    );
};

export default BurnWatcher;