import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const{username, email, firstName="", lastName="", bio=""} = args;
            const existsEmail = await prisma.$exists.user({email});
            const existsUserName = await prisma.$exists.user({username});
            if(existsEmail){
                throw Error("existsEmail");
            } else if (existsUserName) {
                throw Error("existsUserName");
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
}