import React, { useEffect } from 'react';
import PostMessageStream from './PostMessageStream';

const Extension = () => {

    const identifier = 'station';

    const inpageStream = new PostMessageStream({
        name: `${identifier}:inpage`,
        target: `${identifier}:content`,
    });

    const send = (type, data = null) => {
        const id = Date.now();
        inpageStream.write({ ...data, id, type });

        // console.log("id =", id);
        return id;
    }

    useEffect(() => {
        
        setTimeout(() => {
            // send('connect');
            send('info');
        }, 5000)

        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div>Extension</div>
        </div>
    );
};

export default Extension;