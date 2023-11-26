import React, { useEffect, useState } from 'react';

const TerraStationWallet = () => {

    const [etatTerraStationExtension, setEtatTerraStationExtension] = useState(false);
    const [terraWallets, setTerraWallets] = useState([]);


    useEffect(() => {

        // console.log("window", window);

        // console.log("window.isStationExtensionAvailable", window.isStationExtensionAvailable);
        // console.log("window.isTerraExtensionAvailable", window.isTerraExtensionAvailable);
        // console.log("window.interchainWallets", window.interchainWallets);
        // console.log("window.station", window.station);
        // console.log("window.terraWallets", window.terraWallets);

        checkTerraStationExtension();
        // eslint-disable-next-line
    }, [])


    const checkTerraStationExtension = () => {
        console.log("checkTerraStationExtension");
        console.log("window.terraWallets", window.terraWallets);
        if(window.isStationExtensionAvailable && window.isTerraExtensionAvailable) {
            setEtatTerraStationExtension(true);
            setTerraWallets(window.terraWallets);
        } else {
            setEtatTerraStationExtension(false);
            setTerraWallets([])
        }

        setTimeout(() => {
            checkTerraStationExtension();
        }, 2000);
    }

    return (
        <div>
            <div>Etat "Terra Station Extension" = <strong>{etatTerraStationExtension ? "actif" : "absent ou désactivé"}</strong></div>
            <br />
            <div>terraWallets =<br />{terraWallets ? terraWallets.map((terraWallet, idx) => {
                return <ul key={idx}>
                    <li>terraWallet.name = <strong>{terraWallet.name ? terraWallet.name : "(vide)"}</strong></li>
                    <li>terraWallet.identifier = <strong>{terraWallet.identifier ? terraWallet.identifier : "(vide)"}</strong></li>
                    <li>terraWallet.icon = <strong>{terraWallet.icon ? terraWallet.icon : "(vide)"}</strong></li>
                    <li>terraWallet.connector = <strong>{terraWallet.connector ? terraWallet.connector : "(vide)"}</strong></li>
                </ul>
            }) : "-"}
            </div>
        </div>
    );
};

export default TerraStationWallet;