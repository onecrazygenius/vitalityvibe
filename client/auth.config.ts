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
          const user = await fetch("http://localhost:8080/api/v1/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          const parsedUser = await user.json();

          return {
            ...credentials,
            jwt,
            user: parsedUser
          };
        } catch (e) {
          return null;
        }
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.user.id;
        token.name = user.user.displayname;
        token.email = user.user.email;
        token.jwt = user.jwt;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.jwt = token.jwt;
      return session;
    },
  },
  // pages: {
  //   signIn: '/auth/login',
  // }
}