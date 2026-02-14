import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // SpotifyProvider removed in favor of RapidAPI
    // SpotifyProvider({
    //   clientId: process.env.SPOTIFY_CLIENT_ID || "",
    //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    //   authorization: "https://accounts.spotify.com/authorize?scope=user-read-currently-playing user-read-playback-state",
    // }),
  ],
  session: {
    strategy: "jwt", // Use JWT for easier token handling with Spotify
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId; // Mapping ID
      }
      return token;
    },
    async session({ session, token }) {
       if (session.user) {
          session.user.id = token.sub as string;
          // @ts-ignore
          session.accessToken = token.accessToken;
       }
      return session;
    },
    async signIn({ user, account }) {
        if (account?.provider === 'google') {
             // Create default preference if not exists
            try {
                const existingPref = await prisma.preference.findUnique({
                    where: { userId: user.id }
                });

                if (!existingPref) {
                    await prisma.preference.create({
                        data: {
                            userId: user.id,
                            isLowSalt: true // Default as per requirements
                        }
                    });
                }
            } catch (error) {
                console.error("Error creating preferences", error);
            }
        }
        return true;
    }
  },
  pages: {
    signIn: '/', // Custom sign-in page (landing)
  },
};
