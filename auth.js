import { connectDB } from "@/lib/DbConect"
import { UserModal } from "@/lib/modals/UserModal";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"


const handleLoginuser = async (profile)=>{
    await connectDB();
    const user = await UserModal.findOne({email : profile.email})
    if(user){
      return user;
    }else{
      const obj = {
        fullname : profile.name,
        email: profile.email,
        provider : "google",
        profileImg: profile.picture,

      };
      let newUser = await new UserModal(obj);
      newUser = await newUser.save();
      return newUser;
    }
} 

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google , 
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
         
        console.log("credentials" ,credentials);
         let res = await fetch(`https://full-stack-lms-omega.vercel.app/api/user/logins`,{
          method : 'POST',
          body : json.stringify({
            email : credentials.email,
            password : credentials.password,
          })
        })
        if(res.ok){
          
        }
      res = await res.json();
      console.log("res", res);
      
        return {email : "abc@test.com"}
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account", account);
      if(account.provider =="google"){
        console.log("profile", profile);
        const user = await handleLoginuser(profile)
        
        return  {...profile , role : user.role}  

      }      
      return true;
    },
    async jwt({ token  }) {
      const user = await handleLoginuser(token);
      token.role =  user.role;
      token._id =  user._id;
    console.log("user jwt" , user );
    

      return token
    },
    session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      return session
    },
  
  },
})