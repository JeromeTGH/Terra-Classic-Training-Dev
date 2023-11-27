import React, { useEffect, useState } from 'react';

const TerraStationWallet = () => {

    const [isStationExtensionAvailable, setIsStationExtensionAvailable] = useState(false);
    const [isTerraExtensionAvailable, setIsTerraExtensionAvailable] = useState(false);
    const [terraWallets, setTerraWallets] = useState([]);
    const [interchainWallets, setInterchainWallets] = useState([]);

    useEffect(() => {

        
        window.addEventListener('load', () => {
            // console.log("window", window);
            checkTerraStationExtension();
         }, false);

        
        // eslint-disable-next-line
    }, [])


    const checkTerraStationExtension = () => {
        // console.log("checkTerraStationExtension");

        // console.log("window.isStationExtensionAvailable", window.isStationExtensionAvailable);
        // console.log("window.isTerraExtensionAvailable", window.isTerraExtensionAvailable);
        // console.log("window.interchainWallets", window.interchainWallets);
        // console.log("window.terraWallets", window.terraWallets);

        setIsStationExtensionAvailable(window.isStationExtensionAvailable);
        setIsTerraExtensionAvailable(window.isTerraExtensionAvailable);
        setTerraWallets(window.terraWallets);
        setInterchainWallets(window.interchainWallets);

        // window.crypto > subtle > decrypt, deriveBits, deriveKey, digest, encrypt, exportKey, generateKey, importKey, sign, unwrapKey, verify, wrapKey


    }

    return (
        <div>
            <div>isStationExtensionAvailable = <strong>{isStationExtensionAvailable ? "true !" : "false..."}</strong></div>
            <div>isTerraExtensionAvailable = <strong>{isTerraExtensionAvailable ? "true !" : "false..."}</strong></div>
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
            <div>interchainWallets =<br />{interchainWallets ? interchainWallets.map((interchainWallet, idx) => {
                return <ul key={idx}>
                    <li>interchainWallet.name = <strong>{interchainWallet.name ? interchainWallet.name : "(vide)"}</strong></li>
                    <li>interchainWallet.identifier = <strong>{interchainWallet.identifier ? interchainWallet.identifier : "(vide)"}</strong></li>
                    <li>interchainWallet.icon = <strong>{interchainWallet.icon ? interchainWallet.icon : "(vide)"}</strong></li>
                    <li>interchainWallet.connector = <strong>{interchainWallet.connector ? interchainWallet.connector : "(vide)"}</strong></li>
                </ul>
                }) : "-"}
            </div>
        </div>
    );
};

export default TerraStationWallet;