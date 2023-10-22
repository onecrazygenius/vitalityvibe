"use client"

import { getSession } from 'next-auth/react';

const fetchClient = async (url, options) => {
    const session = await getSession();

    if (!session) {
        return null;
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${session?.jwt}`,
        },
    });
}

export default fetchClient;