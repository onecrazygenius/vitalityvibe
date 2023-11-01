import GitHub from '@auth/core/providers/github'
import Credentials from '@auth/core/providers/credentials'

export default {
  providers: [
    // Configure one or more authentication providers
    GitHub({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET,
    }),
    Credentials({
      // The name to display on the sign in form 
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            // credentials are invalid
            return null;
          }

          const parsedResponse = await res.json();

          // accessing the jwt returned by server
          const jwt = parsedResponse.access_token;

          // You can make more request to get other information about the user eg. Profile details
          // return user credentials together with jwt
          return {
            ...credentials,
            jwt,
          };
        } catch (e) {
          return null;
        }
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
     // user is only available the first time a user signs in authorized
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.jwt = token.jwt;
      }
      return session;
    },
  },
}