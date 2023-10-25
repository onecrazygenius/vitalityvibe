import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!response.ok) {
                        // invalid credentials
                        const error = await response.text();
                        return Promise.reject(new Error(error));
                    }

                    const parsed = await response.json();
                    const jwt = parsed?.token;

                    // get user info
                    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${jwt}`,
                        },
                    });

                    if (!userResponse.ok) {
                        // invalid credentials
                        const error = await userResponse.text();
                        return Promise.reject(new Error(error));
                    }

                    const userParsed = await userResponse.json();

                    if (!userParsed) {
                        // no user
                        return Promise.reject(new Error("No user found"));
                    }

                    return {
                        jwt,
                        ...userParsed,
                    };
                } catch (error) {
                    return Promise.reject(new Error(error));
                }
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    jwt: user.jwt,
                }
            };
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token;
                session.jwt = token.jwt;
            }
            return session;
        } 
    },
    pages: {
        signIn: "/login",
        signOut: "/logout",
        signUp: "/signup",
    },
}
