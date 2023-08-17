
export class Validator {

    constructor (objetAvecVariables) {

        this.commission = {
            // update_time: objetAvecVariables.commission.update_time,
            commission_rates: {
                max_change_rate: parseFloat(objetAvecVariables.commission.commission_rates.max_change_rate),
                max_rate: parseFloat(objetAvecVariables.commission.commission_rates.max_rate),
                actual_rate: parseFloat(objetAvecVariables.commission.commission_rates.rate)
            }
        }
        // this.consensus_pubkey = {
        //     type: objetAvecVariables.consensus_pubkey.type,
        //     value: objetAvecVariables.consensus_pubkey.value
        // }
        this.delegator_shares = parseInt(objetAvecVariables.delegator_shares);
        this.description = {
            details: objetAvecVariables.description.details,
            // identity: objetAvecVariables.description.identity,
            moniker: objetAvecVariables.description.moniker,
            security_contact: objetAvecVariables.description.security_contact,
            website: objetAvecVariables.description.website
        }
        // this.min_self_delegation = objetAvecVariables.min_self_delegation;
        this.operator_address = objetAvecVariables.operator_address;
        this.status = objetAvecVariables.status;
        // this.tokens = objetAvecVariables.tokens;                         // Nota : doublon avec "delegator_shares" ?
        // this.unbonding_height = objetAvecVariables.unbonding_height;
        // this.unbonding_time = objetAvecVariables.unbonding_time;

    }


    static extractFromStakingValidator (rawApiData) {
        return new Validator(rawApiData.data.result);
    }

}