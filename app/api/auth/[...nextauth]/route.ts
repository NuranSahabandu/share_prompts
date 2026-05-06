import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";


console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session }){

            await connectToDB();

            const sessionUser = await User.findOne({
                email: session.user?.email
            })

            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }

            return session;
        },
        async signIn({ profile }) {
            if (!profile) return false;

            const p = profile as {
                email?: string;
                name?: string;
                picture?: string;
            };

            if (!p.email) return false;

            try{
                // serverless -> lambda -> dynamodb
                await connectToDB();

                // check if user already exists
                const userExists = await User.findOne({
                    email: p.email
                })
                // if not, create a new user
                if(!userExists){
                    await User.create({
                        email: p.email,
                        username: p.name?.replace(" ", "").toLowerCase(),
                        image: p.picture,
                    })
                }

                return true;
            }catch(error){
                console.error('Error in signIn callback:', error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST }