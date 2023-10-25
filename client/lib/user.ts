"use client"

import { getSession } from 'next-auth/react';

const fetchClient = async (url: string, options: RequestInit = {}) => {
    const session = await getSession();

    if (!session) {
        return null;
    }

    if (!session.jwt) {
        throw new Error('No JWT found');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
}

export default fetchClient;