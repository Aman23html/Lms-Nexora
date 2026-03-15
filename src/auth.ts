// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import connectDb from "./lib/db"
// import User from "./models/user.model"
// import bcrypt from "bcryptjs"

 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials:{
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//   if (!credentials) throw new Error("Missing credentials")

//   await connectDb()

//   const email = credentials.email as string
//   const password = credentials.password as string

//   const user = await User.findOne({ email })

//   if (!user) throw new Error("No user found with this email")

//   const isMatch = await bcrypt.compare(password, user.password)

//   if (!isMatch) throw new Error("Invalid password")

//   return {
//     id: user._id.toString(),
//     email: user.email,
//     name: user.name,
//     role: user.role
//   }
// },
//     })
//   ],

//   callbacks: {
       
//     jwt({token, user}) {
//         if(user){
//           token.id = user.id
//           token.email = user.email
//           token.name = user.name
//           token.role = user.role
//         }

//         return token
//     },
//     session({session, token}) {
//       if(session.user){
//         session.user.id= token.id as string
//         session.user.email= token.email as string
//         session.user.name= token.name as string
//         session.user.role= token.role as string
        
//       }
//       return session
//     }


//   },

//   pages:{
//     signIn:"/login",
//     error:"/login"
//   },
//   session:{
//     strategy:"jwt",
//     maxAge:10*24*60*60
//   },
//   secret:process.env.AUTH_SECRET
// })


import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (credentials?.email === process.env.ADMIN_EMAIL && credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: "1",
            name: "Admin",
            email: credentials.email as string,
            role: "admin"
          }
        }

        return null
      }
    })
  ],
  secret: process.env.AUTH_SECRET
})