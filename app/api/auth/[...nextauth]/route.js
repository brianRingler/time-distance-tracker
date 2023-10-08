import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { useRouter } from "next/navigation";
import bcrypt from "bcrypt";
import { pool } from "models/dbconfig";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        // check if email exists
        try {
          const queryUser = {
            text: `SELECT * FROM user_profiles 
                   WHERE user_name_email = $1`,
            values: [credentials.email],
          };
          // query db checking for user email and password 'pass'
          const res = await pool.query(queryUser);
          //const user = res.rows[0];
          const userEmail = res?.rows[0]?.user_name_email;
          const userHashedPass = res?.rows[0]?.password;
          console.log(
            "GET user_name_email and hashed password from the database"
          );
          console.log(userEmail);
          console.log(credentials.password);
          console.log(userHashedPass);
          const user = {
            id: res?.rows[0].id,
            firstName: res?.rows[0].first_name,
            lastName: res?.rows[0].last_name,
            email: res?.rows[0].user_name_email,
          };

          if (userEmail) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              userHashedPass
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              console.log("throw new Error => Wrong Credentials Provided");
              throw new Error("Wrong Credentials!");
            }
          } else {
            console.log("throw new Error => User Not Found");
            throw new Error("User not found!");
          }
        } catch (err) {
          console.log(
            `Catch All Errors - route to 'error-page'. Error Msg: ${err}`
          );
          router.push("/error-page");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    signingKey: process.env.JWT_SECRET,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    //error: "/login",
    signIn: "/login",
    //signOut:'/',
  },
});

export { handler as GET, handler as POST };
