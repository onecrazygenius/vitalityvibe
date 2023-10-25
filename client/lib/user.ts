"use client"

import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const fetchClient = async (url: string, options: RequestInit = {}) => {
    const session = await getSession();

    if (!session) {
        return null;
    }

    if (!session.jwt) {
        throw new Error('No JWT found');
    }

    // get jwt expiry from jwt
    const { exp } = JSON.parse(atob(session.jwt.split('.')[1]));
    const expiryDate = new Date(exp * 1000);
    const now = new Date();

    if (now > expiryDate) {
        // force signout
        await signOut();
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