import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// firebase function and utils 
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "user-login",
            name: "user login",
            credentials: {},
            async authorize(credentials, req) {
              const res =  await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return user;
                })
                .catch((error) => {
                    return null
                });
                return res
            },
        }),
        CredentialsProvider({
            id: "user-signup",
            name: "user signup",
            credentials: {},
            async authorize(credentials) {
              const res =  await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return user;
                })
                .catch((error) => {
                    return null
                });
                console.log("signup res", res)
                return res
            },
        }),
    ],
    secret: "389d6c6cff348be758400cd4b6b88d",
    pages: {
        signIn: "/login",
        signUp: "/signup",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (user) return true;
            return false;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
                session.accessToken = token.accessToken;
                return session;
            }
            return null;
        },
        async jwt({ user, token }) { 
            if(user){
                token.accessToken = user.accessToken;
                token.user = { uid:user.uid, email:user.reloadUserInfo.email, accessToken:user.accessToken };
                return token ;
            }
            return token
        }
    }
  };
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };