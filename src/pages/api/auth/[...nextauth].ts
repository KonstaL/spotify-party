import type { DefaultUser, Session } from "next-auth";
import NextAuth, { type NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import SpotifyProvider from "next-auth/providers/spotify";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import type { JWT } from "next-auth/jwt/types.js";

interface AccessTokenSession extends Session {
  accessToken?: string;
}

interface SpotifyJWT extends JWT {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: AccessTokenSession;
      user: DefaultUser;
      token: SpotifyJWT;
    }) {
      if (session.user) {
        console.log("this is the token", token);
        session.user.id = token.sub ?? "";
        session.accessToken = token.accessToken;
      }
      return session as Session;
    },
    async jwt({ token, account }) {
      // Add the Spotify OAuth access_token to the JWT that's provided to session callback
      if (account) {
        token.accessToken = account.access_token;
      }
      return token as SpotifyJWT;
    },
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing streaming",
        },
      },
    }),

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
