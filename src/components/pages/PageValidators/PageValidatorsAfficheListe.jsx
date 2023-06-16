import React from 'react';
import { Link } from 'react-router-dom';

const PageValidatorsAfficheListe = (props) => {
    return (
        <>
            <ol>
                {props.validateurs ? props.validateurs.map((validator, index) => {
                    return validator.status === "BOND_STATUS_BONDED" ? (
                        <li key={index}>
                            [{index}]
                            &nbsp;{validator.description.moniker}
                            &nbsp;- {validator.commission.commission_rates.rate.d[0]/100000} %
                            &nbsp;- <Link to={"/validator/" + validator.operator_address}>{validator.operator_address}</Link>
                        </li>
                    ) : (
                        null
                        // On masque les validateurs qui ne sont pas au status 'BOND_STATUS_BONDED'
                        // <li key={index}>
                        //     [{index}]
                        //     &nbsp;{validator.description.moniker}
                        //     &nbsp;{validator.jailed ? '(jailed)' : ''}
                        // </li>
                )}) : null}
            </ol>
        </>
    );
};

export default PageValidatorsAfficheListe;