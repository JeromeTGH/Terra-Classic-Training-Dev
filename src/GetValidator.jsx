import React, { useEffect } from 'react';
import { FCDclient } from './fcd/FCDclient';
import { Validator } from './fcd/classes/Validator';


const GetValidator = () => {


    // Exécution au démarrage
    useEffect(() => {

        const FCDurl = 'https://terra-classic-fcd.publicnode.com';
        const fcd = new FCDclient(FCDurl);

        // =====================================
        // Get "cosmos sdk version", for example
        // =====================================
        const valoperAdr = "terravaloper120ppepaj2lh5vreadx42wnjjznh55vvktp78wk";      // Test avec "allnodes"
        fcd.staking.askForValidatorInfo(valoperAdr).then(res => {
            const validator = Validator.extractFromStakingValidator(res);
            console.log("validator", validator);
        }).catch(err => {
            if(err.response && err.response.data)
                console.log("err.response.data", err.response.data);
            else
                console.log(err);
        })

    }, [])

    // Affichage
    return (
        <div>
            GetValidator
        </div>
    );
};

export default GetValidator;
