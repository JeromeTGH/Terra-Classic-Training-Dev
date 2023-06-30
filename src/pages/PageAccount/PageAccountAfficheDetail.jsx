import React from 'react';
import { reseau, IDchaine, LCDurl, tblCorrespondanceValeurs } from '../../AppParametres';


const PageAccountAfficheDetail = (props) => {
    return (
        <>
            <div>Adresse du compte : <strong>{props.numerocpt}</strong></div>
            <p>Réseau <strong>{reseau} ({IDchaine})</strong><br />
            URL du LCD : <strong>{LCDurl}</strong></p>
            <br />        
            <table border="1" cellPadding="10px" cellSpacing="0px">
                <thead>
                    <tr>
                        <th>Ligne</th>
                        <th>Montant</th>
                        <th>Désignation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.donnees.length === 0 ? (
                            <>
                                <tr><td colSpan={3}>Aucune donnée disponible</td></tr>
                            </>
                        ) : (
                            <>
                                {props.donnees.map((data, index) => {
                                    if(data.denom === 'uluna' || data.denom === 'uusd') {
                                        return <tr key={index}>
                                            <td>#{index}</td>
                                            <td>{data.amount / 1000000.0}</td>
                                            <td>*** {tblCorrespondanceValeurs[data.denom]}</td>
                                        </tr>
                                    } else if(data.denom.charAt(0) === 'u') {
                                        return <tr key={index}>
                                            <td>#{index}</td>
                                            <td>{data.amount / 1000000.0}</td>
                                            <td>{tblCorrespondanceValeurs[data.denom]}</td>
                                        </tr>
                                    } else {
                                            return <tr>
                                            <td>#{index}</td>
                                            <td>{data.amount / 1000000.0}</td>
                                            <td>Valeur inconnnue : {data.denom}</td>
                                        </tr>
                                    }
                                })}
                            </>
                        )
                    }
                </tbody>
            </table>
        </>
    );
};

export default PageAccountAfficheDetail;