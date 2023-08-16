import React, { useEffect, useState } from 'react';
import { FCDclient } from './fcd/FCDclient';
import { CoinsList } from './fcd/classes/CoinsList';

const GetBalance = () => {

    // Variables react
    const [tblOfCoin, setTblOfCoin] = useState();
    const [msgErreur, setMsgErreur] = useState();

    // Exécution au démarrage
    useEffect(() => {

        const FCDurl = 'https://terra-classic-fcd.publicnode.com';
        const fcd = new FCDclient(FCDurl);

        fcd.account.getBalance("terra1jgp27m8fykex4e4jtt0l7ze8q528ux2lh4zh0f").then(res => {
            const coinlist = new CoinsList(res);
            setTblOfCoin(coinlist.tbl);
            setMsgErreur("");
        }).catch(err => {
            console.log("err.response.data", err.response.data);
            setMsgErreur("ERROR : failed to fetch [balance] ...");
        })

    }, [])

    // Affichage
    return (
        <div>
            {msgErreur ? 
                <div style={{ color: "red"}}>{msgErreur}</div>
            :
                tblOfCoin ? 
                    <table border="black" cellSpacing="0" cellPadding="6px">
                        <thead>
                            <tr>
                                <th>Denom</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblOfCoin.length === 0 ?
                                <tr><td colSpan="2">Nothing.</td></tr>
                            :
                                tblOfCoin.map((valeur, index) => {
                                    return <tr key={index}>
                                        <td>{valeur[0]}</td>
                                        <td>{valeur[1]}</td>
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

export default GetBalance;
